import { useContext } from "react";
import { ContextoApp } from '../../App.js'
import ListaReservas from '../components/ListaReservas/lista.js'

export default function Reservas() {
  const { context } = useContext(ContextoApp)
  return (
    <>
      {context.admin && <a href="/criar-reserva">Criar Reserva</a>}
      <h1>Todos as Reservas</h1>
      <div className="overflow-y-scroll">
        <ListaReservas />
      </div>
    </>
  );
}