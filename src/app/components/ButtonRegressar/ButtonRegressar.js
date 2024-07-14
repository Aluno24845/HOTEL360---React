import { useNavigate } from "react-router-dom";

export default function ButtonRegressar() {
    let navigate = useNavigate();
    function vaiParaTras() {
        navigate(-1);
    }
    return <>
        <span style={{ cursor: 'pointer', color: 'rgb(99 102 241)', marginBottom:10 }}
            onMouseOver={function (e) { e.currentTarget.style.color = 'orange' }}
            onMouseOut={function (e) { e.currentTarget.style.color = 'rgb(99 102 241)' }}
            onClick={vaiParaTras}>Voltar</span>
    </>
}