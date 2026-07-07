import { Link } from "react-router-dom";

import "./Categorias.css";

function Categorias() {
  return (
    <section className="categorias">
      <div className="section-title">
        <span>//</span>
        <h2>COMPRÁ POR CATEGORÍA</h2>
      </div>

      <div className="categorias-grid">
        <Link className="categoria electricidad" to="/productos#iluminacion">
          <div className="categoria-overlay"></div>

          <div className="categoria-info">
            <h3>ELECTRICIDAD</h3>

            <p>
              Materiales eléctricos para instalaciones, hogares y producción.
            </p>

            <span className="categoria-boton">VER PRODUCTOS</span>
          </div>
        </Link>

        <Link className="categoria herramientas" to="/productos#herramientas">
          <div className="categoria-overlay"></div>

          <div className="categoria-info">
            <h3>HERRAMIENTAS</h3>

            <p>Herramientas profesionales para cada trabajo.</p>

            <span className="categoria-boton">VER PRODUCTOS</span>
          </div>
        </Link>

        <Link className="categoria pinturas" to="/productos#pinturas">
          <div className="categoria-overlay"></div>

          <div className="categoria-info">
            <h3>PINTURAS</h3>

            <p>Pinturas para hogar, industria y campo.</p>

            <span className="categoria-boton">VER PRODUCTOS</span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Categorias;
