import iconEntrega from "../assets/icon-entrega.png";
import iconStock from "../assets/icon-stock.png";
import iconConfianza from "../assets/icon-confianza.png";
import iconAsesoramiento from "../assets/icon-asesoramiento.png";
import "./Beneficios.css";

function Beneficios() {
  return (
    <section className="beneficios">

      <div className="beneficio">
        <img src={iconEntrega} alt="" className="beneficio-icon" />

        <h3>ENVÍOS</h3>

        <p>
          Entregas rápidas en Villa Cañás y alrededores.
        </p>
      </div>

      <div className="beneficio">
        <img src={iconStock} alt="" className="beneficio-icon" />

        <h3>STOCK</h3>

        <p>
          Productos disponibles y reposición constante.
        </p>
      </div>

      <div className="beneficio">
        <img src={iconConfianza} alt="" className="beneficio-icon" />

        <h3>CALIDAD</h3>

        <p>
          Trabajamos con marcas reconocidas y confiables.
        </p>
      </div>

      <div className="beneficio">
        <img src={iconAsesoramiento} alt="" className="beneficio-icon" />

        <h3>ASESORAMIENTO</h3>

        <p>
          Atención personalizada para cada necesidad.
        </p>
      </div>

    </section>
  );
}

export default Beneficios;