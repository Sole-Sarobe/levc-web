import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { listarProductos } from "../api";

import bannerIluminacion from "../assets/banner-productos-iluminacion.jpg";
import bannerHerramientas from "../assets/banner-productos-herramientas.png";
import bannerPinturas from "../assets/banner-productos-pinturas.png";

import "./Productos.css";

const CATEGORIAS = [
  {
    id: "iluminacion",
    nombre: "Iluminación",
    titulo: "Novedades en iluminación",
    subtitulo: "Soluciones modernas y eficientes para cada espacio.",
    banner: bannerIluminacion,
    keywords: ["iluminacion", "iluminación", "lampara", "lámpara", "luz", "led", "reflector", "spot"],
  },
  {
    id: "herramientas",
    nombre: "Herramientas",
    titulo: "Nuevas herramientas",
    subtitulo: "Equipos y accesorios para trabajar mejor.",
    banner: bannerHerramientas,
    keywords: ["herramienta", "herramientas", "taladro", "amoladora", "pinza", "destornillador", "mecha", "llave"],
  },
  {
    id: "pinturas",
    nombre: "Pinturas",
    titulo: "Nuevas pinturas",
    subtitulo: "Pinturas y complementos para renovar tus proyectos.",
    banner: bannerPinturas,
    keywords: ["pintura", "pinturas", "latex", "látex", "esmalte", "rodillo", "pincel", "enduido"],
  },
];

const CARDS_POR_CATEGORIA = 6;

function normalizar(texto = "") {
  return texto
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function productoPerteneceACategoria(producto, categoria) {
  const texto = normalizar(
    `${producto.categoria || ""} ${producto.nombre || ""} ${producto.descripcion || ""}`
  );

  return categoria.keywords.some((keyword) =>
    texto.includes(normalizar(keyword))
  );
}

function completarCards(productos) {
  const visibles = productos.slice(0, CARDS_POR_CATEGORIA);
  const faltantes = Math.max(CARDS_POR_CATEGORIA - visibles.length, 0);

  return [
    ...visibles.map((producto) => ({
      tipo: "producto",
      producto,
    })),
    ...Array.from({ length: faltantes }, (_, index) => ({
      tipo: "vacio",
      id: `vacio-${index}`,
    })),
  ];
}

function recortarTexto(texto = "", limite = 42) {
  if (!texto || texto.length <= limite) return texto;

  return `${texto.slice(0, limite).trim()}...`;
}

function ProductoCard({ item }) {
  if (item.tipo === "vacio") {
    return (
      <article className="catalogo-card catalogo-card-vacia">
        <div className="catalogo-imagen-vacia"></div>
        <div className="catalogo-info">
          <span>Próximamente</span>
          <h3>Nuevo producto</h3>
          <p>Espacio disponible para cargar desde Admin.</p>
          <button type="button" disabled>
            Ver producto
          </button>
        </div>
      </article>
    );
  }

  const { producto } = item;

  return (
    <article className="catalogo-card">
      <div className="catalogo-imagen">
        {producto.imagen ? (
          <img src={producto.imagen} alt={producto.nombre} />
        ) : (
          <div className="catalogo-imagen-vacia"></div>
        )}
        <span className="catalogo-badge">Nuevo</span>
      </div>

      <div className="catalogo-info">
        <h3>{recortarTexto(producto.nombre, 26)}</h3>
        <p>{recortarTexto(producto.descripcion || producto.categoria, 42)}</p>
        <button type="button">Ver producto</button>
      </div>
    </article>
  );
}

function Productos() {
  const [productos, setProductos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    cargarProductos();
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const scrollToHash = () => {
      const target = document.getElementById(location.hash.replace("#", ""));
      const headerOffset = window.innerWidth <= 760 ? 96 : 112;

      if (!target) return;

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - headerOffset,
        behavior: "auto",
      });
    };

    const timers = [0, 250, 700, 1300].map((delay) =>
      setTimeout(scrollToHash, delay)
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [location.hash, productos.length]);

  async function cargarProductos() {
    try {
      const data = await listarProductos();
      setProductos(data || []);
    } catch (error) {
      console.log(error);
      setProductos([]);
      return;
    }
  }

  const productosPorCategoria = useMemo(() => {
    const usados = new Set();

    return CATEGORIAS.map((categoria) => {
      const filtrados = productos.filter((producto) => {
        if (usados.has(producto.id)) return false;

        const pertenece = productoPerteneceACategoria(producto, categoria);

        if (pertenece) {
          usados.add(producto.id);
        }

        return pertenece;
      });

      return {
        ...categoria,
        productos: completarCards(filtrados),
      };
    });
  }, [productos]);

  return (
    <>
      <Header />

      <main className="productos-page">
        {productosPorCategoria.map((categoria) => (
          <section
            className="productos-categoria"
            id={categoria.id}
            key={categoria.id}
          >
            <img
              className="categoria-banner"
              src={categoria.banner}
              alt={categoria.nombre}
            />

            <div className="categoria-header">
              <div>
                <h2>{categoria.titulo}</h2>
                <p>{categoria.subtitulo}</p>
              </div>

              <a href={`#${categoria.id}`}>Ver todos</a>
            </div>

            <div className="productos-grid">
              {categoria.productos.map((item, index) => (
                <ProductoCard
                  key={item.producto?.id || `${categoria.id}-${item.id}-${index}`}
                  item={item}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </>
  );
}

export default Productos;
