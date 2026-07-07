import "./Footer.css";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import whatsapp from "../assets/icon-whatsapp.png";
import instagram from "../assets/icon-instagram.png";
import facebook from "../assets/icon-facebook.png";

function Footer() {
  const whatsappMessage = encodeURIComponent(
    "Hola! me gustaria recibir informacion."
  );

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <div className="footer-item">
            <MapPin />
            <span>Villa Cañas, Santa Fe</span>
          </div>

          <div className="footer-item">
            <Phone />
            <span>+54 3462 22-2645</span>
          </div>

          <div className="footer-item">
            <Mail />
            <span>contacto@laele.com.ar</span>
          </div>

          <div className="footer-item">
            <Clock />
            <span>
              Lun a Vie 8:00 a 12:00 hs
              <br />
              14:00 hs a 20:00 hs
            </span>
          </div>
        </div>

        <div className="footer-copy">© 2026 LaEleVC SRL</div>
      </div>

      <div className="floating-social" aria-label="Redes sociales">
        <a
          href="https://www.facebook.com/laelectrica.devillacanas"
          aria-label="Facebook"
          target="_blank"
          rel="noreferrer"
        >
          <img src={facebook} alt="" />
        </a>
        <a
          href="https://www.instagram.com/laelevc/"
          aria-label="Instagram"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagram} alt="" />
        </a>
        <a
          href={`https://wa.me/5493462222645?text=${whatsappMessage}`}
          aria-label="WhatsApp"
          target="_blank"
          rel="noreferrer"
        >
          <img src={whatsapp} alt="" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
