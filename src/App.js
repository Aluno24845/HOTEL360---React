import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//layout do site
import AppLayout from "./app/components/Layout/Layout";
//Importe das paginas para as routes
import Quartos from "./app/paginas/Quartos";
import Reservas from "./app/paginas/Reservas";
import Utilizadores from "./app/paginas/Utilizadores"

import Login from "./app/paginas/Login";
import Register from "./app/paginas/Registo";


var contextReferencia = {
  contexto: {},
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
            <Route path="/utilizadores" element={<Utilizadores />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/registo" element={<Register />}></Route>
        </Routes>
      </ContextoApp.Provider>
    </BrowserRouter>
  );
}

export default App;
