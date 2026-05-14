import "./Banner.css";

import local from "../assets/banner-local.jpg";

function Banner() {
  return (
    <section className="banner">

      <div className="banner-info">

        <div className="banner-left">
          <span>MÁS DE</span>

          <h2>20</h2>

          <p>AÑOS</p>
        </div>

        <div className="banner-text">
          <h3>
            Acompañando a nuestros clientes
            con los mejores productos y
            la mejor atención.
          </h3>

          <button>CONOCENOS</button>
        </div>

      </div>

      <div className="banner-image">
        <img src={local} alt="" />
      </div>

    </section>
  );
}

export default Banner;