import MetaComponent from "../component/MetaComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const AboutUs = () => {
  return (
    <div>
      <MetaComponent title={"About Us | Plantex 2022"} />
      <div className="w-full h-[200px] md:h-[300px] bg-[url('https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/bg-breadcrumb.jpg')] section relative bg-left ">
        <h1 className="home__title text-center text-black md:pt-5 pt-0">
          About Us
        </h1>
      </div>
      <div className="section container">
        <div className="flex flex-col gap-y-3 justify-center items-center">
          <img
            src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/img-4.png"
            alt=""
            className="w-[350px] h-full object-contain"
          />
          <h1 className="tracking-[2px] text-[#626262] text-xl text-center">
            PLANTEX PHOTOSYNTHESIS STORIES
          </h1>
          <p className="text-black text-2xl  md:text-4xl text-center ">
            We connect buyers and sellers with suitable, eco-friendly
            <span className="italic"> products</span>
          </p>
          <img
            src="https://png.pngtree.com/png-vector/20220727/ourmid/pngtree-floral-divider-ornament-png-image-png-image_6088796.png"
            alt=""
            className="w-[200px] object-contain -mt-16"
          />
          <p className="text-center -mt-10">
            Nothing adds more beauty and comfort to our homes and offices than
            the lush flowers and foliage of indoor plants. Bedrooms, bathrooms,
            kitchens, cubicles… There really isn’t a space a houseplant can’t
            enliven. Just add light and water, and you’ve got a growing indoor
            oasis. Bringing plants into your home is aesthetically pleasing and
            – amazingly – plants can offer strong health benefits as well!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-10 ">
        <img
          src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/about-2.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <img
          src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/about-3.jpg"
          alt=""
          className="w-full h-full object-cover mt-28"
        />
        <img
          src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/about-4.jpg"
          alt=""
          className="w-full h-full object-cover "
        />
      </div>
      <div className="w-full  bg-[#F9F6EF] mt-56 p-10 md:px-6 lg:px-10">
        <h3 className="text-center text-3xl font-normal">
          Here's How It Works
        </h3>
        <div className="grid grid-cols-2 gap-y-14 md:grid-cols-4 justify-between my-14 ">
          {order.map((item, i) => (
            <div
              className="flex flex-col justify-center items-center gap-y-3"
              key={i}
            >
              <img src={item.img} alt="" className="w-[80px] object-contain" />
              <h1 className="font-normal text-center">{item.title}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="container flex flex-col md:flex-row items-center my-20    lg:my-40 gap-10  border-black">
        <div className="relative w-[350px] h-[350px]">
          <img
            src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/slider-10-3.jpg"
            alt=""
            className="w-full h-full object-cover  z-20 relative"
          />
          <div className="absolute w-[350px] h-[350px] bg-[#e3e6db] -left-20 top-20 z-10 hidden lg:block" />
        </div>
        <div className=" flex-1">
          <h1 className="text-2xl mb-3 text-center">
            <i className="ri-double-quotes-l"></i> We’re going to make the
            experience of discovering the perfect potted plants as wonderful as
            the plants themselves. <i className="ri-double-quotes-l"></i>
          </h1>
          <p className="text-center">- Alicyia Jasmin -</p>
        </div>
      </div>
      <div className="p-6 pt-14   border-t border-[#ebebeb]">
        <Swiper
          spaceBetween={50}
          breakpoints={{
            // when window width is >= 640px
            280: {
              spaceBetween: 10,
              slidesPerView: 2,
            },

            // when window width is >= 768px
            568: {
              spaceBetween: 30,
              slidesPerView: 3,
            },
            992: {
              spaceBetween: 50,
              slidesPerView: 4,
            },
          }}
        >
          {brand.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const order = [
  {
    img: "https://cdn-icons-png.flaticon.com/512/9273/9273185.png",
    title: "Pick your plant",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/3228/3228867.png",
    title: "Choose a pot color",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/3182/3182936.png",
    title: "Have it shipped",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/3160/3160414.png",
    title: "Watch it grow",
  },
];
const brand = [
  "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/brand-1.jpg",
  "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/brand-2.jpg",
  "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/brand-3.jpg",
  "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/brand-4.jpg",
];
export default AboutUs;
