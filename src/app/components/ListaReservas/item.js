import { useState } from "react";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useContext } from "react";
import { ContextoApp } from '../../../App.js'
import * as Api from '../../../service/api'

export default function Quarto({ reserva, reloadLista }) {
    const { context } = useContext(ContextoApp)

    function apagaReserva(id) {
        Api.apagaReserva(id)
            .then(data => data.json)
            .then(data => reloadLista())
    }

    return <div className="grid grid-cols-6 border-b " key={reserva.id}>
        <div>{reserva.quarto.nome}</div>
        <div>{new Date(reserva.dataReserva).toLocaleDateString()}</div>
        <div>{new Date(reserva.dataCheckIN).toLocaleDateString()}</div>
        <div>{new Date(reserva.dataCheckOUT).toLocaleDateString()}</div>
        <div>{reserva.valorPago}.00€</div>
        {context.admin && <div>
            <a href={`/reservas/${reserva.id}`}>
                <HiPencil />
            </a>
            <button onClick={() => apagaReserva(reserva.id)}><HiTrash /></button>
        </div>
        }
    </div>
}