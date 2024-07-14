import { useEffect, useState } from 'react'
import Item from './item'
import * as Api from '../../../service/api'

export default function ListaQuartos() {
    const [reservas, setReservas] = useState([])


    //Apaga o reserva e atualiza a lista de reservas
    function reloadLista() {
        Api.getReservas()
            .then(data => data.json())
            .then(data => setReservas(data))
    }

    
    //Carrega todas a reservas da base de dados e guarda-a no estado
    useEffect(() => {
        Api.getReservas()
            .then(data => data.json())
            .then(data => setReservas(data))
    }, [])

    return (
        <div className="h-full bg-white border ">
            <div className="grid grid-cols-6 bg-gray-100 border-b border-gray-600">
                <div>Quarto</div>
                <div>Data reserva</div>
                <div>Check in</div>
                <div>Check out</div>
                <div>Valor pago</div>
            </div>
            {reservas.map((reserva) => (
                <Item reserva={reserva} reloadLista={reloadLista} key={reserva.id} />
            ))}
        </div>
    )
}
