import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroVisible(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="header">
      {introVisible && (
        <>
          <div className="intro-page-fade"></div>

          <div className="intro-brand">
            <img src={logo} alt="LEVC" />
            <span className="brand-text">
              <span className="brand-name">LaEleVC</span>
              <span className="brand-srl">SRL</span>
            </span>
          </div>
        </>
      )}

      <div className={`logo-container ${introVisible ? "intro-hidden" : ""}`}>
        <img src={logo} alt="LEVC" />
        <span className="brand-text">
          <span className="brand-name">LaEleVC</span>
          <span className="brand-srl">SRL</span>
        </span>
      </div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span aria-hidden="true">&#9776;</span>
      </div>

      <nav className={`nav ${menuOpen ? "active" : ""}`}>
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/importaciones">Importaciones</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>
    </header>
  );
}

export default Header;
