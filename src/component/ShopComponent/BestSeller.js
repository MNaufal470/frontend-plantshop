import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductListShop from "./ProductListShop";
import { Skeleton } from "@mui/material";
const BestSeller = ({ bestSellers, loading }) => {
  return (
    <section className="container section">
      <div className="mb-10">
        <h1 className="home__title text-center">Most Popular & Top Sales</h1>
        <p className="!text-center md:px-20">
          Driven by a committment to encourage creativity with greenery, we
          design functional plant stands and botanical wares that amplify plant
          wares within a space.
        </p>
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={5}
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
            slidesPerView: 3,
          },
        }}
      >
        {!loading &&
          bestSellers.map((item, i) => (
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
                top={true}
              />
            </SwiperSlide>
          ))}
        {loading &&
          Array.from({ length: 3 }).map((_t, idx) => (
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
    </section>
  );
};

export default BestSeller;
