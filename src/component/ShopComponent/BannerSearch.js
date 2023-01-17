import React from "react";
import InputSearch from "./InputSearch";

const BannerSearch = () => {
  return (
    <section className="bannerSearch !bg-center h-[70vh] md:h-[70vh] lg:h-[90vh] ">
      <div className="container section ">
        <h1 className="home__title  !text-5xl pt-20">
          Gift Green <br />
          This Holiday.
        </h1>
        <span className="text-2xl ">Check The New Arrivals</span>
        <div className="mt-10 md:mt-20 w-[350px] md:w-[400px]">
          <InputSearch />
        </div>
      </div>
    </section>
  );
};

export default BannerSearch;
