import "./Banner.css";

import localEsquina from "../assets/local-real-esquina.png";
import localFrente from "../assets/local-real-frente.png";
import localDeposito from "../assets/local-real-deposito.png";

const fotosLocal = [
  {
    src: localEsquina,
    alt: "Local LaEleVC visto desde la esquina",
  },
  {
    src: localFrente,
    alt: "Frente del local LaEleVC",
  },
  {
    src: localDeposito,
    alt: "Deposito y acceso del local LaEleVC",
  },
];

function Banner() {
  return (
    <section className="banner">
      <div className="banner-info">
        <div className="banner-left">
          <span>MAS DE</span>
          <h2>35</h2>
          <p>AÑOS</p>
        </div>

        <div className="banner-text">
          <h3>Acompañandote a iluminar y cumplir tus proyectos</h3>

          <button>CONOCENOS</button>
        </div>
      </div>

      <div className="banner-image" aria-label="Fotos reales del local LaEleVC">
        {fotosLocal.map((foto, index) => (
          <img
            src={foto.src}
            alt={foto.alt}
            className={`banner-slide banner-slide-${index + 1}`}
            key={foto.src}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;
