import { useState } from "react";
import { Link } from "react-router-dom";

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

        <Link to="/">Inicio</Link>

        <Link to="/productos">Productos</Link>

        <Link to="/herramientas">Herramientas</Link>

        <Link to="/pinturas">Pinturas</Link>

        <Link to="/contacto">Contacto</Link>

      </nav>

    </header>
  );
}

export default Header;