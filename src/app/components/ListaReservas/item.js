import { HiPencil, HiTrash, HiEye } from "react-icons/hi2";
import { useContext } from "react";
import { ContextoApp } from '../../../App.js'
import * as Api from '../../../service/api'

import ToastConfirmaDelete from '../ToastConfirmaDelete'

import { toast } from 'react-toastify';

export default function Quarto({ reserva, reloadLista }) {
    const { context } = useContext(ContextoApp)


    // lida com o click do botao apagar
    // responsavel por criar um 'toast' para confirmar a ação de remover reserva
    const handleDelete = (id) => {
        toast(
            ({ closeToast }) => (
                <ToastConfirmaDelete id={id} action={apagaReserva} closeToast={closeToast} item='reserva' />
            ),
            {
                closeOnClick: true,
                close: false,
                autoClose: false,
                position: 'top-center',
            }
        );
    };


    // aceita o id da reserva selecionada para apagar
    // apaga a reserva e atualiza a lista de reservas
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
        <div>{reserva.valorPago.toLocaleString("pt", { minimumFractionDigits: 2 })}€</div>
        <div className="flex" style={{ alignSelf: 'center' }}>
            {context.utilizador && <>
                <a title="Ver" style={{ paddingRight: 10 }} href={`/reservas/${reserva.id}/detalhes`}>
                    < HiEye />
                </a>
            </>}
            {context.utilizador && (context.utilizador.role === 'Gerentes' || context.utilizador.role === 'Reccecionistas') &&
                <div className="flex" style={{ alignSelf: 'center' }}>
                    <a title="Editar" style={{ alignItems: 'center' }} href={`/reservas/${reserva.id}`}>
                        <HiPencil />
                    </a>
                    <button title="Apagar" style={{ paddingLeft: 10, alignItems: 'center' }} onClick={() => handleDelete(reserva.id)}><HiTrash /></button>
                </div>
            }
        </div>
    </div>
}