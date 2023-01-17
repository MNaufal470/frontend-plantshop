import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css";
import { Rating, Skeleton } from "@mui/material";
const Testimoni = ({ testimoni, loading }) => {
  return (
    <section className="testimonial section container  lg:mb-0">
      <div className="testimonial__container grid md:grid-cols-2 lg:!gap-x-[8rem] grid-cols-1 md:gap-y-[4rem] gap-y-[1rem]">
        <div className="testimonial-swiper overflow-hidden">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            modules={[Navigation]}
          >
            {testimoni.length > 0 &&
              !loading &&
              testimoni.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="testimonial__card swiper-slide md:min-h-[300px] ">
                    <div className="testimonial__quote">
                      <i className="ri-double-quotes-l"></i>
                    </div>
                    <p className="testimonial__description">
                      <Rating readOnly defaultValue={item.rating} /> <br />
                      {item.comment}
                    </p>
                    <h3 className="testimonial__date mt-2 mb-4">
                      {item.createdAt.substring(0, 10)}
                    </h3>

                    <div className="testimonial__perfil flex items-center gap-x-3">
                      <img
                        src={item.users.image}
                        alt=""
                        className="testimonial__perfil-img w-[60px] h-[60px] rounded-full object-cover"
                      />
                      <div className="testimonial__perfil-data ">
                        <span className="testimonial__perfil-name flex lg:flex-col ">
                          {item.users.name}
                        </span>
                        <span className="testimonial__perfil-detail">
                          {item.users.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            {loading && (
              <SwiperSlide>
                <div>
                  <Skeleton width={50} height={70} animation="wave" />
                  <Skeleton width={150} height={30} animation="wave" />
                  <Skeleton height={50} animation="wave" />
                  <Skeleton width={150} height={30} animation="wave" />
                  <div className="mt-10 flex items-center gap-x-4">
                    <Skeleton
                      width={70}
                      height={70}
                      animation="wave"
                      variant="circular"
                    />
                    <div>
                      <Skeleton width={150} height={30} animation="wave" />
                      <Skeleton width={100} height={30} animation="wave" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        <div className="testimonial__images relative">
          <div className="testimonial__square lg:w-[450px] lg:h-[450px] w-[250px] h-[250px] "></div>
          <img
            src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/banner-4.jpg"
            alt=""
            className="testimonial__img lg:w-[450px] lg:h-[450px] lg:top-[4.5rem] lg:right-[4rem] w-[250px] h-[250px] absolute right-[30px] object-cover top-14  "
          />
        </div>
      </div>
    </section>
  );
};

export default Testimoni;
