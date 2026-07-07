import lampara from "../assets/ultimos-ingresos-lamparas.jpeg";
import spot from "../assets/ultimos-ingresos-spots.jpg";
import guantes from "../assets/ultimos-ingresos-guantes.jpg";
import "./UltimosIngresos.css";

const whatsappBase = "https://wa.me/5493462222645";

const productos = [
  {
    titulo: "Lamparas infrarrojas",
    consulta: "lamparas infrarrojas",
    descripcion: "Optima emision de calor para desarrollo saludable.",
    imagen: lampara,
  },
  {
    titulo: "Spots LED",
    consulta: "spots LED de alta potencia",
    descripcion: "Iluminacion profesional para cada necesidad.",
    imagen: spot,
  },
  {
    titulo: "Guantes moteados",
    consulta: "guantes moteados",
    descripcion: "Maxima proteccion y agarre para trabajos exigentes.",
    imagen: guantes,
  },
];

function UltimosIngresos() {
  return (
    <section className="ultimos" id="ultimos-ingresos">
      <div className="section-title">
        <span>//</span>
        <h2>ULTIMOS INGRESOS</h2>
      </div>

      <div className="cards-grid">
        {productos.map((producto) => {
          const mensaje = encodeURIComponent(
            `Hola!! queria consultar por ${producto.consulta}`
          );

          return (
          <a
            className="producto-card"
            href={`${whatsappBase}?text=${mensaje}`}
            key={producto.titulo}
            target="_blank"
            rel="noreferrer"
          >
            <img src={producto.imagen} alt={producto.titulo} />

            <div className="producto-info">
              <h3>{producto.titulo}</h3>
              <p>{producto.descripcion}</p>
              <span>Consultar</span>
            </div>
          </a>
          );
        })}
      </div>
    </section>
  );
}

export default UltimosIngresos;
