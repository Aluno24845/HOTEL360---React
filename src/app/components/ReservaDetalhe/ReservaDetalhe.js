import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { HiPencil, HiTrash } from "react-icons/hi2";
import * as Api from '../../../service/api';
import { useContext } from "react";
import { ContextoApp } from '../../../App.js'

function converterData(data) {
    return new Date(data).toISOString().split('T')[0]
}

export default function ReservaDetalhe() {
    const { context } = useContext(ContextoApp)
    const { id } = useParams()
    console.log('id ', id)

    const [dataReserva, setDataReserva] = useState("");
    const [valorPago, setValorPago] = useState("");
    const [dataCheckIN, setDataCheckIn] = useState("");
    const [dataCheckOUT, setDataCheckOut] = useState("");
    const [quarto, setQuarto] = useState({});
    const [listaServicos, setListaServices] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);
    const [hospede, setHospede] = useState({});

    useEffect(() => {
        if (!id) return
        Api.getReservaComId(id)
            .then(data => data.json())
            .then(data => {
                setValorPago(data.valorPago)
                setDataReserva(converterData(data.dataReserva))
                setDataCheckOut(converterData(data.dataCheckOUT))
                setDataCheckIn(converterData(data.dataCheckIN))
                setQuarto(data.quarto)
                setListaServices(data.listaServicos)
                setHospede(data.hospede)
                setSelectedImage(`https://localhost:7130/Imagens/${data.quarto.imagem}`)
            })
    }, [])


    return <div key={id} className="group" style={{ display: 'flex', flexDirection: 'column', }}>
        <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-1xl" style={{ marginBottom: 20 }}>Reserva - {id}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '8px' }}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7" style={{ width: '100%', maxWidth: '600px', height: '100%', maxHeight: '400px', alignSelf: 'center' }}>
                <img
                    title={quarto.nome}
                    alt={quarto.nome}
                    src={selectedImage}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                ></img>
            </div>
            <h3 style={{ marginTop: 20 }} className="text-3xl font-bold tracking-tight text-gray-900 sm:text-1xl">Detalhes</h3 >
            <p className="mt-1 text-lg font-medium text-gray-900">Data da reserva:</p>
            <p className="mt-1 text-lg text-gray-900">{dataReserva}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">Data de Check-IN:</p>
            <p className="mt-1 text-lg  text-gray-900">{dataCheckIN}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">Data de Check-OUT:</p>
            <p className="mt-1 text-lg text-gray-900">{dataCheckOUT}</p>
        </div>
        <div>
            <p className="mt-1 text-lg font-medium text-gray-900">Serviços incluídos:</p>
            <ul style={{ marginLeft: 40 }}>
                {listaServicos.map((servico, index) => {
                    return <li key={index} style={{ listStyle: 'square' }} className="mt-1 text-lg text-gray-900">{servico.nome}</li>
                })}
            </ul>
        </div>
        {hospede.nome && <>
            <h3 style={{ marginTop: 20 }} className="text-3xl font-bold tracking-tight text-gray-900 sm:text-1xl">Detalhes do Hospede:</h3 >
            <p className="mt-1 text-lg font-medium text-gray-900">Nome:</p>
            <p className="mt-1 text-lg  text-gray-900">{hospede.nome}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">Telemóvel:</p>
            <p className="mt-1 text-lg text-gray-900">{hospede.telemovel}</p>
        </>}

        {context.utilizador && (context.utilizador.role === 'Gerentes' || context.utilizador.role === 'Reccecionistas') &&
            <div className="text-white font-semibold bg-indigo-500 shadow-sm" style={{ display: 'flex', justifyContent: 'space-around', padding: '3px' }}>
                <a style={{ alignItems: 'center', borderRight: '1px solid white', flexGrow: 1, justifyContent: 'center' }} className="flex" href={`/reservas/${id}`}><HiPencil />Editar/Apagar</a>
            </div>
        }
    </div>
}