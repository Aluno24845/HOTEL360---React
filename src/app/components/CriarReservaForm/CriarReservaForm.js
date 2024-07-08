import { useEffect, useState, useContext } from "react";
import Select from 'react-select';
import ButtonLG from "../ButtonLg/ButtonLg";
import * as Api from '../../../service/api'
import { useParams } from "react-router-dom";
import { ContextoApp } from '../../../App.js'

export default function CriarQuarto() {
    const { context } = useContext(ContextoApp);
    // Estado para armazenar o e-mail e a senha
    const { id } = useParams()
    const [dataReserva, setDataReserva] = useState(id ? "" : Date.now())
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

    function apagaReserva(id) {
        Api.apagaReserva(id)
            .then(data => data.json)
            .then(data => { })
    }


    useEffect(() => {
        let quartos = []
        let servicos = []
        Api.getQuartos()
            .then(data => data.json())
            .then(data => {
                setRawQuarto(data)
                quartos = data.map(q => {
                    return { value: q.id, label: q.nome }
                })
                setListaQuartos(quartos)
            })
            .then(() => Api.getServicos())
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
                setDataCheckIn(data.dataCheckIN.substr(0, 10))
                setDataCheckOut(data.dataCheckOUT.substr(0, 10))
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
            debugger
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
            {id && <h1>Reserva ID: {id}</h1>}
            <div className="flex flex-col gap-2 p-4">
                <label htmlFor="email">Valor Pago:</label>
                <input
                    className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
                    type="nome"
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
                    type="date"
                    id="dataCheckIN"
                    name="dataCheckIN"
                    value={dataCheckIN}
                    onChange={(e) => setDataCheckIn(e.target.value)}
                    required
                />
            </div>

            <div className="flex flex-col gap-2 p-4">
                <label htmlFor="password">Data do Check-OUT:</label>
                <input
                    className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    type="date"
                    id="dataCheckOUT"
                    name="dataCheckOUT"
                    value={dataCheckOUT}
                    onChange={(e) => setDataCheckOut(e.target.value)}
                    required
                />
            </div>
            {!id && <div className="flex flex-col gap-2 p-4">
                <label>Quarto</label>
                <Select
                    value={quartoFK}
                    defaultValue={quartoFK}
                    onChange={setQuartoFK}
                    isMulti={false}
                    options={listaQuartos}
                />
            </div>
            }
            {!id &&
                <div className="flex flex-col gap-2 p-4">
                    <label>Serviços</label>
                    <Select
                        value={listaReservasServicos}
                        defaultValue={listaReservasServicos}
                        onChange={setListaReservasServicos}
                        isMulti={true}
                        options={listaServicos}
                    />
                </div>
            }
            {!id && context.utilizador && context.utilizador.role === 'Gerentes' &&
                <div className="flex flex-col gap-2 p-4">
                    <label>Hospedes</label>
                    <Select
                        value={hospedes}
                        defaultValue={hospedes}
                        onChange={setHospedes}
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