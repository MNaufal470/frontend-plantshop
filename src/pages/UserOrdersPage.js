import { Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaComponent from "../component/MetaComponent";

const UserOrdersPage = () => {
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchUserOrder = async () => {
      const { data } = await axios.get("/api/orders/");
      return data;
    };
    fetchUserOrder().then((res) => setOrder(res));
    const timeOutLoading = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeOutLoading);
    };
  }, []);

  return (
    <div>
      <MetaComponent title={"Orders | Plantex 2022"} />
      <div className="w-full h-[200px] md:h-[300px] bg-[url('https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/bg-breadcrumb.jpg')] section relative bg-left ">
        <h1 className="home__title text-center text-black md:pt-5 pt-0">
          Orders
        </h1>
      </div>
      <div className="container mt-3">
        {order?.length === 0 && (
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
            <p>You haven't placed any orders yet</p>
          </div>
        )}
        <div>
          {!loading &&
            order?.map((item) => (
              <div
                className="border-2 border-[#f5f5f5]  mt-5 flex justify-between items-center"
                key={item._id}
              >
                <div className="flex gap-x-2 px-5 py-5">
                  <img
                    src={item.cartItems[0]?.image?.path}
                    alt=""
                    className="w-[80px] h-[80px] object-cover"
                  />
                  <div className="flex flex-col gap-y-1">
                    <span className="text-black">
                      {item.cartItems[0]?.name}
                    </span>
                    <span className="text-black">
                      Total : ${item?.orderTotal?.cartSubtotal}
                    </span>
                    <span className="text-xs">
                      {item.createdAt.substring(0, 10)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 md:border-l-2  py-5 border-[#f5f5f5] pl-20 pr-20 ">
                  <span className="text-sm">
                    Status :<br />
                    {item?.isDelivered
                      ? "Delivered At " + item.deliveredAt.substring(0, 10)
                      : "Order Being Process"}
                  </span>
                  <Link to={"/user/order-detail/" + item._id}>
                    <button className="button">Details</button>
                  </Link>
                </div>
              </div>
            ))}
          {loading && (
            <div className="border-2 border-[#f5f5f5]  mt-5 flex justify-between items-center  ">
              <div className="flex gap-x-2 px-5 py-5 ">
                <Skeleton
                  width={80}
                  height={80}
                  variant="rectangular"
                  animation="wave"
                />
                <div className="flex flex-col gap-y-1">
                  <Skeleton width={100} height={25} animation="wave" />
                  <Skeleton width={100} height={25} animation="wave" />
                  <Skeleton width={75} height={25} animation="wave" />
                </div>
              </div>
              <div className="flex flex-col gap-y-2 md:border-l-2  py-5 border-[#f5f5f5] md:pl-20 pr-20 ">
                <Skeleton width={75} height={25} animation="wave" />
                <Skeleton
                  width={80}
                  height={50}
                  variant="rounded"
                  animation="wave"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrdersPage;
