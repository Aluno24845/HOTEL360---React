import { useEffect, useState } from "react";
import Select from 'react-select';
import ButtonLG from "../ButtonLg/ButtonLg";
import * as Api from '../../../service/api'
import { useParams } from "react-router-dom";


export default function CriarQuarto() {
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


    useEffect(() => {
        let quartos = []
        let servicos = []
        Api.getQuartos()
            .then(data => data.json())
            .then(data => {
                quartos = data.map(q => {
                    return { value: q.id, label: q.nome }
                })
                setListaQuartos(quartos)
            })
            .then(() => Api.getServicos())
            .then(data => data.json())
            .then(data => {
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

                const servicosEscolhidos = data.listaReservasServicos.map(x => {
                    return servicos.find(l => l.value === x)
                })

                setListaReservasServicos(servicosEscolhidos)
            })
    }, [])


    // Função para lidar com o envio do formulário
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!valorPago || !dataCheckIN || !dataCheckOUT || !listaReservasServicos || !quartoFK)
            return
        if (!id)
            Api.criarReserva({ dataReserva, valorPago, dataCheckIN, dataCheckOUT, listaReservasServicos: listaReservasServicos.map(x => x.value), quartoFK: quartoFK.value })
                .then(data => data.json())
                .then(data => {
                    window.location.pathname = '/reservas'
                })
        else
            Api.editarReserva(id, { valorPago, dataCheckIN, dataCheckOUT, listaReservasServicos: listaReservasServicos.map(x => x.value), quartoFK: quartoFK.value })
                .then(data => data.json())
                .then(data => {
                    window.location.pathname = '/reservas'
                })
    };

    return (
        <form
            className="p-2 bg-gray-50 border-gray-200 rounded-lg"
            onSubmit={handleSubmit}
        >
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
                <label htmlFor="password">data do check-IN:</label>
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
                <label htmlFor="password">data do Check-OUT:</label>
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
            <div className="flex flex-col gap-2 p-4">
                <label>Quartos</label>
                <Select
                    value={quartoFK}
                    defaultValue={quartoFK}
                    onChange={setQuartoFK}
                    isMulti={false}
                    options={listaQuartos}
                />
            </div>

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
            <div className="flex flex-col gap-2 p-5">
                <ButtonLG onClick={() => {
                    handleSubmit();
                }} type="submit">{id ? 'Editar' : 'Criar'}</ButtonLG>
            </div>
        </form>
    );
    return <>


    </>
}