import "./Marcas.css";

function Marcas() {

  const marcas = [
    "SICA",
    "CAMBRE",
    "PHILIPS",
    "GENROD",
    "KALOP",
    "JELUZ",
    "3M",
    "SCHNEIDER",
    "GAWA"
  ];

  return (
    <section className="marcas">

      <div className="marcas-titulo">
        TRABAJAMOS CON LAS MEJORES MARCAS
      </div>

      <div className="marcas-slider">

        <div className="marcas-track">

          {marcas.concat(marcas).map((marca, index) => (
            <div className="marca-item" key={index}>
              {marca}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Marcas;