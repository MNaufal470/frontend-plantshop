import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartReducerActions } from "../store/reducers/cartReducer";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wishlistActions } from "../store/reducers/wishlistReducer";
import MetaComponent from "../component/MetaComponent";
const WhistlistPage = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const dispathCartHandler = async (item) => {
    let itemAdd = { item: item, quantity: 1 };
    dispatch(cartReducerActions.addItem(itemAdd));
    dispatch(wishlistActions.WishlistTrigger(itemAdd));
    toast.success(`Success add product to your cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const dispathWishlistHandler = async (item) => {
    let itemAdd = { item: item };
    dispatch(wishlistActions.WishlistTrigger(itemAdd));
    toast.success(`Success remove product to your wishlist`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <div>
      <MetaComponent
        title={"Wishlist | Plantex 2022"}
        desciption="Nothing adds more beauty and comfort to our homes and offices than the lush flowers and foliage of indoor plants. Bedrooms, bathrooms, kitchens, cubicles… There really isn’t a space a houseplant can’t enliven. Just add light and water, and you’ve got a growing indoor oasis. Bringing plants into your home is aesthetically pleasing and – amazingly – plants can offer strong health benefits as well!"
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={Slide}
        pauseOnHover
        theme="dark"
      />
      <div className="w-full h-[200px] md:h-[300px] bg-[url('https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/bg-breadcrumb.jpg')] section relative bg-left ">
        <h1 className="home__title text-center text-black md:pt-5 pt-0">
          Wishlist
        </h1>
      </div>
      <div className="container mt-3">
        {wishlist.length === 0 && (
          <div
            className="flex items-center bg-black/80 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
            </svg>
            <p>Your Wishlist Is Currently Empty.</p>
          </div>
        )}
        <div>
          {wishlist.length > 0 &&
            wishlist.map((item) => (
              <div className="border-2 border-[#f5f5f5]  mt-5 flex justify-between items-center">
                <div className="flex gap-x-2 px-5 py-5">
                  <img
                    src={item.images[0].path}
                    alt=""
                    className="w-[100px] h-[100px] object-cover"
                  />
                  <div className="flex flex-col gap-y-1">
                    {item.stocks === 0 && (
                      <span className="text-yellow-400 text-xs font-bold">
                        Sorry {item.name} out of stocks
                      </span>
                    )}
                    <span className="text-black">{item.name}</span>
                    <span className="text-black">Price : ${item.price}</span>
                    <span className="text-black text-xs">{item.category}</span>
                    <span className="text-xs">Added On : {item.addDate}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 border-l-2  py-5 border-[#f5f5f5] pl-20 pr-20 ">
                  <button
                    className="button  !py-2 lg:min-w-[151px]"
                    onClick={() => dispathWishlistHandler(item)}
                  >
                    <i className="ri-heart-line text-xl"></i>
                  </button>
                  {item.stocks > 0 && (
                    <button
                      className="button"
                      onClick={() => dispathCartHandler(item)}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WhistlistPage;
