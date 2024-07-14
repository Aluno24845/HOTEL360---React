import { useContext } from "react";
import { ContextoApp } from '../../../App.js'
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import * as Api from '../../../service/api.js'
import ToastConfirmaDelete from '../ToastConfirmaDelete'

import { toast } from 'react-toastify';

export default function Item({ servico, reloadLista }) {
    const { context } = useContext(ContextoApp)


        
    const handleDelete = (id) => {
        toast(
            ({ closeToast }) => (
                <ToastConfirmaDelete id={id} action={apagarServico} closeToast={closeToast} item='serviço' />
            ),
            {
                closeOnClick: true,
                close: false,
                autoClose: false,
                position: 'top-center',
            }
        );
    };

    function apagarServico(id) {
        Api.apagarServico(id)
            .then(data => data.json())
            .then(() => reloadLista())
    }

    return (
        <div className="grid grid-cols-4 border-b">
            <div>{servico.nome}</div>
            <div>{servico.descricao}</div>
            <div>{servico.preco}€</div>
            <div className="flex" style={{ alignSelf: 'center' }}>
                <a title="Ver" style={{ paddingRight: 10 }} href={`/servicos/${servico.id}/detalhes`}>
                    < HiEye />
                </a>
                {context.utilizador && context.utilizador.role === 'Gerentes' &&
                    <div className="" style={{ display: 'flex', justifyContent: 'space-around', padding: '3px' }}>
                        <a title="Editar" className="flex" style={{ alignItems: 'center' }} href={`/servicos/${servico.id}`}><HiPencil /></a>
                        <button title="Apagar" className="flex" style={{ marginLeft: 10, alignItems: 'center' }} onClick={() => handleDelete(servico.id)}><HiTrash /></button>
                    </div>
                }
            </div>
        </div>
    )
}