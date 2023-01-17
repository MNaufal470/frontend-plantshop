import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartReducerActions } from "../store/reducers/cartReducer";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MetaComponent from "../component/MetaComponent";
const CartPage = () => {
  const { user } = useSelector((state) => state.userInfo);

  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userNotCompleteProfile =
    !user.address || !user.phoneNumber || !user.state || !user.city;
  let showNotification = cart.cartItems.length === 0 || userNotCompleteProfile;
  const addItems = (item) => {
    let addItemFinal = { item: item, quantity: 1 };
    dispatch(cartReducerActions.addItem(addItemFinal));
  };

  const decreaseItem = (item) => {
    let itemDestrac = { item: item };
    dispatch(cartReducerActions.decreaseItem(itemDestrac));
  };

  const deleteItem = (item) => {
    let itemDestrac = { item: item };
    dispatch(cartReducerActions.removeItem(itemDestrac));
    toast.success("Success remove product from your cart", {
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

  const proceedCheckout = () => {
    if (!user._id) return navigate("/login?order=required");
    if (cart.cartItems.length === 0) return navigate("/shop/product-list");
    const orderData = {
      orderTotal: {
        itemsCount: cart.itemsCount,
        cartSubtotal: cart.cartSubtotal.toFixed(2),
      },
      cartItems: cart.cartItems.map((item) => {
        return {
          name: item.name,
          price: item.price,
          image: { path: item.images ? item.images[0].path ?? null : null },
          stocks: item.stocks,
          count: item.amount,
          productId: item._id,
        };
      }),
      paymentMethod: "",
    };
    createOrder(orderData)
      .then((res) => {
        dispatch(cartReducerActions.emptyCart());
        navigate("/checkout/" + res._id);
      })
      .catch((err) => console.log(err));
  };
  const createOrder = async (orderData) => {
    const { data } = await axios.post("/api/orders", { ...orderData });
    return data;
  };

  return (
    <div className="container sm:!mx-1 md:!mx-5 lg:!mx-auto section">
      <ToastContainer
        position="top-right"
        autoClose={500}
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
      <MetaComponent
        title={"Carts | Plantex 2022"}
        desciption="Nothing adds more beauty and comfort to our homes and offices than the lush flowers and foliage of indoor plants. Bedrooms, bathrooms, kitchens, cubicles… There really isn’t a space a houseplant can’t enliven. Just add light and water, and you’ve got a growing indoor oasis. Bringing plants into your home is aesthetically pleasing and – amazingly – plants can offer strong health benefits as well!"
      />
      <div>
        {showNotification && (
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

            <p className="capitalize">
              {cart.cartItems.length === 0 && "Your Cart Is Currently Empty."}
              {userNotCompleteProfile &&
                "complete your user profile to make an order"}
            </p>
          </div>
        )}
      </div>
      <div className="mt-10">
        <h1 className="uppercase text-center text-4xl italic">
          Shopping Cart ({cart.itemsCount})
        </h1>
        <div className="mt-10 ">
          <div className="">
            <div className="grid   grid-cols-4  border-2 border-[#f5f5f5] px-2 md:px-5 py-3">
              <p className="text-black">Products</p>
              <p className="text-black">Price</p>
              <p className="text-black">Quantity</p>
              <p className="text-black">Subtotal</p>
            </div>
            {cart.cartItems.length > 0 &&
              cart.cartItems.map((item) => (
                <div
                  className="grid grid-cols-4 gap-x-2 md:gap-x-0   border-2 border-[#f5f5f5] px-2 md:px-5 py-3 border-t-0"
                  key={item._id}
                >
                  <Link to={"/shop/product-detail/" + item._id}>
                    <div className="flex flex-col md:flex-row  items-center gap-x-5 gap-y-3">
                      <img
                        src={item.images[0].path}
                        alt=""
                        className="w-[80px] object-contain "
                      />
                      <p className="pl-5 md:pl-0">{item.name}</p>
                    </div>
                  </Link>
                  <div className="flex items-center text-black">
                    <p>${item.price}</p>
                  </div>
                  <div className="w-[50%]  flex items-center">
                    <div className="grid grid-cols-1 md:grid-cols-3  border-2  border-[#f5f5f5] ">
                      <button
                        className={`text-xl border-right ${
                          item.amount === 1
                            ? "bg-black/20 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() => decreaseItem(item)}
                        disabled={item.amount === 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className=" text-center outline-none"
                        value={item.amount}
                        min={1}
                        max={10}
                        onChange={() => {}}
                      />
                      <button
                        className={`text-xl border-left ${
                          item.amount === item.stocks
                            ? "bg-black/20 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() => addItems(item)}
                        disabled={item.amount === item.stocks}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center text-black md:gap-x-10 gap-x-2">
                    <p>${(item.amount * item.price).toFixed(2)}</p>
                    <i
                      className="ri-close-circle-line text-lg cursor-pointer"
                      onClick={() => deleteItem(item)}
                    ></i>
                  </div>
                </div>
              ))}

            <div className="grid grid-cols-2 justify-between border-2 border-[#f5f5f5] px-5 py-3 border-t-0">
              <div className="flex items-center gap-x-5 text-xl">
                <span>Total :</span>
                <span className="text-black">
                  {" "}
                  ${cart.cartSubtotal > 0 ? cart.cartSubtotal.toFixed(2) : 0}
                </span>
              </div>
              <div className="text-right">
                <button
                  className="button uppercase text-xs md:text-md"
                  onClick={proceedCheckout}
                >
                  {!user._id
                    ? "Login To Proceed"
                    : cart.cartItems.length !== 0
                    ? "Procced To Checkout"
                    : "Continue Shooping"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
