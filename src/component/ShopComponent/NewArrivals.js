import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductListShop from "./ProductListShop";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
const NewArrivals = ({ newArrivals, loading }) => {
  return (
    <section className="newArrival container section !pt-[6rem]">
      <div className="flex gap-x-16 lg:flex-row flex-col">
        <div className="lg:w-[50%] text-center lg:text-left">
          <h1 className="text-4xl mb-5 italic">New Arrivals</h1>
          <p className="text-justify md:text-center lg:text-justify lg:mb-10 mb-5 md:px-20 lg:px-0">
            Driven by a committment to encourage creativity with greenery, we
            design functional plant stands and botanical wares that amplify
            plant wares within a space.
          </p>
          <Link to={"/shop/product-list"}>
            <button type="button" className="button mb-10 lg:mb-0">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="overflow-hidden">
          <Swiper
            slidesPerView={2}
            breakpoints={{
              // when window width is >= 640px
              280: {
                spaceBetween: 10,
                slidesPerView: 1,
              },

              // when window width is >= 768px
              568: {
                spaceBetween: 30,
                slidesPerView: 2,
              },
              992: {
                spaceBetween: 50,
                slidesPerView: 2,
              },
            }}
          >
            {!loading &&
              newArrivals.map((item, i) => (
                <SwiperSlide key={i}>
                  <ProductListShop
                    image={item.images[0].path}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                    key={item._id}
                    id={item._id}
                    rating={item.rating}
                    reviewsNumber={item.reviewsNumber}
                    item={item}
                    newItem={true}
                  />
                </SwiperSlide>
              ))}
            {loading &&
              Array.from({ length: 4 }).map((_t, idx) => (
                <SwiperSlide key={idx}>
                  <Skeleton variant="rectangular" width={"100%"} height={300} />
                  <div className="flex justify-between items-center">
                    <Skeleton animation="wave" width={"60%"} />
                    <Skeleton animation="wave" width={"30%"} />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton animation="wave" width={"30%"} />
                    <Skeleton animation="wave" width={"60%"} />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
