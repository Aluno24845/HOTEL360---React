export default function Item({utilizador}){

    return (
        <div className="grid grid-cols-4 border-b">
            <div>{utilizador.id}</div>
            <div>{utilizador.nome}</div>
            <div>{utilizador.telemovel}</div>
            <div>{utilizador.nif}</div>
        </div>
    )
}