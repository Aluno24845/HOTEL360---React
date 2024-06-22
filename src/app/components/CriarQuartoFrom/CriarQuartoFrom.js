import { useEffect, useState } from "react";
import ButtonLG from "../ButtonLg/ButtonLg";
import * as Api from '../../../service/api'
import { useParams } from "react-router-dom";

export default function CriarQuarto() {
    // Estado para armazenar o e-mail e a senha
    const { id } = useParams()
    console.log('id ', id)
    const [nome, setNome] = useState("");
    const [capacidade, setCapacidade] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");

    useEffect(() => {
        if (!id) return
        Api.getQuartoComId(id)
            .then(data => data.json())
            .then(data => {
                setNome(data.nome)
                setCapacidade(data.capacidade)
                setPreco(data.preco)
                setDescricao(data.descricao)
            })
    }, [])

    // Função para lidar com o envio do formulário
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!nome || !capacidade || !preco || !descricao)
            return
        if (!id)
            Api.criarQuarto({ nome, capacidade, preco, descricao })
                .then(data => data.json())
                .then(data => {
                    window.location.pathname = '/quartos'
                })
        else
            Api.editarQuarto(id, { nome, capacidade, preco, descricao })
                .then(data => data.json())
                .then(data => {
                    window.location.pathname = '/quartos'
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
                <label htmlFor="password">Capacidade:</label>
                <input
                    className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    type="number"
                    id="capacidade"
                    name="capacidade"
                    value={capacidade}
                    onChange={(e) => setCapacidade(e.target.value)}
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
        </form>
    );
    return <>


    </>
}