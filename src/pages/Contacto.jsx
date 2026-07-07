import Header from "../components/Header";
import Footer from "../components/Footer";

import "./Contacto.css";

function Contacto() {
  const estado = new URLSearchParams(window.location.search).get("estado");

  return (
    <>
      <Header />

      <section className="contacto">
        <div className="contacto-container">
          <div className="contacto-info">
            <h1>Estamos para ayudarte</h1>

            <p>
              En LaEleVC te asesoramos en materiales electricos, herramientas,
              pinturas y productos para hogar, campo y produccion.
            </p>

            <div className="contacto-mapa">
              <iframe
                src="https://www.google.com/maps?q=Av.+51+784,+Villa+Ca%C3%B1%C3%A1s,+Santa+Fe&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa LaEleVC"
              ></iframe>
            </div>
          </div>

          <form
            className="contacto-form"
            action="/Nuevo/mail/enviar-contacto.php"
            method="POST"
          >
            {estado === "ok" && (
              <div className="form-status form-status-ok">
                Consulta enviada correctamente.
              </div>
            )}

            {estado === "error" && (
              <div className="form-status form-status-error">
                No se pudo enviar la consulta. Intentalo nuevamente.
              </div>
            )}

            <input type="text" name="_honey" style={{ display: "none" }} />

            <input type="text" name="nombre" placeholder="Nombre" required />

            <input type="tel" name="telefono" placeholder="Telefono" />

            <input type="email" name="email" placeholder="Email" required />

            <textarea
              name="consulta"
              placeholder="Escribi tu consulta..."
              required
            ></textarea>

            <button type="submit">ENVIAR CONSULTA</button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contacto;
