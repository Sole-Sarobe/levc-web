import "./Marcas.css";

const marcasModules = import.meta.glob("../assets/marcas/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

const marcas = Object.entries(marcasModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    nombre: path
      .split("/")
      .pop()
      .replace(/\.[^.]+$/, "")
      .replace(/^\d+-/, "")
      .replaceAll("-", " "),
  }));

function Marcas() {
  return (
    <section className="marcas">
      <div className="marcas-titulo">
        TRABAJAMOS CON LAS MEJORES MARCAS
      </div>

      <div className="marcas-slider">
        <div className="marcas-track">
          {marcas.concat(marcas).map((marca, index) => (
            <div className="marca-item" key={`${marca.nombre}-${index}`}>
              <img src={marca.src} alt={marca.nombre} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Marcas;
