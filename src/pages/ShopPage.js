import axios from "axios";
import React, { useEffect, useState } from "react";
import MetaComponent from "../component/MetaComponent";
import BannerSearch from "../component/ShopComponent/BannerSearch";
import BestSeller from "../component/ShopComponent/BestSeller";
import NewArrivals from "../component/ShopComponent/NewArrivals";
import ShopCategory from "../component/ShopComponent/ShopCategory";
import Testimoni from "../component/ShopComponent/Testimoni";
const ShopPage = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bestSellers, setBestSellers] = useState([]);
  const [testimoni, setTestimoni] = useState([]);
  const fetchSpesialProduct = async () => {
    await axios.get("/api/products/spesial/getProductBy").then((res) => {
      setNewArrivals(res.data.newArrivals);
      setBestSellers(res.data.bestSeller);
    });
  };
  const fetchTestimoni = async () => {
    await axios.get("/api/reviews").then((res) => setTestimoni(res.data));
  };
  useEffect(() => {
    setLoading(true);
    fetchSpesialProduct();
    fetchTestimoni();
    const timeOutLoading = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeOutLoading);
    };
  }, []);
  return (
    <>
      <MetaComponent
        title={"Plantex | E-Commerce 2022"}
        desciption="Nothing adds more beauty and comfort to our homes and offices than the lush flowers and foliage of indoor plants. Bedrooms, bathrooms, kitchens, cubicles… There really isn’t a space a houseplant can’t enliven. Just add light and water, and you’ve got a growing indoor oasis. Bringing plants into your home is aesthetically pleasing and – amazingly – plants can offer strong health benefits as well!"
      />

      <BannerSearch />
      <ShopCategory />
      <NewArrivals newArrivals={newArrivals} loading={loading} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 bg-[#e2e6db] mt-16  ">
        <div className="flex flex-col justify-center px-20 pt-5 lg:py-0">
          <h1 className="text-3xl text-center md:text-left lg:text-5xl capitalize text-black mb-5">
            More ways to find the perfect plant
          </h1>
          <span className="  text-justify mb-10">
            Praesent egestas tristique nibh. Sed mollis, eros et ultrices
            tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a
            orci.
          </span>
          <div className="text-center md:text-left mb-10 lg:mb-0">
            <button href="#" className="button button--flex">
              Explore <i className="ri-arrow-right-down-line button__icon"></i>
            </button>
          </div>
        </div>
        <img
          src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/img-1.jpg"
          alt=""
          className="h-full object-cover"
        />
      </div>
      <BestSeller bestSellers={bestSellers} loading={loading} />
      <Testimoni testimoni={testimoni} loading={loading} />
    </>
  );
};

export default ShopPage;
