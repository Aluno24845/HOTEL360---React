import ListaQuartos from '../components/ListaQuartos/lista.js'

export default function Quartos() {
  return (
    <>
      <h1>Todos os quartos</h1>
      <div className="overflow-y-scroll">
        <ListaQuartos />
      </div>
    </>
  );
}