import "./Footer.css";

import logo from "../assets/logo.png";
import whatsapp from "../assets/icon-whatsapp.png";
import instagram from "../assets/icon-instagram.png";
import facebook from "../assets/icon-facebook.png";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <img src={logo} alt="LEVC" />

          <p>
            Importamos y distribuimos materiales
            eléctricos, herramientas y artículos
            para profesionales, empresas y particulares.
          </p>

          <div className="footer-social">

            <img src={facebook} alt="" />
            <img src={instagram} alt="" />
            <img src={whatsapp} alt="" />

          </div>

        </div>

        <div className="footer-links">

          <h4>ENLACES</h4>

          <a href="#">Inicio</a>
          <a href="#">Productos</a>
          <a href="#">Herramientas</a>
          <a href="#">Pinturas</a>
          <a href="#">Contacto</a>

        </div>

        <div className="footer-contacto">

          <h4>CONTACTO</h4>

          <p>📍 Villa Cañás, Santa Fe</p>

          <p>📞 +54 3462 22-2645</p>

          <p>✉️ contacto@laele.com.ar</p>

          <p>
            🕒 Lun a Vie 8:00 a 12:00 hs
            <br />
            14:00 hs a 20:00 hs
          </p>

        </div>

        <div className="footer-mapa">

          <h4>UBICACIÓN</h4>

          <div className="mapa-box">
                <iframe
                    src="https://www.google.com/maps?q=Av.+51+784,+Villa+Cañás,+Santa+Fe&output=embed"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

        </div>

      </div>

      <div className="footer-copy">
        © 2026 LEVC Materiales Eléctricos
      </div>

    </footer>
  );
}

export default Footer;