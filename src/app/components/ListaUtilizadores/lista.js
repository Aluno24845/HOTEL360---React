import Item from "./Item";
import { HiPencil, HiTrash } from "react-icons/hi2";

import { useEffect, useState } from 'react'
import * as Api from '../../../service/api'

export default function ListaUtilizadores() {
    const [contas, setContas] = useState({})

    useEffect(() => {
        Api.getUtilizadores()
            .then(data => data.json())
            .then(data => setContas({ ...data }))
    }, [])

    return <div>
        <div className="h-full bg-white  ">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-1xl" style={{ paddingTop: 25, paddingBottom: 10 }}>Gerentes</h2>
            <div className="grid grid-cols-4 bg-gray-100 border-b border-gray-600">
                <div>Id</div>
                <div>Nome</div>
                <div>Telemóvel</div>
                <div>NIF</div>
            </div>
            {contas.gerentes && contas.gerentes.map((utilizador) => (
                <Item utilizador={utilizador} key={utilizador.id} />
            ))}
        </div>
        <div className="h-full bg-white  ">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-1xl" style={{ paddingTop: 25, paddingBottom: 10 }}>Rececionistas</h2>
            <div className="grid grid-cols-4 bg-gray-100 border-b border-gray-600">
                <div>Id</div>
                <div>Nome</div>
                <div>Telemóvel</div>
                <div></div>
            </div>
            {contas.rececionistas && contas.rececionistas.map((utilizador) => (
                <Item utilizador={utilizador} key={utilizador.id} />
            ))}
        </div>
        <div className="h-full bg-white  ">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-1xl" style={{ paddingTop: 25, paddingBottom: 10 }}>Hospedes</h2>
            <div className="grid grid-cols-4 bg-gray-100 border-b border-gray-600">
                <div>Id</div>
                <div>Nome</div>
                <div>Telemóvel</div>
                <div>NIF</div>
            </div>
            {contas.hospedes && contas.hospedes.map((utilizador) => (
                <Item utilizador={utilizador} key={utilizador.id} />
            ))}
        </div>
    </div>
}