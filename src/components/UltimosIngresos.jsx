import lampara from "../assets/hero-cerdo.jpg";
import spot from "../assets/hero-local.jpg";
import guantes from "../assets/hero-logistica.jpg";
import "./UltimosIngresos.css";

const productos = [
  {
    titulo: `LÁMPARAS
INFRARROJAS`,
    descripcion:
      "Óptima emisión de calor para desarrollo saludable.",
    imagen: lampara,
  },

  {
    titulo: `SPOTS LED
DE ALTA POTENCIA`,
    descripcion:
      "Iluminación profesional para cada necesidad.",
    imagen: spot,
  },

  {
    titulo: `GUANTES
MOTEADOS`,
    descripcion:
      "Máxima protección y agarre para trabajos exigentes.",
    imagen: guantes,
  },
];

function UltimosIngresos() {
  return (
    <section className="ultimos">
      <div className="section-title">
        <span>//</span>

        <h2>ÚLTIMOS INGRESOS</h2>
      </div>

      <div className="cards-grid">
        {productos.map((producto, index) => (
          <div className="producto-card" key={index}>
            <div className="producto-info">
              <h3 style={{ whiteSpace: "pre-line" }}>
                {producto.titulo}
              </h3>

              <p>{producto.descripcion}</p>

              <button>VER MÁS</button>
            </div>

            <img src={producto.imagen} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default UltimosIngresos;