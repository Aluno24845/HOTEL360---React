import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from 'react-select';
import ButtonLG from "../ButtonLg/ButtonLg";
import { ContextoApp } from '../../../App.js'
import * as Api from '../../../service/api.js'
import ButtonRegressar from "../ButtonRegressar/ButtonRegressar.js";

const opcoes = [{
  label: 'Gerente',
  value: 'Gerentes'
},
{
  label: 'Rececionista',
  value: 'Reccecionistas'
},
{
  label: 'Hospede',
  value: 'Hospedes'
}];

export default function RegistoForm() {
  const { context } = useContext(ContextoApp);
  const { id } = useParams()

  // Estados para armazenar os dados do formulário
  const [tipo, setTipo] = useState();
  // eslint-disable-next-line
  const [listaTipo, setListaTipo] = useState(opcoes);

  const [email, setEmail] = useState("");
  const [nif, setNif] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [telemovel, setTelemovel] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id)
      return
    Api.getUtilizador(id)
      .then(data => data.json())
      .then(data => {
        setEmail(data.email)
        setNif(data.nif)
        setNome(data.nome)
        setTelemovel(data.telemovel)
        setDataNasc(data.dataNascimento)
        setAvatar(data.avatar)
        const minhaRole = opcoes.find(x => x.value === data.role)
        setTipo(minhaRole)
      })
      // eslint-disable-next-line
  }, [])

  function mostrarErrorServidor(listaErros) {
    // tentar extrair os erros returnados pelo model do aspnet
    let stringErros = ""
    if (listaErros.errors) {
      Object.keys(listaErros.errors).forEach((key, index) => {
        // if (index > 0) stringErros += ``
        stringErros += `<b>${key}</b>`
        for (const erro of listaErros.errors[key]) {
          stringErros += `<p>${erro}</p>`
        }
      })
    }

    if (stringErros) {
      document.querySelector('#listaErrors').innerHTML = stringErros
      setError(true)
    } else {
      document.querySelector('#listaErrors').innerHTML = ''
      setError(false)
    }
  }
  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {

    e.preventDefault();
    // if (password !== confirmarPassword) {
    //   toast.error('As senhas não coincidem', {
    //     position: "top-center", // Centraliza o toast no topo
    //     autoClose: 1000, // Fecha automaticamente após 5 segundos
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     draggable: true,
    //     progress: undefined,
    //   })
    //   return;
    // };

    const data = {
      Email: email,
      Password: password,
      ConfirmPassword: confirmarPassword,
      Nome: nome,
      Telemovel: telemovel,
      DataNascimento: new Date(dataNasc).toISOString().split("T")[0],
      NIF: nif || "",
      ImagemLogo: selectedImage ? selectedImage : null,
      Tipo: tipo && tipo.value
    }

    if (context.utilizador) {
      if (id) {
        Api.editarUtilizador(id, data)
          .then(data => data.json())
          .then(data => {
            if (data.sucesso) {
              window.location.pathname = '/utilizadores'
            } else {
              console.log('erro')
              mostrarErrorServidor(data)
            }
          })
      } else {
        Api.criarUtilizador(data)
          .then(data => data.json())
          .then(data => {
            if (data.sucesso) {
              window.location.pathname = '/utilizadores'
            } else {
              mostrarErrorServidor(data)
              console.log('erro')
            }
          })
      }
    } else {
      Api.criarHospede(data)
        .then(data => data.json())
        .then(data => {
          if (data.sucesso) {
            window.location.pathname = '/login'
          } else {
            mostrarErrorServidor(data)
            console.log('erro')
          }
        })
    }
  };

  return (
    <form
      className="p-2 bg-gray-50 border-gray-200 rounded-lg"
      onSubmit={handleSubmit}
    >
      <ButtonRegressar></ButtonRegressar>
      <div className="flex flex-col gap-2 p-4" style={{ alignItems: 'center' }}>
        {(avatar || selectedImage) &&
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7" style={{ width: '100%', maxWidth: '200px', height: '100px', maxHeight: '200px' }}>
            <img
              title={nome}
              alt="avatar"
              src={selectedImage
                ? URL.createObjectURL(selectedImage)
                : `https://hotel360dweb.azurewebsites.net/Imagens/${avatar}`}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            ></img>
          </div>
        }
      </div>
      {(id || !selectedImage) && (
        <div className="flex flex-col gap-2 p-4">
          <span>{id ? 'Editar' : 'Adicionar'} Avatar </span>
          <input
            type="file"
            style={{ color: 'transparent' }}
            name="myImage"
            required={(!id || (!avatar && !selectedImage))}
            onChange={(event) => {
              setSelectedImage(event.target.files[0])
            }}
          />
        </div>
      )}
      <div className="flex flex-col gap-2 p-4">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
          type="email"
          id="email"
          value={email}
          // disabled={!!id}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {!id &&
        <div className="flex flex-col gap-2 p-4">
          <label htmlFor="senha" className="form-label">
            Senha:
          </label>
          <input
            className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
            type="password"
            id="senha"
            pattern=".{8,20}"
            title="A senha deve ter entre 8 e 20 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      }
      {!id &&
        <div className="flex flex-col gap-2 p-4">
          <label hidden={!!id} htmlFor="senha" className="form-label">
            Confirmar Senha:
          </label>
          <input
            className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
            type="password"
            id="confirmarPassword"
            hidden={!!id}
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            required
          />
        </div>
      }
      <div className="flex flex-col gap-2 p-4">
        <label htmlFor="nome" className="form-label">
          Nome:
        </label>
        <input
          className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
          type="text"
          name="nome"
          id="nome"
          value={nome}
          disabled={!!id}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <label htmlFor="dataNascimento" className="form-label">
          Data de Nascimento:
        </label>
        <input
          className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
          type="date"
          name="dataNascimento"
          id="dataNasc"
          value={dataNasc}
          disabled={!!id}
          onChange={(e) => setDataNasc(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <label htmlFor="telemovel" className="form-label">
          Telemóvel:
        </label>
        <input
          className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
          type="tel"
          pattern="9[1236][0-9]{7}"
          title="Insira um contato válido!"
          id="telemovel"
          name="telemovel"
          value={telemovel}
          onChange={(e) => setTelemovel(e.target.value)}
          required
        />
      </div>
      {context.utilizador && context.utilizador.role === 'Gerentes' &&
        <div className="flex flex-col gap-2 p-4">
          <label>Role</label>
          <Select
            value={tipo}
            defaultValue={tipo}
            onChange={setTipo}
            isDisabled={!!id}
            isMulti={false}
            options={listaTipo}
            required
          />
        </div>
      }
      {(!context.utilizador || (tipo && (tipo.value === 'Gerentes' || tipo.value === 'Hospedes'))) &&
        <div className="flex flex-col gap-2 p-4">
          <label htmlFor="nif" className="form-label">
            NIF:
          </label>
          <input
            className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
            type="tel"
            id="nif"
            value={nif}
            pattern="[1235679][0-9]{8}"
            title="O NIF inserido é inválido!"
            name="nif"
            onChange={(e) => setNif(e.target.value)}
          />
        </div>
      }


      <div className="flex flex-col gap-2 p-4 text-red-500" id="listaErrors"></div>

      <div className="flex flex-col gap-2 p-4">
        <ButtonLG
          type="submit"
          onClick={() => { handleSubmit(); }}
          className="btn btn-primary btn-lg btn-block"
        >
          {id ? 'Editar' : 'Criar'}
        </ButtonLG>
      </div>
    </form >
  );
}
