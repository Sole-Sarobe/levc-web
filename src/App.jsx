import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Importaciones from "./pages/Importaciones";
import Herramientas from "./pages/Herramientas";
import Pinturas from "./pages/Pinturas";
import Contacto from "./pages/Contacto";
import Admin from "./pages/Admin";

const basename =
  import.meta.env.BASE_URL === "/"
    ? "/"
    : import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  return (
    <BrowserRouter basename={basename}>

      <Routes>

        <Route path="/" element={<Inicio />} />

        <Route
          path="/productos"
          element={<Productos />}
        />

        <Route
          path="/importaciones"
          element={<Importaciones />}
        />

        <Route
          path="/admin"
          element={<Admin />}
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
