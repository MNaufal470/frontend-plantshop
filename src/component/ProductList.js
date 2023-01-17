import React from "react";

const ProductList = () => {
  return (
    <section
      className="product section container mb-10 overflow-hidden"
      id="products"
    >
      <div className="flex flex-col md:flex-row gap-x-20 gap-y-10">
        <div className="max-w-sm lg:max-w-md space-y-5">
          <h1 className="section__title">Decorate your home with plants</h1>
          <p>
            Praesent egestas tristique nibh. Sed mollis, eros et ultrices
            tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a
            orci. Fusce convallis metus id felis luctus adipiscing. Integer
            tincidunt. Etiam imperdiet imperdiet orci
          </p>
          <div className="flex flex-col gap-y-10">
            <div className="flex gap-x-5 items-center">
              <i className="ri-award-fill text-2xl p-2 px-3 bg-[#224229] rounded-full text-white"></i>
              <div>
                <h1>Unbeatable quality</h1>
                <p className="text-sm">Greater productivity and relaxation</p>
              </div>
            </div>
            <div className="flex gap-x-5 items-center ">
              <i className="ri-truck-line text-2xl p-2 px-3 bg-[#224229] rounded-full text-white"></i>
              <div>
                <h1>Delivery to your door</h1>
                <p className="text-sm">Better mental wellbeing and happiness</p>
              </div>
            </div>
            <div className="flex gap-x-5 items-center">
              <i className="ri-leaf-line text-2xl p-2 px-3 bg-[#224229] rounded-full text-white"></i>
              <div>
                <h1>Bring nature into your life</h1>
                <p className="text-sm">Greater productivity and relaxation</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative -order-1 md:order-1">
          <img
            src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/img-4.png"
            alt=""
            className="w-full h-full object-contain"
          />
          <div className="absolute top-[50%] -translate-y-1/2">
            <img
              src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/ellipse-2.png"
              alt=""
              className="animate-pulse"
            />
            <img
              src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/ellipse-2.png"
              alt=""
              className="absolute top-[40%] -translate-y-1/2 animate-pulse"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
