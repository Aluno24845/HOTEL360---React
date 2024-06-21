import ListaReservas from '../components/ListaReservas/lista.js'

export default function Reservas() {
  return (
    <>
      <h1>Todos as Reservas</h1>
      <div className="overflow-y-scroll">
        <ListaReservas />
      </div>
    </>
  );
}