import { useState } from "react";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useContext } from "react";
import { ContextoApp } from '../../../App.js'
import * as Api from '../../../service/api'

export default function Quarto({ quarto, reloadLista }) {
    const { context } = useContext(ContextoApp)

    function apagarQuarto(id) {
        Api.apagaQuarto(id)
            .then(data => data.json)
            .then(data => reloadLista())
    }

    return <div className="grid grid-cols-4 border-b " key={quarto.id}>
        <div>{quarto.nome}</div>
        <div>{quarto.capacidade} pessoas</div>
        {quarto.preco}.00€
        {context.admin && <div style={{ display: 'flex' }}>
            <a href={`/quartos/${quarto.id}`}><HiPencil /></a>
            <button onClick={() => apagarQuarto(quarto.id)}><HiTrash /></button>
        </div>
        }
    </div>
}