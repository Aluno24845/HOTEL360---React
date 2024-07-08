import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Api from './service/api'
//layout do site
import AppLayout from "./app/components/Layout/Layout";
//Importe das paginas para as routes
import Home from './app/paginas/Home'
import Quartos from "./app/paginas/Quartos";
import Reservas from "./app/paginas/Reservas";
import Servicos from "./app/paginas/Servicos"
import Utilizadores from "./app/paginas/Utilizadores"
import CriarQuarto from "./app/paginas/CriarQuarto"
import CriarReserva from "./app/paginas/CriarReserva"
import CriarServico from "./app/paginas/CriarServico"
import CriarUtilizador from "./app/paginas/CriarUtilizador"
import Login from "./app/paginas/Login";
import Register from "./app/paginas/Registo";
import QuartoDetalhe from "./app/paginas/QuartoDetalhe"
import ReservaDetalhe from "./app/paginas/ReservaDetalhe"
import ServicoDetalhe from "./app/paginas/ServicoDetalhe"

var contextReferencia = {
  contexto: {},
  setContexto: () => { },
};

export const ContextoApp = createContext({ ...contextReferencia });

function App() {
  const [stateApp, setStateApp] = useState({ ...contextReferencia.contexto });

  useEffect(() => {
    if (!stateApp.user && localStorage.getItem('token'))
      Api.getMyself()
        .then(data => {
          if (data.status !== 200) {
            return { erro: 'Sessao expirou' }
          } else {
            return data.json()
          }
        })
        .then(data => {
          if (data.erro) {
            localStorage.removeItem('token')
            if (data.erro === 'Sessão expirou')
              return window.location.pathname = '/login'
          } else {
            data.utilizador.role = data.role
            setStateApp({ utilizador: { ...data.utilizador }, ...stateApp })
          }
        })
  }, [])

  return (
    <BrowserRouter>
      <ContextoApp.Provider value={{ context: stateApp, setContexto: setStateApp }}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/quartos" element={<Quartos />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/utilizadores" element={<Utilizadores />} />
            <Route path="/quartos/:id/detalhes" element={<QuartoDetalhe />} />
            <Route path="/servicos/:id/detalhes" element={<ServicoDetalhe />} />
            {stateApp.utilizador && stateApp.utilizador.role === 'Gerentes' &&
              <>
                <Route path="/criar-gerente-rececionista" element={<CriarUtilizador />} />
                <Route path="/utilizadores" element={<Utilizadores />} />
                <Route path="/criar-quarto" element={<CriarQuarto />} />
                <Route path="/criar-servico" element={<CriarServico />} />
                <Route path="/quartos/:id" element={<CriarQuarto />} />
                <Route path="/servicos/:id" element={<CriarServico />} />
              </>
            }
            {stateApp.utilizador && (stateApp.utilizador.role === 'Gerentes' || stateApp.utilizador && stateApp.utilizador.role === 'Reccecionistas') &&
              <>
                <Route path="/reservas/:id" element={<CriarReserva />} />
              </>
            }

            {stateApp.utilizador &&
              <>
                <Route path="/reservas" element={<Reservas />} />
                <Route path="/criar-reserva" element={<CriarReserva />} />
                <Route path="/reservas/:id/detalhes" element={<ReservaDetalhe />} />
              </>
            }
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/registo" element={<Register />}></Route>
        </Routes>
      </ContextoApp.Provider>
    </BrowserRouter>
  );
}

export default App;
