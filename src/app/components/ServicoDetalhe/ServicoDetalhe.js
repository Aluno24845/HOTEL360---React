import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { HiPencil } from "react-icons/hi2";
import * as Api from '../../../service/api';
import { useContext } from "react";
import { ContextoApp } from '../../../App.js'
import ButtonRegressar from "../ButtonRegressar/ButtonRegressar.js";

export default function QuartoDetalheView() {
    const { context } = useContext(ContextoApp)
    const { id } = useParams()
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");


    // Carrega o serviço selecionado e guarda os detalhes no estado

    useEffect(() => {
        if (!id) return
        Api.getServicoComId(id)
            .then(data => data.json())
            .then(data => {
                setNome(data.nome)
                setPreco(data.preco)
                setDescricao(data.descricao)
            })
            // eslint-disable-next-line
    }, [])
  


    return <div key={id} className="group" style={{ display: 'flex', flexDirection: 'column', }}>
        <ButtonRegressar></ButtonRegressar>
        <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-1xl" style={{ marginBottom: 20 }}>Servico - {nome}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '8px' }}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7" style={{ width: '100%', maxWidth: '600px', height: '100%', maxHeight: '400px', alignSelf: 'center' }}></div>
            <h3 style={{ marginTop: 20 }} className="text-3xl font-bold tracking-tight text-gray-900 sm:text-1xl">Detalhes</h3 >
            <p className="mt-1 text-lg font-medium text-gray-900">Preço:</p>
            <p className="mt-1 text-lg  text-gray-900">{preco}.00€</p>
            <p className="mt-1 text-lg font-medium text-gray-900">Descrição:</p>
            <p className="mt-1 text-lg text-gray-900">{descricao}</p>
        </div>
        {context.utilizador && context.utilizador.role === 'Gerentes' &&
            <div className="text-white font-semibold bg-indigo-500 shadow-sm" style={{ display: 'flex', justifyContent: 'space-around', padding: '3px' }}>
                <a style={{ alignItems: 'center', borderRight: '1px solid white', flexGrow: 1, justifyContent: 'center' }} className="flex" href={`/servicos/${id}`}><HiPencil />Editar/Apagar</a>
            </div>
        }
    </div>
}