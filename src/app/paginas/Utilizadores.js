import ListaUtilizadores from '../components/ListaUtilizadores/lista.js'
import { useContext } from "react";
import { ContextoApp } from '../../App.js'

export default function Utilizadores() {
  const { context } = useContext(ContextoApp)
  return (
    <>
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-1xl">Contas</h2>
      {context.utilizador && context.utilizador.role === 'Gerentes' &&
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 0px' }}>
            <a href="/criar-gerente-rececionista" className='flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'>Criar Gerente/Rececionista</a>
          </div>
          <div className="">
            <ListaUtilizadores />
          </div>
        </>
      }
    </>
  );
}