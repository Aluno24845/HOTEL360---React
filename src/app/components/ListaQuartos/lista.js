import { useEffect, useState } from 'react'
import Item from './item'
import * as Api from '../../../service/api'
import { useContext } from "react";
import { ContextoApp } from '../../../App.js'

export default function ListaQuartos() {
    const [quartos, setQuartos] = useState([])
    const { context } = useContext(ContextoApp)

    function reloadLista() {
        Api.getQuartos()
            .then(data => data.json())
            .then(data => setQuartos(data))
    }

    useEffect(() => {
        Api.getQuartos()
            .then(data => data.json())
            .then(data => setQuartos(data))
    }, [])

    return <div className="bg-white">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {quartos.map((quarto) => (
                    <Item quarto={quarto} reloadLista={reloadLista} key={quarto.id} />
                ))}
            </div>
    </div>
}
