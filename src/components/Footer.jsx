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

          <p>📞 +54 3462 000000</p>

          <p>✉️ info@levc.com.ar</p>

          <p>
            🕒 Lun a Vie 8:30 a 12:30 hs
            <br />
            15:30 hs a 18:30 hs
          </p>

        </div>

        <div className="footer-mapa">

          <h4>UBICACIÓN</h4>

          <div className="mapa-box">
            MAPA
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