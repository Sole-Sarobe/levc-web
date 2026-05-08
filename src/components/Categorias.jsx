import "./Categorias.css";
function Categorias() {
  return (
    <section className="categorias">

      <div className="section-title">
        <span>//</span>
        <h2>COMPRÁ POR CATEGORÍA</h2>
      </div>

      <div className="categorias-grid">

        <div className="categoria electricidad">
          <div className="categoria-overlay"></div>

          <div className="categoria-info">
            <h3>ELECTRICIDAD</h3>

            <p>
              Materiales eléctricos para instalaciones,
              hogares y producción.
            </p>

            <button>VER PRODUCTOS</button>
          </div>
        </div>

        <div className="categoria herramientas">
          <div className="categoria-overlay"></div>

          <div className="categoria-info">
            <h3>HERRAMIENTAS</h3>

            <p>
              Herramientas profesionales para cada trabajo.
            </p>

            <button>VER PRODUCTOS</button>
          </div>
        </div>

        <div className="categoria pinturas">
          <div className="categoria-overlay"></div>

          <div className="categoria-info">
            <h3>PINTURAS</h3>

            <p>
              Pinturas para hogar, industria y campo.
            </p>

            <button>VER PRODUCTOS</button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Categorias;