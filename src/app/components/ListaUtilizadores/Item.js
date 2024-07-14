import { HiPencil, HiTrash } from "react-icons/hi2";
import * as Api from '../../../service/api'
import ToastConfirmaDelete from '../ToastConfirmaDelete'

import { toast } from 'react-toastify';

export default function Item({utilizador, carregarUtilizadores}) {

    const handleDelete = (id) => {
        toast(
            ({ closeToast }) => (
                <ToastConfirmaDelete id={id} action={apagarUtilizador} closeToast={closeToast} item='utilizador' />
            ),
            {
                closeOnClick: true,
                close: false,
                autoClose: false,
                position: 'top-center',
            }
        );
    };

    function apagarUtilizador(id) {
        Api.apagarUtilizador(id)
            .then(data => data.json())
            .then(data => {
               carregarUtilizadores()
            })
    }
    return (
        <div className="grid grid-cols-5 border-b" style={{alignItems:'center'}}>
            <div>{utilizador.id}</div>
            <div>{utilizador.nome}</div>
            <div>{utilizador.telemovel}</div>
            <div>{utilizador.nif}</div>
            <div className="flex" style={{ alignSelf: 'center',  }}>
                <a title="Editar" style={{ alignItems: 'center' }} href={`/editar-utilizador/${utilizador.id}`}>
                    <HiPencil />
                </a>
                <button title="Apagar" style={{ paddingLeft: 10, alignItems: 'center' }} onClick={() => handleDelete(utilizador.id)}><HiTrash /></button>
            </div>
        </div>
    )
}