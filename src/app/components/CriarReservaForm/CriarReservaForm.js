import { useEffect, useState, useContext } from "react";
import Select from 'react-select';
import ButtonLG from "../ButtonLg/ButtonLg";
import * as Api from '../../../service/api'
import { useParams } from "react-router-dom";
import { ContextoApp } from '../../../App.js';
import ButtonRegressar from "../ButtonRegressar/ButtonRegressar.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CriarQuarto() {
    const { context } = useContext(ContextoApp);
    // Estado para armazenar o e-mail e a senha
    const { id } = useParams()

    const [dataReserva, setDataReserva] = useState(id ? "" : new Date().toISOString().slice(0, 10))
    const [valorPago, setValorPago] = useState("");
    const [dataCheckIN, setDataCheckIn] = useState("");
    const [dataCheckOUT, setDataCheckOut] = useState("");
    const [listaReservasServicos, setListaReservasServicos] = useState(null);
    const [quartoFK, setQuartoFK] = useState(null);

    const [listaServicos, setListaServices] = useState([])
    const [listaQuartos, setListaQuartos] = useState([])
    const [listaHospedes, setListaHospedes] = useState([])
    const [rawServicos, setRawListaServicos] = useState([])
    const [rawQuarto, setRawQuarto] = useState([])
    const [rawHospedes, setRawHospedes] = useState([])
    const [hospedes, setHospedes] = useState([])
    const [minCheckoutDate, setMinCheckoutDate] = useState(criaDataDiaMaisUm())

    function getQuartos(de, ate) {
        Api.getQuartoDisponivel(de, ate)
            .then(data => data.json())
            .then(data => {
                const quartos = data.map(q => {
                    return { value: q.id, label: q.nome }
                })
                setListaQuartos(quartos)
                setQuartoFK([])
            })
    }

    function editarReservaBloquearCamposAposCheckin() {
        const agora = Date.now()

        if (!id) {
            return false
        }
        if (agora > new Date(dataCheckIN).getTime())
            return true

    }

    function handleCheckInChange(e) {
        console.log(e)
        const date = new Date(e)
        const horas = date.getHours()
        const minutos = date.getMinutes();
        if (horas < 8 || (horas >= 22 && minutos > 0)) {
            setDataCheckIn("")
            return toast.error('A hora de check-in deve ser entre 08:00h e 22:00h');
        }


        //adjstar min date do checkout - se conflito - limpa a data do checkoutautomaticment
        setMinCheckoutDate(criaDataDiaMaisUm(e))

        setDataCheckIn(e)
        if (e && dataCheckOUT)
            getQuartos(e, dataCheckOUT)
    }

    const handleCheckOutChange = (e) => {
        const date = new Date(e);
        const hours = date.getHours();
        const minutos = date.getMinutes();
        if (hours < 5 || (hours >= 17 && minutos > 0)) {
            setDataCheckOut("")
            toast.error('A hora de check-out deve ser entre 05:00h e 17:00h');
            return;
        }
        setDataCheckOut(e);
        if (dataCheckIN && e)
            getQuartos(dataCheckIN, e)
    };

    function criaDataDia() {
        const date = new Date();
        date.setHours(6);
        date.setMinutes(0);
        date.setSeconds(0);

        var isoDate = date.toISOString().slice(0, 16)

        return isoDate
    }
    function criaDataDiaMaisUm(data) {
        let date = new Date();
        if (data) {
            date = new Date(data)
        }
        date.setHours(6);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setDate(date.getDate() + 1)

        var isoDate = date.toISOString().slice(0, 16)
        return isoDate
    }

    function apagaReserva(id) {
        Api.apagaReserva(id)
            .then(data => data.json)
            .then(data => { })
    }

    useEffect(() => {
        let servicos = []
        Api.getServicos()
            .then(data => data.json())
            .then(data => {
                setRawListaServicos(data)
                servicos = data.map(q => {
                    return { value: q.id, label: q.nome }
                })
                setListaServices(servicos)
            })
            .then(() => id && Api.getReservaComId(id))
            .then(data => data && data.json())
            .then(data => {
                if (!data) return
                setDataReserva(data.dataReserva)
                setValorPago(data.valorPago)
                setDataCheckIn(data.dataCheckIN.substr(0, 16))
                setDataCheckOut(data.dataCheckOUT.substr(0, 16))
                setQuartoFK({ value: data.quarto.id, label: data.quarto.nome })

                const servicosEscolhidos = data.listaServicos.map(x => {
                    return { value: x.id, label: x.nome }
                })


                setListaReservasServicos(servicosEscolhidos)
            })
        if (context.utilizador && context.utilizador.role === 'Gerentes') {

            Api.getHospedes()
                .then(data => data.json())
                .then(data => {

                    setRawHospedes(data)
                    setListaHospedes(data.map(x => {
                        return {
                            label: x.nome,
                            value: x.id
                        }
                    }))

                })
        }
    }, [])


    // Função para lidar com o envio do formulário
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!valorPago || !dataCheckIN || !dataCheckOUT || !listaReservasServicos || !quartoFK)
            return
        if (!id) {
            const ListaServicos = listaReservasServicos.map(servico => {
                const s = rawServicos.find(x => x.id === servico.value)

                if (s)
                    s.PrecoAux = s.preco.toString()
                return s
            })
                .filter(x => !!x)

            const dataASubmeter = {
                DataReserva: dataReserva,
                ValorPago: valorPago,
                ValorPagoAux: valorPago.toString(),
                DataCheckIN: dataCheckIN,
                DataCheckOUT: dataCheckOUT,
                ListaServicos: ListaServicos,
                QuartoFK: quartoFK.value
            }

            if (!id && context.utilizador && context.utilizador.role === 'Gerentes') {
                dataASubmeter.HospedeId = hospedes.value;
            }

            Api.criarReserva(dataASubmeter)
                .then(data => data.json())
                .then(data => {
                    if (data.erro) {
                        console.log(data.erro)
                    } else {
                        window.location.pathname = '/reservas'
                    }
                })
        }
        else {

            const ListaServicos = listaReservasServicos.map(servico => {
                const s = rawServicos.find(x => x.id === servico.value)

                if (s)
                    s.PrecoAux = s.preco.toString()
                return s
            })
                .filter(x => !!x)

            Api.editarReserva(id, { DataReserva: dataReserva, ValorPago: valorPago, ValorPagoAux: valorPago.toString(), DataCheckIN: dataCheckIN, DataCheckOUT: dataCheckOUT, ListaServicos: ListaServicos, QuartoFK: quartoFK.value })
                .then(data => data.json())
                .then(data => {
                    if (data.erro) {
                        console.log(data.erro)
                    } else {
                        window.location.pathname = '/reservas'
                    }
                })
        }
    };

    return (
        <form
            className="p-2 bg-gray-50 border-gray-200 rounded-lg"
            onSubmit={handleSubmit}
        >
            <ButtonRegressar></ButtonRegressar>
            {id && <h1>Reserva ID: {id}</h1>}
            <div className="flex flex-col gap-2 p-4">
                <label htmlFor="email">Valor Pago:</label>
                <input
                    className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
                    type="number" min="0.00" max="10000.00" step="0.01"
                    id="valorPago"
                    name="valorPago"
                    value={valorPago}
                    onChange={(e) => setValorPago(e.target.value)}
                    required
                />
            </div>


            <div className="flex flex-col gap-2 p-4">
                <label htmlFor="password">Data do check-IN:</label>
                <input
                    className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    type="datetime-local"
                    id="dataCheckIN"
                    name="dataCheckIN"
                    value={dataCheckIN}
                    disabled={editarReservaBloquearCamposAposCheckin()}
                    min={criaDataDia()}
                    onChange={(e) => handleCheckInChange(e.target.value)}
                    required
                />
            </div>

            <div className="flex flex-col gap-2 p-4">
                <label htmlFor="password">Data do Check-OUT:</label>
                <input
                    className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    type="datetime-local"
                    id="dataCheckOUT"
                    name="dataCheckOUT"
                    min={minCheckoutDate}
                    disabled={editarReservaBloquearCamposAposCheckin()}
                    value={dataCheckOUT}
                    onChange={(e) => handleCheckOutChange(e.target.value)}
                    required
                />
            </div>
            {(!id || (id && context.utilizador && (context.utilizador.role === 'Gerentes' || context.utilizador.role === 'Reccecionistas'))) &&
                <div className="flex flex-col gap-2 p-4">
                    <label>Quarto</label>
                    <Select
                        required
                        value={quartoFK}
                        defaultValue={quartoFK}
                        onChange={setQuartoFK}
                        isDisabled={editarReservaBloquearCamposAposCheckin()}
                        isMulti={false}
                        options={listaQuartos}
                    />
                </div>
            }
            {(!id || (id && context.utilizador && (context.utilizador.role === 'Gerentes' || context.utilizador.role === 'Reccecionistas'))) &&
                <div className="flex flex-col gap-2 p-4">
                    <label>Serviços</label>
                    <Select
                        required
                        value={listaReservasServicos}
                        defaultValue={listaReservasServicos}
                        onChange={setListaReservasServicos}
                        isDisabled={editarReservaBloquearCamposAposCheckin()}
                        isMulti={true}
                        options={listaServicos}
                    />
                </div>
            }
            {!id && context.utilizador && (context.utilizador.role === 'Gerentes' || context.utilizador.role === 'Reccecionistas') &&
                <div className="flex flex-col gap-2 p-4">
                    <label>Hospedes</label>
                    <Select
                        required={true}
                        value={hospedes}
                        defaultValue={hospedes}
                        onChange={setHospedes}
                        isDisabled={editarReservaBloquearCamposAposCheckin()}
                        isMulti={false}
                        options={listaHospedes}
                    />
                </div>
            }
            <div className="flex flex-col gap-2 p-5">
                <ButtonLG onClick={() => {
                    handleSubmit();
                }} type="submit">{id ? 'Editar' : 'Criar'}</ButtonLG>
            </div>
            {id && context.utilizador && (context.utilizador.role === 'Gerentes' || context.utilizador.role === 'Reccecionistas') &&
                <div className="flex flex-col gap-2 p-5">
                    <button onClick={() => apagaReserva(id)} style={{}} className="text-white bg-indigo-500 shadow-sm w-full hover:bg-indigo-400 text-blue-365 font-semibold hover:text-white py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:border-transparent " >Apagar</button>
                </div>
            }
        </form>
    );
}