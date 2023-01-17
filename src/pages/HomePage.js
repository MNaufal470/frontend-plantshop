import React from "react";
import About from "../component/About";
import Banner from "../component/Banner";
import Contact from "../component/Contact";
import MetaComponent from "../component/MetaComponent";
import ProductList from "../component/ProductList";
import Question from "../component/Question";
import Steps from "../component/Steps";

const HomePage = () => {
  return (
    <div>
      <MetaComponent
        title={"Plantex | E-Commerce 2022"}
        desciption="Nothing adds more beauty and comfort to our homes and offices than the lush flowers and foliage of indoor plants. Bedrooms, bathrooms, kitchens, cubicles… There really isn’t a space a houseplant can’t enliven. Just add light and water, and you’ve got a growing indoor oasis. Bringing plants into your home is aesthetically pleasing and – amazingly – plants can offer strong health benefits as well!"
      />
      <Banner />
      <About />
      <Steps />
      <ProductList />
      <Question />
      <Contact />
    </div>
  );
};

export default HomePage;
