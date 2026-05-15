import Header from "../components/Header";
import Footer from "../components/Footer";

import "./Contacto.css";

function Contacto() {
  return (
    <>
      <Header />

      <section className="contacto">

        <div className="contacto-container">

          <div className="contacto-info">

            <span>CONTACTANOS</span>

            <h1>
              Estamos para ayudarte
            </h1>

            <p>
              En LEVC te asesoramos en materiales eléctricos,
              herramientas, pinturas y productos para hogar,
              campo y producción.
            </p>

          </div>

          <form className="contacto-form">

            <input
              type="text"
              placeholder="Nombre"
            />

            <input
              type="tel"
              placeholder="Teléfono"
            />

            <input
              type="email"
              placeholder="Email"
            />

            <textarea
              placeholder="Escribí tu consulta..."
            ></textarea>

            <button type="submit">
              ENVIAR CONSULTA
            </button>

          </form>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Contacto;