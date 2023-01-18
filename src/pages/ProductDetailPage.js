import { Rating, Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductListShop from "../component/ShopComponent/ProductListShop";
import { useDispatch, useSelector } from "react-redux";
import { cartReducerActions } from "../store/reducers/cartReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wishlistActions } from "../store/reducers/wishlistReducer";
import { recentlyActions } from "../store/reducers/recentlyReducer";
import MetaComponent from "../component/MetaComponent";
import ReviewInput from "../component/ReviewInput";
const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.userInfo);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [render, setRender] = useState(false);
  const [statusReview, setStatusReview] = useState({
    status: false,
    reviewed: false,
  });
  const [selectedImg, setSelectedImg] = useState("");
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { recently } = useSelector((state) => state.recently);

  const checkUserCanReview = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_PLANT}/api/reviews/check/` + id
    );
    return data;
  };

  const handleAddWishlist = (item) => {
    let itemAdd = { item: item };
    let wishlistAction = true;
    dispatch(wishlistActions.WishlistTrigger(itemAdd));
    let findIndex = wishlist.findIndex((wish) => wish._id === item._id);
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

  const handleAddCart = (item) => {
    let detailCart = { item, quantity };
    dispatch(cartReducerActions.addItem(detailCart));
    setQuantity(1);
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
  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_PLANT}/api/products/` + id
      );
      return data;
    };

    const fetchRelated = async (category) => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_PLANT}/api/products/spesial/relatedProduct/` +
          category
      );
      return data;
    };

    fetchProduct().then((res) => {
      let productRecent = { item: res };
      setProduct(res);
      setSelectedImg(res.images[0].path);
      fetchRelated(res.category).then((res) => setRelated(res));
      dispatch(recentlyActions.triggerRecently(productRecent));
    });
    if (user._id) {
      checkUserCanReview().then((res) => setStatusReview(res));
    }
    const timeOutLoading = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeOutLoading);
    };
  }, [id, render]);

  return (
    <div className="container section">
      <MetaComponent
        title={product?.name + " | Plantex 2022"}
        desciption={product?.desciption}
      />
      {!loading && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-10">
          <div>
            <div className="imgSelected">
              <img
                src={selectedImg}
                alt=""
                className="w-full h-[500px] object-cover mb-3 shadow-md"
              />
            </div>
            <div className="flex gap-x-3 justify-between">
              {product?.images?.map((item, i) => (
                <img
                  key={item._id}
                  src={item.path}
                  alt=""
                  className={`w-[150px] h-[100px] object-cover cursor-pointer ${
                    selectedImg === item.path ? "border-[1px] border-black" : ""
                  }`}
                  onClick={() => setSelectedImg(item.path)}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="pt-10">
              <div className="text-xs capitalize flex gap-x-1">
                <Link to={"/"}>
                  <span className="cursor-pointer hover:text-black">
                    Home /
                  </span>
                </Link>
                <Link to={"/shop/product-list"}>
                  <span className="cursor-pointer hover:text-black">
                    Shop /
                  </span>
                </Link>
                <Link
                  to={
                    "/shop/product-list/category/" +
                    product?.category?.replace(" ", "-")
                  }
                >
                  <span className="cursor-pointer hover:text-black">
                    {product.category} /
                  </span>
                </Link>
                <span className="cursor-pointer hover:text-black text-black">
                  {product.name}
                </span>
              </div>
              <div className="mt-5">
                <div className="pb-3 border-b-2 border-[#f5f5f5]">
                  <div className="flex items-center cursor-pointer mb-3">
                    <Rating readOnly size="small" value={product.rating ?? 0} />
                    <span className="text-sm">
                      (
                      {product.reviewsNumber
                        ? product.reviewsNumber + " Customer Review"
                        : "Be the first to review " + product.name}{" "}
                      )
                    </span>
                  </div>
                  <h1 className="text-3xl font-normal mb-2">{product.name}</h1>
                  <p className="text-2xl text-black">${product.price}</p>
                </div>
                <div className="mt-3 flex flex-col gap-y-2 ">
                  <p className="mb-5">{product.description}</p>
                  <div className="flex items-center gap-x-2 pb-5 border-b-2 border-[#f5f5f5]">
                    {product.stocks > 0 && (
                      <>
                        <div className="grid  grid-cols-3  border-2  border-[#f5f5f5] ">
                          <button
                            className={`text-xl py-2 border-right ${
                              quantity === 1
                                ? "bg-black/20 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={() => setQuantity(quantity - 1)}
                            disabled={quantity === 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className=" text-center outline-none font-bold text-black"
                            value={quantity}
                            min={1}
                            max={product.stocks}
                            onChange={() => {}}
                          />
                          <button
                            className={`text-xl border-left ${
                              quantity === product.stocks
                                ? "bg-black/20 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={() => setQuantity(quantity + 1)}
                            disabled={quantity === product.stocks}
                          >
                            +
                          </button>
                        </div>
                        <div>
                          <button
                            className="bg-[#656565] text-white py-4 lg:py-4  px-3 text-xs lg:text-[15px]  lg:px-10 hover:bg-[#224229]"
                            onClick={() => handleAddCart(product)}
                          >
                            Add To Cart
                          </button>
                        </div>
                      </>
                    )}
                    <div
                      className={`border-2 border-[#f5f5f5] py-2 px-4 cursor-pointer hover:bg-[#224229] hover:text-white ${
                        wishlist?.findIndex((p) => p?._id === product?._id) !==
                        -1
                          ? "!bg-[#224229] !text-white"
                          : ""
                      }`}
                      onClick={() => handleAddWishlist(product)}
                    >
                      <i className="ri-heart-line text-xl"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-y-2">
                {product.stocks > 0 ? (
                  <span className="flex items-center gap-x-1">
                    In Stocks : <p className="text-black">{product.stocks}</p>
                  </span>
                ) : (
                  <span className="text-center pb-4 border-b-2 border-[#f5f5f5] text-black">
                    Sorry {product.name} out of stocks
                  </span>
                )}
                <span className="flex kitems-center gap-x-1">
                  Category : <p className="text-black">{product.category}</p>
                </span>
                {product?.attrs?.map((item, i) => (
                  <span
                    className="flex items-center gap-x-1 capitalize"
                    key={i}
                  >
                    {item.key} :{" "}
                    <p className="text-black flex items-center gap-x-2">
                      {item.value[0].includes("@") ? (
                        <>
                          {item.value[0].split("@")[0]}
                          <i
                            className="w-5 h-5 rounded-full relative"
                            style={{
                              backgroundColor: item.value[0].split("@")[1],
                            }}
                          ></i>
                        </>
                      ) : (
                        item.value
                      )}
                    </p>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-10">
          <div>
            <div>
              <Skeleton variant="rectangular" height={500} animation="wave" />
              <div className="flex gap-x-3 justify-between mt-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    variant="rectangular"
                    height={150}
                    width={150}
                    animation="wave"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="pt-10">
            <Skeleton width={175} height={20} animation="wave" />
            <Skeleton
              width={200}
              height={20}
              animation="wave"
              sx={{ mt: "12px" }}
            />
            <Skeleton width={200} height={80} animation="wave" />
            <Skeleton width={100} height={80} animation="wave" />
            <Skeleton height={250} animation="wave" sx={{ mt: "-25px" }} />
            <Skeleton
              width={175}
              height={20}
              animation="wave"
              sx={{ mb: "12px" }}
            />
            <Skeleton
              width={175}
              height={20}
              animation="wave"
              sx={{ mb: "12px" }}
            />
            <Skeleton
              width={175}
              height={20}
              animation="wave"
              sx={{ mb: "12px" }}
            />
            <Skeleton width={175} height={20} animation="wave" />
          </div>
        </div>
      )}
      <div className="mt-20 border-t-2 pt-10 border-[#f5f5f5]">
        <h1 className="text-center text-3xl mb-10">
          Reviews ({product.reviewsNumber ?? 0})
        </h1>
        {statusReview.reviewed && (
          <div className="flex justify-center items-center  w-full mb-10">
            <div
              className="bg-black/60 border-t-2 border-b-2 border-black text-white px-4 py-3 w-full"
              role="alert"
            >
              <p className="font-bold">Thanks For Your Valuable Feedback.</p>
            </div>
          </div>
        )}
        <div className="space-y-5">
          {product?.reviews?.map((item) => (
            <div
              className="border-2 pt-10 pb-10 border-[#f5f5f5] py-3 px-5"
              key={item._id}
            >
              <div className="flex gap-x-2 items-center">
                <img
                  src={item.users.image}
                  alt=""
                  className="rounded-full w-[60px] h-[60px] object-cover"
                />
                <div className="flex flex-col gap-y-0.5">
                  <Rating readOnly size="small" value={item.rating} />
                  <span className="text-sm font-bold">{item.users.name}</span>
                  <span className="text-xs">
                    {item.createdAt.substring(0, 10)}
                  </span>
                </div>
              </div>
              <p className="mt-3 ">{item.comment}</p>
            </div>
          ))}
          {statusReview.status && (
            <ReviewInput
              name={product.name}
              productId={id}
              render={render}
              setRender={setRender}
            />
          )}
        </div>
        <div className="mt-20 border-t-2 pt-10 border-[#f5f5f5]">
          <h1 className="text-center text-3xl mb-10">Related Products</h1>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-x-5 gap-y-10">
            {!loading &&
              related
                ?.filter((item) => item._id !== id)
                .map((item) => (
                  <ProductListShop
                    image={item.images[0].path}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                    key={item._id}
                    shopUser={true}
                    id={item._id}
                    rating={item.rating}
                    reviewsNumber={item.reviewsNumber}
                    item={item}
                  />
                ))}
            {loading &&
              Array.from({ length: 3 }).map((_t, idx) => (
                <div key={idx}>
                  <Skeleton variant="rectangular" width={"100%"} height={300} />
                  <div className="flex justify-between items-center">
                    <Skeleton animation="wave" width={"60%"} />
                    <Skeleton animation="wave" width={"30%"} />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton animation="wave" width={"30%"} />
                    <Skeleton animation="wave" width={"60%"} />
                  </div>
                </div>
              ))}
          </div>
        </div>
        {recently.length !== 1 && (
          <div className="mt-20 border-t-2 pt-10 border-[#f5f5f5]">
            <h1 className="text-center text-3xl mb-10">Recently Viewed</h1>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-x-5 gap-y-10">
              {recently
                ?.filter((item) => item._id !== id)
                .map((item) => (
                  <ProductListShop
                    image={item.images[0].path}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                    key={item._id}
                    shopUser={true}
                    id={item._id}
                    rating={item.rating}
                    reviewsNumber={item.reviewsNumber}
                    item={item}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
