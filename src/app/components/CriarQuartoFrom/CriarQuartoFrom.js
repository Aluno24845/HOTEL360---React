import { useEffect, useState } from "react";
import ButtonLG from "../ButtonLg/ButtonLg";
import * as Api from '../../../service/api'
import { useParams } from "react-router-dom";
import ButtonRegressar from "../ButtonRegressar/ButtonRegressar";


export default function CriarQuarto() {
    // Obtém o parâmetro "id" da URL
    const { id } = useParams()
    console.log('id ', id)

    // Definir os estados locais para armazenar os valores do formulário
    const [nome, setNome] = useState("");
    const [capacidade, setCapacidade] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [localizacao, setLocalizacao] = useState("");

    // Função para apagar um quarto
    function apagarQuarto(id) {
        Api.apagaQuarto(id)
            .then(data => data.json())
            .then(data => {
                if (data.erro) {
                    console.log(data)
                } else {
                    window.location.pathname = '/quartos'
                }
            })
    }

    // useEffect para carregar os dados do quarto quando o componente monta, se um ID estiver presente
    useEffect(() => {
        if (!id) return
        Api.getQuartoComId(id)
            .then(data => data.json())
            .then(data => {
                setNome(data.nome)
                setCapacidade(data.capacidade)
                setPreco(data.preco)
                setDescricao(data.descricao)
                setLocalizacao(data.localizacao)
                setSelectedImage(`https://hotel360dweb.azurewebsites.net/Imagens/${data.imagem}`)
            })
            // eslint-disable-next-line
    }, [])

    // Função para lidar com o envio do formulário
    const handleSubmit = (event) => {
        event.preventDefault();

        // Valida os campos do formulário antes de enviar
        if (!nome || !capacidade || !preco || !descricao || !selectedImage)
            return
        if (!id)
            // Cria um novo quarto se não houver ID
            Api.criarQuarto({ Nome: nome, Capacidade: capacidade, Localizacao: localizacao, PrecoAux: preco, Descricao: descricao, ImagemLogo: selectedImage })
                .then(data => data.json())
                .then(data => {
                    if (data.erro) {
                        console.log('Erro a guardar quarto')
                    } else {
                        window.location.pathname = '/quartos'
                    }
                })
        else
            // Edita um quarto existente se houver ID
            Api.editarQuarto(id, { Nome: nome, Capacidade: capacidade, Localizacao: localizacao, PrecoAux: preco.toString(), Descricao: descricao.toString(), ImagemLogo: selectedImage })
                .then(data => data.json())
                .then(data => {
                    if (data.erro) {
                        console.log('Erro a guardar quarto')
                    } else {
                        window.location.pathname = '/quartos'
                    }
                })
    };

    return (
        <form
            className="p-2 bg-gray-50 border-gray-200 rounded-lg"
            onSubmit={handleSubmit}
        >
            <ButtonRegressar></ButtonRegressar>
            {/* Exibição da imagem selecionada */}
            {id &&
            <div className="flex flex-col gap-2 p-4" >
                {selectedImage && (
                    <div style={{ maxWidth: '500px', width: '100%', alignSelf: 'center' }}>
                        <img
                            alt={nome}
                            width={"100%"}
                            src={selectedImage}
                            />
                    </div>
                )}
            </div>
            }
            {/* Campo de entrada para o nome do quarto */}
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
            {/* Campo de entrada para a capacidade do quarto */}
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
            {/* Campo de entrada para o preço do quarto */}
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
            {/* Campo de entrada para a descrição do quarto */}
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
            {/* Campo de entrada para a localização do quarto */}
            <div className="flex flex-col gap-2 p-4">
                <label htmlFor="password">Localização:</label>
                <input
                    className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    type="text"
                    id="localizacao"
                    name="localizacao"
                    value={localizacao}
                    onChange={(e) => setLocalizacao(e.target.value)}
                    required
                />
            </div>
            {/* Exibição da imagem selecionada para troca */}
            {selectedImage && (
                <div className="flex flex-col gap-2 p-4">
                    <div>
                        <img
                            alt="imagem do quarto"
                            width={"250px"}
                            src={URL.createObjectURL(selectedImage)}
                        />
                    </div>
                </div>
            )}
            {/* Campo de entrada para trocar a imagem */}
            {(id || !selectedImage) && (
                <div className="flex flex-col gap-2 p-4">
                    <span>{id ? 'Editar' : 'Adicionar'} Imagem </span>
                    <input
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                            setSelectedImage(event.target.files[0])
                        }}
                        required
                    />
                </div>
            )}
            {/* Botão para enviar o formulário */}
            <div className="flex flex-col gap-2 p-5">
                <ButtonLG onClick={() => {
                    handleSubmit();
                }} type="submit">{id ? 'Editar' : 'Criar'}</ButtonLG>
            </div>
            {/* Botão para apagar o quarto se o ID estiver presente */}
            {id &&
                <div className="flex flex-col gap-2 p-5">
                    <button onClick={() => apagarQuarto(id)} style={{}} className="text-white bg-indigo-500 shadow-sm w-full hover:bg-indigo-400 text-blue-365 font-semibold hover:text-white py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:border-transparent " >Apagar</button>
                </div>}
        </form>
    )
}