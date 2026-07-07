import "./Banner.css";

import local from "../assets/banner-local.jpg";

function Banner() {
  return (
    <section className="banner">

      <div className="banner-info">

        <div className="banner-left">
          <span>MÁS DE</span>

          <h2>35</h2>

          <p>AÑOS</p>
        </div>

        <div className="banner-text">
          <h3>
            Acompañandote a cumplir e iluminar tus proyectos.
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