import "../App.css";

import UltimosIngresos from "../components/UltimosIngresos";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Categorias from "../components/Categorias";
import Beneficios from "../components/Beneficios";
import Footer from "../components/Footer";
import Marcas from "../components/Marcas";
import Banner from "../components/Banner";

function Inicio() {
  return (
    <>
      <Header />
      <Hero />
      <UltimosIngresos />
      <Categorias />
      <Beneficios />
      <Marcas />
      <Banner />
      <Footer />
    </>
  );
}

export default Inicio;