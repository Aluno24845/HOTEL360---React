import { useState, useContext } from "react";
import ButtonLG from "../ButtonLg/ButtonLg";
import * as Api from '../../../service/api'
import { ContextoApp } from '../../../App.js'

export default function LoginForm() {
  // Estado para armazenar o e-mail e a senha
  const [email, setEmail] = useState("mariajoao@aa.aa");
  const [password, setPassword] = useState("2024-Aulas");
  const { context, setContexto } = useContext(ContextoApp)
  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o e-mail e a senha para o servidor

    Api.autenticar({ email, password })
      .then(data => data.json())
      .then(dataAutenticacao => {
        if(dataAutenticacao.status && dataAutenticacao.status !==200){
          alert('autenticacao falhou')
          return 
        }
        localStorage.setItem('token', dataAutenticacao.accessToken)
        setContexto({ ...dataAutenticacao, ...context })
        window.location.pathname='/quartos'
      })
  };

  return (
    <form
      className="p-2 bg-gray-50 border-gray-200 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 p-4">
        <label htmlFor="email">E-mail:</label>
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
        <label htmlFor="password">Senha:</label>
        <input
          className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-2 p-5">
        <ButtonLG type="submit">Login</ButtonLG>
      </div>
    </form>
  );
};