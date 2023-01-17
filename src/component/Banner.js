import React from "react";

const Banner = () => {
  return (
    <section className="home" id="home">
      <div className="home__container container grid">
        <img src="/img/home.png" alt="" className="home__img" />
        <div className="home__data">
          <h1 className="home__title">
            Plants will make <br />
            your life better
          </h1>
          <p className="home__description">
            Create incredible plant design for your offices or apastaments. Add
            fresness to your new ideas.
          </p>
          <a href="#" className="button button--flex">
            Explore <i className="ri-arrow-right-down-line button__icon"></i>
          </a>
        </div>
        <div className="home__social">
          <span className="home__social-follow">Follow Us</span>
          <div className="home__social-links">
            <a href="#" className="home__social-link" translate="_blank">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href="#" className="home__social-link" translate="_blank">
              <i className="ri-instagram-fill"></i>
            </a>
            <a href="#" className="home__social-link" translate="_blank">
              <i className="ri-twitter-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
