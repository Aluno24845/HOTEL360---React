import { useEffect, useState, useContext } from 'react'
import { ContextoApp } from '../../../App.js'
import * as Api from '../../../service/api.js'
import Item from './Item.js'



export default function ListaServicos() {
    const [servicos, setServicos] = useState([])
    const { context } = useContext(ContextoApp)

    function reloadLista() {
        Api.getServicos()
            .then(data => data.json())
            .then(data => setServicos(data))
    }
    useEffect(() => {
        Api.getServicos()
            .then(data => data.json())
            .then(data => setServicos(data))
    }, [])

    return (
        <div className="h-full bg-white  ">
            <div className="grid grid-cols-4 bg-gray-100 border-b border-gray-600">
                <div>Nome</div>
                <div>Descrição</div>
                <div>Preço</div>
            </div>
            {servicos.map((servico) => (
                <Item servico={servico} reloadLista={reloadLista} key={servico.id} />
            ))}
        </div>
    )
}