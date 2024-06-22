import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//layout do site
import AppLayout from "./app/components/Layout/Layout";
//Importe das paginas para as routes
import Quartos from "./app/paginas/Quartos";
import Reservas from "./app/paginas/Reservas";
import Utilizadores from "./app/paginas/Utilizadores"
import CriarQuarto from "./app/paginas/CriarQuarto"
import CriarReserva from "./app/paginas/CriarReserva"

import Login from "./app/paginas/Login";
import Register from "./app/paginas/Registo";


var contextReferencia = {
  contexto: { admin: true },
  setContexto: () => { },
};

export const ContextoApp = createContext({ ...contextReferencia });

function App() {
  const [stateApp, setStateApp] = useState({ ...contextReferencia.contexto });

  return (
    <BrowserRouter>
      <ContextoApp.Provider value={{ context: stateApp, setContexto: setStateApp }}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/quartos" element={<Quartos />} />
            <Route path="/reservas" element={<Reservas />} />
            {stateApp.admin && <Route path="/utilizadores" element={<Utilizadores />} />}
            {stateApp.admin && <Route path="/criar-quarto" element={<CriarQuarto />} />}
            <Route path="/criar-reserva" element={<CriarReserva />} />
            {stateApp.admin && <Route path="/quartos/:id" element={<CriarQuarto />} />}
            {stateApp.admin && <Route path="/reservas/:id" element={<CriarReserva />} />}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/registo" element={<Register />}></Route>
        </Routes>
      </ContextoApp.Provider>
    </BrowserRouter>
  );
}

export default App;
