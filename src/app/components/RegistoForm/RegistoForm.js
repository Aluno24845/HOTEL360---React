import { useState, useContext } from "react";
import Select from 'react-select';
import ButtonLG from "../ButtonLg/ButtonLg";
import { ContextoApp } from '../../../App.js'
import * as Api from '../../../service/api.js'

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
  // Estados para armazenar os dados do formulário
  const [tipo, setTipo] = useState();
  const [listaTipo, setListaTipo] = useState(opcoes);

  const [email, setEmail] = useState("");
  const [nif, setNif] = useState("");
  const [password, setPassword] = useState("");
  const [numerRececionista, setNumerRececionista] = useState("");
  const [nome, setNome] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [telemovel, setTelemovel] = useState("");
  const [dataNasc, setDataNasc] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {

    e.preventDefault();

    const data = {
      Email: email,
      Password: password,
      ConfirmPassword: confirmarPassword,
      Nome: nome,
      Telemovel: telemovel,
      DataNascimento: new Date(dataNasc).toISOString().split("T")[0],
      NIF: nif,
      Avatar: null,
      Tipo: tipo && tipo.value
    }

    if (context.utilizador) {
      Api.criarGerenteOuRececionista(data)
        .then(data => data.json())
        .then(data => {
          if (data.sucesso) {
            window.location.pathname = '/utilizadores'
          } else {
            console.log('erro')
          }
        })
    } else {
      Api.criarUtilizador(data)
        .then(data => data.json())
        .then(data => {
          if (data.sucesso) {
            window.location.pathname = '/login'
          } else {
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
      <div className="flex flex-col gap-2 p-4">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <label htmlFor="senha" className="form-label">
          Senha:
        </label>
        <input
          className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
          type="password"
          id="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <label htmlFor="senha" className="form-label">
          Confirmar Senha:
        </label>
        <input
          className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
          type="password"
          id="confirmarPassword"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <label htmlFor="email" className="form-label">
          Nome:
        </label>
        <input
          className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
          type="text"
          id="nome"
          value={nome}
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
          id="dataNasc"
          value={dataNasc}
          onChange={(e) => setDataNasc(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <label htmlFor="dataNascimento" className="form-label">
          Telemóvel:
        </label>
        <input
          className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
          type="number"
          id="telemovel"
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
            isMulti={false}
            options={listaTipo}
          />
        </div>
      }
      {(!context.utilizador || (tipo && (tipo.value === 'Gerentes' || tipo.value === 'Hospedes'))) &&
        <div className="flex flex-col gap-2 p-4">
          <label htmlFor="dataNascimento" className="form-label">
            NIF:
          </label>
          <input
            className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
            type="number"
            id="nif"
            value={nif}
            onChange={(e) => setNif(e.target.value)}
            required
          />
        </div>
      }
      {context.utilizador && tipo && tipo.value === 'Reccecionistas' &&
        <div className="flex flex-col gap-2 p-4">
          <label htmlFor="dataNascimento" className="form-label">
            Número de Rececionista:
          </label>
          <input
            className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
            type="number"
            id="numeroRececionista"
            value={numerRececionista}
            onChange={(e) => setNumerRececionista(e.target.value)}
            required
          />
        </div>
      }
      <div className="flex flex-col gap-2 p-4">
        <ButtonLG
          type="submit"
          onClick={() => { handleSubmit(); }}
          className="btn btn-primary btn-lg btn-block"
        >
          Registar
        </ButtonLG>
      </div>
    </form>
  );
}
