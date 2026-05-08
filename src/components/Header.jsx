import logo from "../assets/logo.png";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="LEVC" />
      </div>

      <nav className="nav">
        <a href="#">Inicio</a>
        <a href="#">Productos</a>
        <a href="#">Herramientas</a>
        <a href="#">Pinturas</a>
        <a href="#">Contacto</a>
      </nav>

      <button className="whatsapp-btn">
        WhatsApp
      </button>
    </header>
  );
}

export default Header;