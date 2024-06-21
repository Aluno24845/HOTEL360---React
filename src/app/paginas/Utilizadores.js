import ListaUtilizadores from '../components/ListaUtilizadores/lista.js'

export default function Utilizadores() {
  return (
    <>
      <h1>Todos os Utilizadores</h1>
      <div className="overflow-y-scroll">
        <ListaUtilizadores />
      </div>
    </>
  );
}