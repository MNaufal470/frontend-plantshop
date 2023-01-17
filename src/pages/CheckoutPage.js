import axios from "axios";
import { useSelector } from "react-redux";
import FormUser from "../component/FormUser";
import { loadScript } from "@paypal/paypal-js";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
const CheckoutPage = () => {
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [orderButtonMessage, setorderButtonMessage] = useState("Place Order");
  const [paymentMethod, setPaymentMethod] = useState("Choose Payment Method");
  const { user } = useSelector((state) => state.userInfo);
  const [userData, setUserData] = useState({});
  const paypalContainer = useRef();

  const loadPaypalScript = (cartSubtotal, cartItems, orderId, finishOrder) => {
    loadScript({
      "client-id":
        "AXH7HbxomeIEmvHWCzIG3q2MgKl0bxDXrdh86QkNhXqq2Z-Lv1l4uXk4jDgowUx7cTt34vCRjmM953ru",
    }).then((res) =>
      res
        .Buttons(buttons(cartSubtotal, cartItems, orderId, finishOrder))
        .render("#paypal-container-element")
    );
  };
  const updatedOrder = async (orderId) => {
    const { data } = await axios.put("/api/orders/paid/" + orderId, {
      paymentMethod: paymentMethod,
    });
    return data;
  };
  const orderHandler = () => {
    setbuttonDisabled(true);
    if (paymentMethod === "pp") {
      setorderButtonMessage(
        "To pay for your order click one of the buttons below"
      );
      if (!order?.isPaid) {
        loadPaypalScript(
          order?.orderTotal.cartSubtotal,
          order?.cartItems,
          id,
          finishOrder
        );
      }
    } else if (paymentMethod === "cod") {
      updatedOrder(id);
      setorderButtonMessage("Wait for your order. You pay on delivery");
    }
  };

  const buttons = (cartSubtotal, cartItems, orderId, finishOrder) => {
    return {
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: Number(cartSubtotal),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: Number(cartSubtotal),
                  },
                },
              },
              items: cartItems.map((product) => {
                return {
                  name: product.name,
                  unit_amount: {
                    currency_code: "USD",
                    value: Number(product.price),
                  },
                  quantity: product.count,
                  id: product._id,
                };
              }),
            },
          ],
        });
      },
      onCancel: () => {},
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (data) {
          let transaction = data.purchase_units[0].payments.captures[0];
          if (
            transaction.status === "COMPLETED" &&
            Number(transaction.amount.value) === Number(cartSubtotal)
          ) {
            updatedOrder(orderId);
            finishOrder();
          }
        });
      },
      onError: (err) => console.log(err),
    };
  };
  const finishOrder = () => {
    paypalContainer.current.style = "display:none";
  };
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get("/api/user/profile/" + user._id);
      return data;
    };
    const getOrder = async () => {
      const { data } = await axios.get("/api/orders/user/" + id);
      return data;
    };
    fetchUser().then((res) => {
      setUserData(res);
    });
    getOrder().then((res) => {
      setOrder(res);
      if (res.paymentMethod === "cod") {
        setbuttonDisabled(true);
        setorderButtonMessage("Wait for your order. You pay on delivery");
      } else if (paymentMethod === "pp") {
        setbuttonDisabled(true);
        setorderButtonMessage("Thanks For Your Order");
      }
    });
  }, [finishOrder]);
  return (
    <div className=" container section mb-20">
      <div className="flex flex-col md:flex-row px-5 gap-x-5">
        <div>
          <FormUser user={userData} />
        </div>
        <div className="bg-[#f0f0f0] w-full h-full py-5 px-10 max-w-lg ">
          <h1 className="text-xl font-normal">Products</h1>
          <div className="mt-5">
            <div className="flex flex-col gap-y-10">
              {order?.cartItems?.map((item) => (
                <div
                  className="flex justify-between items-center "
                  key={item?._id}
                >
                  <div className="flex items-center gap-x-4 ">
                    <img
                      src={item.image.path}
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
                    <span>${item.count * item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}

              {order?.paymentMethod === "" && (
                <div className="flex flex-col border-t-2 border-b-2 border-white py-5">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Select Payment Method
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    value={paymentMethod}
                  >
                    <option value={"Choose Payment Method"}>
                      Choose Payment Method
                    </option>
                    <option value="pp">Paypal</option>
                    <option value="cod">Cash On Delivery (Cod)</option>
                  </select>
                </div>
              )}
              {order?.paymentMethod !== "" && (
                <div className="flex flex-col gap-y-1.5 border-t-2 border-b-2 border-white py-5 text-black">
                  <span className="text-sm capitalize">
                    Order Payment : {order?.paymentMethod}
                  </span>
                  <span className="text-sm capitalize">
                    Paid At :{" "}
                    {order.isPaid
                      ? order?.paidAt.substring(0, 10)
                      : "Please paid when product arrive"}
                  </span>
                  <span className="text-sm capitalize">
                    Status Order :
                    {order?.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : " Order Being Process"}
                  </span>
                </div>
              )}
              <div className="flex justify-between ">
                <span className="text-xl">Total </span>
                <span className="text-black font-bold">
                  ${order?.orderTotal?.cartSubtotal}
                </span>
              </div>
              <div className="text-end">
                <button
                  className="button uppercase"
                  onClick={orderHandler}
                  disabled={buttonDisabled}
                >
                  {orderButtonMessage}
                </button>
              </div>
              <div
                ref={paypalContainer}
                style={{ position: "relative", zIndex: 1 }}
              >
                <div id="paypal-container-element"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
