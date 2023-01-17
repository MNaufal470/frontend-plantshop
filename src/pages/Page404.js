import React from "react";
import { Link } from "react-router-dom";
import MetaComponent from "../component/MetaComponent";
const Page404 = () => {
  return (
    <div className="section container text-center">
      <MetaComponent
        title={"404 | Plantex 2022"}
        desciption="Nothing adds more beauty and comfort to our homes and offices than the lush flowers and foliage of indoor plants. Bedrooms, bathrooms, kitchens, cubicles… There really isn’t a space a houseplant can’t enliven. Just add light and water, and you’ve got a growing indoor oasis. Bringing plants into your home is aesthetically pleasing and – amazingly – plants can offer strong health benefits as well!"
      />
      <h1 className="text-8xl ">404</h1>
      <span className="text-xl">Oops! That page can't be found.</span>
      <p className="text-sm mt-4">
        We're really sorry but we can't seem to find the page you were looking
        for.
      </p>
      <Link to={"/"}>
        <button className="button mt-5">Back To Homepage</button>
      </Link>
    </div>
  );
};

export default Page404;
