import Header from "../components/Header";
import Footer from "../components/Footer";

import "./Productos.css";

import lamparas from "../assets/ultimos-ingresos-lamparas.jpeg";
import spots from "../assets/ultimos-ingresos-spots.jpg";
import guantes from "../assets/ultimos-ingresos-guantes.jpg";

const productos = [
  {
    nombre: "Lámparas infrarrojas",
    categoria: "Agro",
    imagen: lamparas,
  },

  {
    nombre: "Spots embutidos",
    categoria: "Iluminación",
    imagen: spots,
  },

  {
    nombre: "Guantes moteados",
    categoria: "Protección",
    imagen: guantes,
  },
];

function Productos() {
  return (
    <>
      <Header />

      <section className="productos-hero">

        <div className="productos-overlay"></div>

        <div className="productos-hero-content">

          <span>CATÁLOGO</span>

          <h1>
            Productos para hogar,
            campo y producción
          </h1>

          <p>
            Descubrí materiales eléctricos,
            herramientas, iluminación y mucho más.
          </p>

        </div>

      </section>

      <section className="productos">

        <div className="filtros">

          <button>Todos</button>

          <button>Iluminación</button>

          <button>Herramientas</button>

          <button>Pinturas</button>

          <button>Agro</button>

        </div>

        <div className="productos-grid">

          {productos.map((producto, index) => (

            <div className="producto-card" key={index}>

              <img src={producto.imagen} alt="" />

              <div className="producto-info">

                <span>{producto.categoria}</span>

                <h3>{producto.nombre}</h3>

                <a
                    href={`https://wa.me/543462222645?text=Hola!%20Quiero%20consultar%20por%20${producto.nombre}`}
                    target="_blank"
                    rel="noreferrer"
                    >
                    <button>
                        CONSULTAR
                    </button>
                </a>

              </div>

            </div>

          ))}

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Productos;