import { useContext } from "react";
import { useParams } from "react-router-dom";
import RegistoForm from "../components/RegistoForm/RegistoForm";
import { ContextoApp } from '../../App.js';

export default function Registo() {

    const { id } = useParams()
    const { context } = useContext(ContextoApp);

    const autorizado =(( id && (context.utilizador.id === parseInt(id)) || (context.utilizador.role === 'Gerentes' || context.utilizador.role === 'Reccecionistas')));
    
    if (!autorizado) {
        window.location.pathname = '/'
        return
    }

    return <RegistoForm />
}