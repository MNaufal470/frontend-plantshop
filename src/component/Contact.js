import React from "react";

const Contact = () => {
  return (
    <section className="contact section container" id="contact">
      <div className="contact__container grid">
        <div className="contact__box">
          <h2 className="section__title">
            Reach out to us today <br />
            via any of the given <br />
            information
          </h2>
          <div className="contact__data">
            <div className="contact__information">
              <h3 className="contact__subtitle">Call us for instant support</h3>
              <span className="contact__description">
                <i className="ri-phone-line contact__icon"></i>
                +999 888 777
              </span>
            </div>
            <div className="contact__information">
              <h3 className="contact__subtitle">Write us by mail</h3>
              <span className="contact__description">
                <i className="ri-mail-line contact__icon"></i>
                user@email.com
              </span>
            </div>
          </div>
        </div>
        <form action="" className="contact__form">
          <div className="contact__inputs">
            <div className="contact__content">
              <input type="email" className="contact__input" placeholder="" />
              <label className="contact__label">Email</label>
            </div>

            <div className="contact__content">
              <input type="text" className="contact__input" placeholder="" />
              <label className="contact__label">Subject</label>
            </div>

            <div className="contact__content contact__area">
              <textarea
                name="message"
                placeholder=""
                className="contact__input"
              ></textarea>
              <label className="contact__label">Message</label>
            </div>
          </div>
          <button className="button button--flex">
            Send Massage
            <i className="ri-arrow-right-up-line button__icon"></i>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
