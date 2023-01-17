import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormUser from "../../component/FormUser";

const AdminOrderDetail = () => {
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("");
  const [render, setRender] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { id } = useParams();

  const updateStatus = async () => {
    const { data } = await axios.put("/api/orders/delivered/" + id);
    return data;
  };

  const handleSubmmit = () => {
    updateStatus();
    setRender(!render);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await axios.get("/api/orders/user/" + id);
      return data;
    };

    fetchOrder().then((res) => {
      setOrder(res);
      if (res?.isDelivered) {
        setDisabled(true);
        setStatus("Delivered At " + order.deliveredAt.substring(0, 10));
      } else {
        setStatus("Order Being Process");
      }
    });
  }, [updateStatus]);
  return (
    <div className="w-full h-screen overflow-y-scroll pb-20">
      <div className="pt-[61px] border-b-2 border-gray-300 w-full" />
      <div className="flex flex-col md:flex-row px-5 gap-x-5 mx-10 mt-10">
        <FormUser userAndOrder={true} user={order?.user} />
        <div className="bg-[#f0f0f0] w-full h-full py-5 px-10 max-w-lg">
          <h1 className="text-xl font-normal">Products</h1>
          <div className="mt-5">
            <div className="flex flex-col gap-y-10">
              {order?.cartItems?.map((item) => (
                <div
                  className="flex justify-between items-center "
                  key={item._id}
                >
                  <div className="flex items-center gap-x-4 ">
                    <img
                      src={item?.image.path}
                      alt=""
                      className="w-[80px] object-contain"
                    />
                    <div className="">
                      <p>{item.name}</p>
                      <p>QTY : {item.count}</p>
                      <p>Price : ${item.price}</p>
                    </div>
                  </div>
                  <div>
                    <span>${item.price * item.count}</span>
                  </div>
                </div>
              ))}

              <div className="flex flex-col border-t-2 border-b-2 border-white py-5">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Payment Method
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                  onChange={() => {}}
                  disabled
                >
                  <option value={"Choose Payment Method"}>
                    {order?.paymentMethod === "cod"
                      ? "Cash On Delivery"
                      : "Paypal"}
                  </option>
                </select>
              </div>
              <div className="flex justify-between ">
                <span className="text-xl">Total </span>
                <span className="text-black font-bold">
                  ${order?.orderTotal?.cartSubtotal}
                </span>
              </div>
              <div className="flex flex-col border-t-2 border-b-2 border-white py-5">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  {disabled ? " Status Order" : " Select Status Order"}
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                  onChange={() => {}}
                  disabled={disabled}
                >
                  <option value={"Choose Payment Method"}>{status}</option>
                  <option value="delivered">Mark as delivered</option>
                </select>
              </div>
              <div className="text-end">
                <button
                  className="button uppercase"
                  onClick={handleSubmmit}
                  disabled={disabled}
                >
                  {disabled ? "Order Completed" : "Update Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
