// import HeaderMenu from "./HeaderMenu";
// import UserAvatar from "../features/authentication/UserAvatar";
import { useContext } from "react";
import { ContextoApp } from '../../../App.js'
import { HiUserCircle } from "react-icons/hi2";


function Header() {

  // Usa o hook useContext para obter o contexto atual e a função para atualizar o contexto a partir do ContextoApp
  const { context, setContexto } = useContext(ContextoApp)
  // Função para lidar com o logout do utilizador
  function handleLogout() {
    localStorage.removeItem('token') // Remove o token de autenticação do localStorage
    setContexto({}) // Atualiza o contexto para um estado vazio, de modo a não ter utilizador
    window.location.pathname = '/'
  }

  return (
    <header className="col-span-2 p-4 align-middle bg-blue-365 text-white flex flex-row-reverse h-16 ">
      {/* Se houver utilizador autenticado, mostra o nome do utilizador e o botão de logout */}
      {context.utilizador && <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href={`/editar-utilizador/${context.utilizador.id}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
          <HiUserCircle />
          {context.utilizador.nome}
        </a>
        <span onClick={() => handleLogout()} className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" >Logout</span>
      </div>}
      {/* Se não houver utilizador autenticado, mostra os botões de registo e login */}
      {!context.utilizador &&
        <div>
          <a style={{ marginRight: 5 }} className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" href="/registo">Registar</a>
          <a className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" href="/login">Login</a>
        </div>
      }
    </header>
  );
}

// Exporta o componente Header para ser usado noutros componentes
export default Header;
