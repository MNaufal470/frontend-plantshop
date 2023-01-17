import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="about section container" id="about">
      <div className="about__container grid">
        <img src="/img/about.png" alt="" className="about__img" />
        <div className="about__data">
          <h2 className="section__title about__title">
            Who we really are & <br />
            why choose us
          </h2>
          <p className="about__description">
            We have over 4000+ unbiased reviews and our customers trust our
            plant process and delivery service every time
          </p>
          <div className="about__details">
            <p className="about__details-description">
              <i className="ri-checkbox-fill about__details-icon"></i>
              We always deliver on time.
            </p>
            <p className="about__details-description">
              <i className="ri-checkbox-fill about__details-icon"></i>
              We give you guides to protect and care for your plants.
            </p>
            <p className="about__details-description">
              <i className="ri-checkbox-fill about__details-icon"></i>
              We always come over for a check-up after sale.
            </p>
            <p className="about__details-description">
              <i className="ri-checkbox-fill about__details-icon"></i>
              100% money back guaranteed.
            </p>
          </div>
          <Link to={"/shop/product-list"} className="button--link button--flex">
            Shop Now <i className="ri-arrow-right-down-fill button__icon"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
