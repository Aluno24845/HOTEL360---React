import ListaQuartos from '../components/ListaQuartos/lista.js'
import { useContext } from "react";
import { ContextoApp } from '../../App.js'

export default function Quartos() {
  const { context } = useContext(ContextoApp)
  return (
    <>
      {context.admin && <a href="/criar-quarto">Criar quarto</a>}
      <h1>Todos os quartos</h1>
      <div className="overflow-y-scroll">
        <ListaQuartos />
      </div>
    </>
  );
}