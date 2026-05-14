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
                <iframe
                    src="<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.7364660755375!2d-61.609381924039965!3d-33.999302225830434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c7ef52adc1ab23%3A0x9071ef755553de6e!2sLa%20Electrica!5e0!3m2!1ses-419!2sar!4v1778800156202!5m2!1ses-419!2sar"
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