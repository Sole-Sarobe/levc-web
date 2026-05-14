import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Herramientas from "./pages/Herramientas";
import Pinturas from "./pages/Pinturas";
import Contacto from "./pages/Contacto";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Inicio />} />

        <Route
          path="/productos"
          element={<Productos />}
        />

        <Route
          path="/herramientas"
          element={<Herramientas />}
        />

        <Route
          path="/pinturas"
          element={<Pinturas />}
        />

        <Route
          path="/contacto"
          element={<Contacto />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;