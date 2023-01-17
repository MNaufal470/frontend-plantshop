import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Category from "./Category";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
const ShopCategory = () => {
  const { categories, loading } = useSelector((state) => state.categories);

  return (
    <section className="category section container !pt-[5rem]">
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={5}
        navigation
        breakpoints={{
          // when window width is >= 640px
          280: {
            spaceBetween: 30,
            slidesPerView: 2,
          },

          // when window width is >= 768px
          568: {
            spaceBetween: 50,
            slidesPerView: 3,
          },
          768: {
            spaceBetween: 50,
            slidesPerView: 5,
          },
        }}
      >
        {!loading
          ? categories?.map((item) => (
              <SwiperSlide key={item._id}>
                <Category img={item.image} name={item.name} />
              </SwiperSlide>
            ))
          : Array.from({ length: 5 }).map((_, idx) => (
              <SwiperSlide key={idx}>
                <Skeleton
                  variant="circular"
                  width={"100%"}
                  height={200}
                  sx={{
                    marginBottom: 1,
                  }}
                />
                <Skeleton animation="wave" />
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
};

export default ShopCategory;
