import { useEffect, useState } from "react";
import ButtonLG from "../ButtonLg/ButtonLg";
import * as Api from '../../../service/api'
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ContextoApp } from '../../../App.js'

export default function CriarServico() {
    const { context } = useContext(ContextoApp)
    // Estado para armazenar o e-mail e a senha
    const { id } = useParams()
    console.log('id ', id)
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState(null);
    const [descricao, setDescricao] = useState("");

    function apagarServico(id) {
        Api.apagarServico(id)
            .then(data => data.json())
            .then(() => { })
    }
    useEffect(() => {
        if (!id) return
        Api.getServicoComId(id)
            .then(data => data.json())
            .then(data => {
                setNome(data.nome)
                setPreco(data.preco)
                setDescricao(data.descricao)
            })
    }, [])

    // Função para lidar com o envio do formulário
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!nome || !preco || !descricao) {
            return
        }
        const data = {
            Nome: nome,
            Preco: preco,
            Descricao: descricao,
            PrecoAux: preco.toString()
        }

        if (!id)
            Api.criarServico(data)
                .then(data => data.json())
                .then(data => {
                    if (data.erro) {
                        console.log('Erro a guardar servico')
                    } else {
                        window.location.pathname = '/servicos'
                    }
                })
        else
            Api.editarServico(id, data)
                .then(data => data.json())
                .then(data => {
                    if (data.erro) {
                        console.log('Erro a guardar servico')
                    } else {
                        window.location.pathname = '/servicos'
                    }
                })
    };

    return (
        <form
            className="p-2 bg-gray-50 border-gray-200 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-2 p-4">
                <label htmlFor="email">Nome:</label>
                <input
                    className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
                    type="nome"
                    id="nome"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col gap-2 p-4">
                <label htmlFor="password">Preço:</label>
                <input
                    className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    type="number"
                    id="preco"
                    name="preco"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                />
            </div>

            <div className="flex flex-col gap-2 p-4">
                <label htmlFor="password">Descrição:</label>
                <input
                    className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    type="text"
                    id="descricao"
                    name="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col gap-2 p-5">
                <ButtonLG onClick={() => {
                    handleSubmit();
                }} type="submit">{id ? 'Editar' : 'Criar'}</ButtonLG>
            </div>
            {id && context.utilizador && context.utilizador.role === 'Gerentes' &&
                <div className="flex flex-col gap-2 p-5">
                    <button onClick={() => apagarServico(id)} style={{}} className="text-white bg-indigo-500 shadow-sm w-full hover:bg-indigo-400 text-blue-365 font-semibold hover:text-white py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:border-transparent " >Apagar</button>
                </div>
            }
        </form>
    )
}