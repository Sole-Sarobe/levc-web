import {
  Award,
  BadgeDollarSign,
  CheckCircle2,
  Globe2,
  Handshake,
  PackageCheck,
  ShieldCheck,
  Warehouse,
} from "lucide-react";
import { useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import heroBarco from "../assets/importaciones/hero-barco-contenedores.png";
import bannerImportacion from "../assets/importaciones/banner-importacion-directa.png";
import lamparas from "../assets/ultimos-ingresos-lamparas.jpeg";
import guantes from "../assets/ultimos-ingresos-guantes.jpg";
import spot from "../assets/ultimos-ingresos-spots.jpg";

import "./Importaciones.css";

const ventajas = [
  {
    icon: Handshake,
    titulo: "Menos intermediarios",
    texto: "Menos costos, mejores precios.",
  },
  {
    icon: BadgeDollarSign,
    titulo: "Mejor precio",
    texto: "Ahorro real para mayoristas y minoristas.",
  },
  {
    icon: Award,
    titulo: "Calidad garantizada",
    texto: "Productos seleccionados con estandares internacionales.",
  },
  {
    icon: Warehouse,
    titulo: "Stock disponible",
    texto: "Stock permanente y reposicion continua.",
  },
];

const productos = [
  {
    icon: Globe2,
    id: "lamparas-infrarrojas",
    imagen: lamparas,
    titulo: "Lamparas infrarrojas",
    items: [
      "Mayor rendimiento termico.",
      "Excelente relacion precio-calidad.",
      "Stock permanente.",
    ],
  },
  {
    icon: ShieldCheck,
    id: "guantes-moteados",
    imagen: guantes,
    titulo: "Guantes moteados",
    items: [
      "Mayor resistencia al desgaste.",
      "Ideal para trabajos de construccion e industria.",
      "Excelente precio para compras por cantidad.",
    ],
  },
  {
    icon: PackageCheck,
    id: "spots-led",
    imagen: spot,
    titulo: "Spot LED",
    items: [
      "Diseno moderno.",
      "Bajo consumo.",
      "Calidad y terminacion internacional.",
    ],
  },
];

function Importaciones() {
  useEffect(() => {
    if (!window.location.hash) return;

    window.requestAnimationFrame(() => {
      document
        .querySelector(window.location.hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <>
      <Header />

      <main className="importaciones-page">
        <section className="importaciones-hero">
          <div className="importaciones-copy">
            <span>IMPORTACION DIRECTA</span>
            <h1>
              Precios de
              <br />
              importacion
            </h1>
            <div className="importaciones-line"></div>
            <p>
              Importamos directamente desde las mejores fabricas del mundo para
              ofrecerte productos de calidad internacional a precios mas
              competitivos.
            </p>

            <div className="importaciones-ventajas">
              {ventajas.map(({ icon: Icon, titulo, texto }) => (
                <article className="ventaja-card" key={titulo}>
                  <Icon />
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="importaciones-visual">
            <img src={heroBarco} alt="Barco con contenedores LaEleVC" />

            <div className="mundo-card">
              <Globe2 />
              <div>
                <h2>De el mundo a tus manos</h2>
                <p>Traemos calidad, tecnologia e innovacion para tu negocio.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="productos-importados">
          <div className="importaciones-section-title">
            <span></span>
            <h2>Productos importados</h2>
            <span></span>
          </div>

          <div className="importados-grid">
            {productos.map(({ icon: Icon, id, imagen, titulo, items }) => (
              <article className="importado-card" id={id} key={titulo}>
                <div className="importado-icon">
                  <Icon />
                </div>

                <img src={imagen} alt={titulo} />

                <h3>{titulo}</h3>

                <ul>
                  {items.map((item) => (
                    <li key={item}>
                      <CheckCircle2 />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          className="importaciones-respaldo"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(3, 17, 70, 0.9) 0%, rgba(8, 36, 126, 0.72) 42%, rgba(8, 36, 126, 0.12) 76%), url(${bannerImportacion})`,
          }}
        >
          <div>
            <h2>Por que elegirnos?</h2>
            <ul>
              <li>
                <CheckCircle2 /> Importacion directa sin intermediarios.
              </li>
              <li>
                <CheckCircle2 /> Precios mas competitivos del mercado.
              </li>
              <li>
                <CheckCircle2 /> Productos de calidad internacional.
              </li>
              <li>
                <CheckCircle2 /> Atencion y asesoramiento personalizado.
              </li>
            </ul>
          </div>
        </section>

        <section className="importaciones-cta">
          <div className="cta-icon">
            <Handshake />
          </div>

          <div>
            <h2>Mas calidad, mejor precio.</h2>
            <p>Mas oportunidades para tu negocio.</p>
          </div>

          <a href="/Nuevo/contacto">Consultanos</a>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Importaciones;
