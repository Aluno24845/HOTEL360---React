import { useEffect, useState } from 'react'
import Item from './item'
import * as Api from '../../../service/api'
import { useContext } from "react";
import { ContextoApp } from '../../../App.js'

export default function ListaQuartos() {
    const [quartos, setQuartos] = useState([])
    const { context } = useContext(ContextoApp)

    function reloadLista() {
        Api.getQuartos()
            .then(data => data.json())
            .then(data => setQuartos(data))
    }

    useEffect(() => {
        Api.getQuartos()
            .then(data => data.json())
            .then(data => setQuartos(data))
    }, [])

    return (
        <div className="h-full bg-white border ">
            <div className="grid grid-cols-4 bg-gray-100 border-b border-gray-600">
                <div>Quarto</div>
                <div>Capacidade</div>
                <div>Preço</div>
                {context.admin && <div>Ações</div>}
            </div>
            {quartos.map((quarto) => (
                <Item quarto={quarto} reloadLista={reloadLista} key={quarto.id} />
            ))}
        </div>
    )
}
