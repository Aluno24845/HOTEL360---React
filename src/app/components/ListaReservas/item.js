import { HiPencil, HiTrash, HiEye } from "react-icons/hi2";
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
        <div className="flex">
            {context.utilizador && <>
                <a style={{ paddingRight: 10 }} href={`/reservas/${reserva.id}/detalhes`}>
                    < HiEye /> Ver
                </a>
            </>}
            {context.utilizador && (context.utilizador.role === 'Gerentes' || context.utilizador.role === 'Reccecionistas') &&
                <div className="flex" style={{ alignSelf: 'center' }}>
                    <a style={{ alignItems: 'center' }} href={`/reservas/${reserva.id}`}>
                        <HiPencil />Editar
                    </a>
                    <button style={{ paddingLeft: 10, alignItems: 'center' }} onClick={() => apagaReserva(reserva.id)}><HiTrash />Apagar</button>
                </div>
            }
        </div>
    </div>
}