import { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./Hero.css";
import heroCerdo from "../assets/hero-cerdo.jpg";
import heroLocal from "../assets/hero-local.jpg";
import heroLogistica from "../assets/hero-logistica.jpg";

const slides = [
  {
    image: heroCerdo,
    subtitle: "NUEVOS INGRESOS",
    title: `LÁMPARAS
INFRARROJAS
PARA CRÍA
ANIMAL`,
    description:
      "Calor uniforme y eficiente para el bienestar animal.",
      size: "large",
  },

  {
    image: heroLocal,
    subtitle: "TODO PARA TU HOGAR",
    title: `PINTURAS,
HERRAMIENTAS
Y ELECTRICIDAD`,
    description:
      "Productos de calidad para hogar, campo y producción.",
       size: "medium",
  },

  {
    image: heroLogistica,
    subtitle: "MÁS DE 20 AÑOS",
    title: `CONFIANZA
Y RESPALDO
EN CADA
ENTREGA`,
    description:
      "Atención personalizada y stock permanente.",
      size: "medium",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="hero">
      <img
        src={slides[current].image}
        alt=""
        className="hero-image"
      />

      <div className="overlay"></div>

      <div className="hero-content">
        <p>{slides[current].subtitle}</p>

        <h1
            className={slides[current].size}
            style={{ whiteSpace: "pre-line" }}>
            {slides[current].title}
        </h1>

        <div className="hero-description">
          {slides[current].description}
        </div>

        <button>VER PRODUCTOS</button>
      </div>

      <button
        className="slider-arrow left"
        onClick={prevSlide}
      >
        <ChevronLeft size={34} />
      </button>

      <button
        className="slider-arrow right"
        onClick={nextSlide}
      >
        <ChevronRight size={34} />
      </button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={
              current === index
                ? "dot active"
                : "dot"
            }
            onClick={() => setCurrent(index)}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default Hero;