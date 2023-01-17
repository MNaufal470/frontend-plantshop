import { Rating } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartReducerActions } from "../../store/reducers/cartReducer";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wishlistActions } from "../../store/reducers/wishlistReducer";
import { Portal } from "react-portal";
const ProductListShop = ({
  name,
  price,
  image,
  category,
  top = false,
  newItem = false,
  shopUser = false,
  id,
  rating,
  reviewsNumber,
  item,
}) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const addItems = () => {
    let addItemFinal = { item: item, quantity: 1 };
    dispatch(cartReducerActions.addItem(addItemFinal));
    toast.success(`Success add product to your cart`, {
      position: "bottom-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const triggerWishlistHandler = () => {
    let wishlistAction = true;
    let itemWislist = { item: item };
    dispatch(wishlistActions.WishlistTrigger(itemWislist));
    let findIndex = wishlist.findIndex((product) => product._id === item._id);
    if (findIndex !== -1) {
      wishlistAction = false;
    }
    return toast.success(
      `Success ${wishlistAction ? "add" : "remove"}  product to your wishlist`,
      {
        position: "bottom-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };
  return (
    <div className="cardArrival">
      <Portal node={document && document.getElementById("toast")}>
        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          transition={Slide}
          theme="dark"
        />
      </Portal>
      <div className="relative  lg:h-[350px] overflow-hidden">
        <Link to={`/shop/product-detail/${id}`}>
          <img
            src={image}
            alt=""
            className="w-full lg:w-[350px] lg:h-[350px] object-cover hover:scale-150 transition duration-500"
          />
        </Link>
        {newItem || top ? (
          <p
            className={`absolute top-3 right-3 py-1 px-4  ${
              newItem ? "bg-[#ffa500]" : "bg-red-600"
            } italic font-normal text-white`}
          >
            {top ? "Hot" : ""}
            {newItem ? "New" : ""}
          </p>
        ) : null}
        <div className="overlayNew">
          <i className="ri-shopping-cart-2-line " onClick={addItems}></i>
          <i
            className={`ri-heart-line ${
              wishlist?.findIndex((p) => p?._id === item?._id) !== -1
                ? "!bg-[#3e6540] !text-white"
                : ""
            }`}
            onClick={triggerWishlistHandler}
          ></i>
          <i className="ri-information-line "></i>
        </div>
      </div>

      <div className="flex justify-between">
        <p className="product__title !mb-0">{name}</p>
        <div>
          <p className="product__price">${price}</p>
        </div>
      </div>
      <div
        className={`flex ${
          shopUser
            ? "flex-col md:flex-row md:justify-between"
            : "justify-between items-center"
        } `}
      >
        <p className="text-xs md:text-sm truncate">{category}</p>
        <div>
          <Rating
            name="read-only"
            defaultValue={rating ?? 0}
            size="small"
            readOnly
          />
          {reviewsNumber > 0 && (
            <small className="text-[10px]">({reviewsNumber})</small>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListShop;
