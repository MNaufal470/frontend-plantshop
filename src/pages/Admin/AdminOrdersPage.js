import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get("/api/orders/admin");
      return data;
    };
    fetchOrders().then((res) => setOrders(res));
  }, []);
  console.log(orders);
  return (
    <div className="w-full h-screen overflow-y-scroll pb-20">
      <div className="pt-[61px] border-b-2 border-gray-300 w-full" />
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mx-5  mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                No.
              </th>
              <th scope="col" className="py-3 px-6">
                User
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
              <th scope="col" className="py-3 px-6">
                Total
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Payment Method
              </th>
              <th scope="col" className="py-3 px-6">
                Order details
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((item, i) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={item._id}
                >
                  <td className="py-4 px-6 font-medium  text-gray-900 ">
                    {i + 1}.
                  </td>
                  <td className="py-4 px-6 font-medium  text-gray-900 ">
                    {item.user?.name} {item.user?.lastName}
                  </td>
                  <td className="py-4 px-6 font-medium  text-gray-900 ">
                    {item.createdAt.substring(0, 10)}
                  </td>
                  <td className="py-4 px-6 font-medium  text-gray-900 ">
                    $ {item.orderTotal.cartSubtotal}
                  </td>
                  <td className="py-4 px-6 font-medium  text-gray-900 ">
                    {item.isDelivered
                      ? "Delivered At " + item.deliveredAt.substring(0, 10)
                      : "Order being process"}
                  </td>
                  <td className="py-4 px-6 font-medium  text-gray-900 capitalize">
                    {item.paymentMethod}
                  </td>
                  <td className="py-4 px-6 font-medium  text-gray-900 ">
                    <Link to={"/admin/order-detail/" + item._id}>
                      <p className="py-1 px-3 text-[#00008b] border-dotted border-[1px] rounded border-[#00008b] cursor-pointer hover:bg-[#00008b] hover:text-white text-center">
                        Detail Order
                      </p>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
