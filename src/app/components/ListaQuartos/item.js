import { HiPencil, HiTrash } from "react-icons/hi2";
import { useContext } from "react";
import { ContextoApp } from '../../../App.js'
import * as Api from '../../../service/api'

import ToastConfirmaDelete from '../ToastConfirmaDelete'

import { toast } from 'react-toastify';


export default function Quarto({ quarto, reloadLista }) {
    const { context } = useContext(ContextoApp)


    //Lida com o click do botao apagar
    //Responsavel por criar um 'toast' para confirmar a ação de remover quarto
    const handleDelete = (id) => {
        toast(
            ({ closeToast }) => (
                <ToastConfirmaDelete id={id} action={apagarQuarto} closeToast={closeToast} item='quarto' />
            ),
            {
                closeOnClick: true,
                close: false,
                autoClose: false,
                position: 'top-center',
            }
        );
    };

    //Aceita o id do quarto selecionado para apagar
    //Apaga o quarto e atualiza a lista de quartos
    function apagarQuarto(id) {
        Api.apagaQuarto(id)
            .then(data => data.json)
            .then(data => reloadLista())
    }

    return (
        <div key={quarto.id} className="group" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #C5C6D0', borderRadius: '5px' }}>

            <a href={`/quartos/${quarto.id}/detalhes`} style={{ display: 'flex', flexDirection: 'column', padding: '8px' }}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7" style={{ width: '100%', maxWidth: '200px', height: '100px', maxHeight: '200px' }}>
                    <img
                        // src={`https://hotel360dweb.azurewebsites.net/Imagens/e5814941-e716-4074-8841-2c09dbcbcce0.png`}
                        title={quarto.nome}
                        alt="imagem do quarto"
                        src={`https://hotel360dweb.azurewebsites.net/Imagens/${quarto.imagem}`}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                    ></img>
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{quarto.nome}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{quarto.preco}.00€</p>
            </a>
            {context.utilizador && context.utilizador.role === 'Gerentes' &&
                <div className="text-white font-semibold bg-indigo-500 shadow-sm" style={{ display: 'flex', justifyContent: 'space-around', padding: '3px' }}>
                    <a style={{ alignItems: 'center', borderRight: '1px solid white', flexGrow: 1, justifyContent: 'center' }} className="flex" href={`/quartos/${quarto.id}`}><HiPencil />Editar</a>
                    <button style={{ alignItems: 'center', borderLeft: '1px solid white', flexGrow: 1, justifyContent: 'center' }} className="flex" onClick={() => handleDelete(quarto.id)}><HiTrash />Apagar</button>
                </div>
            }
        </div>
    )
}