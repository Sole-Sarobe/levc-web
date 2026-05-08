import { useState } from "react";
import logo from "../assets/logo.png";
import "./Header.css";

function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">

      <div className="logo-container">
        <img src={logo} alt="LEVC" />
      </div>

      <div
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <nav className={`nav ${menuOpen ? "active" : ""}`}>
        <a href="#">Inicio</a>
        <a href="#">Productos</a>
        <a href="#">Herramientas</a>
        <a href="#">Pinturas</a>
        <a href="#">Contacto</a>
      </nav>

    </header>
  );
}

export default Header;