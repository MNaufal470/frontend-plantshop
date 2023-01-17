import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import MetaComponent from "../../component/MetaComponent";

const fetchOrdersForFirstDate = async (abctrl, firstDateToCompare) => {
  const { data } = await axios.get(
    "/api/orders/analysis/" + firstDateToCompare,
    {
      signal: abctrl.signal,
    }
  );
  return data;
};

const fetchOrdersForSecondDate = async (abctrl, secondDateToCompare) => {
  const { data } = await axios.get(
    "/api/orders/analysis/" + secondDateToCompare,
    {
      signal: abctrl.signal,
    }
  );
  return data;
};

const AdminPages = () => {
  const [count, setCount] = useState({});
  const [firstDateToCompare, setFirstDateToCompare] = useState(
    new Date().toISOString().substring(0, 10)
  );
  let previousDay = new Date();
  previousDay.setDate(previousDay.getDate() - 7);
  const [secondDateToCompare, setSecondDateToCompare] = useState(
    new Date(previousDay).toISOString().substring(0, 10)
  );

  const [dataForFirstSet, setDataForFirstSet] = useState([]);
  const [dataForSecondSet, setDataForSecondSet] = useState([]);

  const firstDateHandler = (e) => {
    setFirstDateToCompare(e.target.value);
  };

  const secondDateHandler = (e) => {
    setSecondDateToCompare(e.target.value);
  };

  useEffect(() => {
    const abctrl = new AbortController();
    fetchOrdersForFirstDate(abctrl, firstDateToCompare)
      .then((data) => {
        let orderSum = 0;
        const orders = data.map((order) => {
          orderSum += order.orderTotal.cartSubtotal;
          var date = new Date(order.createdAt).toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZone: "UTC",
          });
          return { name: date, [firstDateToCompare]: orderSum };
        });
        setDataForFirstSet(orders);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );

    fetchOrdersForSecondDate(abctrl, secondDateToCompare)
      .then((data) => {
        let orderSum = 0;
        const orders = data.map((order) => {
          orderSum += order.orderTotal.cartSubtotal;
          var date = new Date(order.createdAt).toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZone: "UTC",
          });
          return { name: date, [secondDateToCompare]: orderSum };
        });
        setDataForSecondSet(orders);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );

    return () => {
      return () => abctrl.abort();
    };
  }, [firstDateToCompare, secondDateToCompare]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const { data } = await axios.get("/api/orders/admin/countDocuments");
      return data;
    };
    fetchDocuments().then((res) => setCount(res));
  }, []);

  return (
    <>
      <MetaComponent title={"Admin Dashboard | Plantex 2022"} />
      <div className="w-full h-screen overflow-y-scroll pb-20">
        <div className="pt-[61px] border-b-2 border-gray-300 w-full" />
        <div className="grid grid-cols-4 gap-x-5 m-10">
          <div className="w-56 h-24 border-l-8 border-[#7451f8]  bg-white shadow-2xl rounded-xl flex justify-between items-center pr-5">
            <div className="flex flex-col items-start justify-center h-full pl-5">
              <h1 className="font-light text-[#7451f8]">Total Products</h1>
              <p className="font-bold">{count.product ?? 0}</p>
            </div>
            <i className="ri-luggage-cart-line text-2xl text-[#7451f8]"></i>
          </div>
          <div className="w-56 h-24 border-l-8 border-[#1cc88a]  bg-white shadow-2xl rounded-xl flex justify-between items-center pr-5">
            <div className="flex flex-col items-start justify-center h-full pl-5">
              <h1 className="font-light text-[#1cc88a]">Total Categories</h1>
              <p className="font-bold">{count.category ?? 0}</p>
            </div>
            <i className="ri-article-line text-2xl text-[#1cc88a]"></i>
          </div>
          <div className="w-56 h-24 border-l-8 border-[#36b9cc]  bg-white shadow-2xl rounded-xl flex justify-between items-center pr-5">
            <div className="flex flex-col items-start justify-center h-full pl-5">
              <h1 className="font-light text-[#36b9cc]">Total Users</h1>
              <p className="font-bold">{count.user ?? 0}</p>
            </div>
            <i className="ri-user-line text-2xl text-[#36b9cc]"></i>
          </div>
          <div className="w-56 h-24 border-l-8 border-[#f6c23e]  bg-white shadow-2xl rounded-xl flex justify-between items-center pr-5">
            <div className="flex flex-col items-start justify-center h-full pl-5">
              <h1 className="font-light text-[#f6c23e]">Total Orders</h1>
              <p className="font-bold">{count.order ?? 0}</p>
            </div>
            <i className="ri-exchange-dollar-line text-2xl text-[#f6c23e]"></i>
          </div>
        </div>
        <div className="m-10 mt-20 ">
          <div className="bg-[#fff] shadow-2xl rounded-md">
            <div className="w-full   py-3 px-5  border-[#7451f8] border-b pb-3">
              <h1 className="uppercase tracking-[2px] text-[#7451f8]">
                Earning OverView
              </h1>
            </div>
            <div className="w-full  px-5 py-10 flex gap-x-20">
              <div className="w-1/2">
                <label htmlFor="" className="text-sm font-semibold text-black">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full border-[#7451f8] border p-1 rounded-md"
                  value={firstDateToCompare}
                  onChange={firstDateHandler}
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="" className="text-sm font-semibold text-black">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full border-[#7451f8] border p-1 rounded-md"
                  value={secondDateToCompare}
                  onChange={secondDateHandler}
                />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={500}>
              <LineChart
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  label={{
                    value: "TIME",
                    offset: 50,
                    position: "insideBottomRight",
                  }}
                  allowDuplicatedCategory={false}
                />
                <YAxis
                  label={{
                    value: "REVENUE $",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                {dataForFirstSet.length > dataForSecondSet.length ? (
                  <>
                    <Line
                      data={dataForFirstSet}
                      type="monotone"
                      dataKey={firstDateToCompare}
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={4}
                    />
                    <Line
                      data={dataForSecondSet}
                      type="monotone"
                      dataKey={secondDateToCompare}
                      stroke="#82ca9d"
                      strokeWidth={4}
                    />
                  </>
                ) : (
                  <>
                    <Line
                      data={dataForSecondSet}
                      type="monotone"
                      dataKey={secondDateToCompare}
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={4}
                    />
                    <Line
                      data={dataForFirstSet}
                      type="monotone"
                      dataKey={firstDateToCompare}
                      stroke="#82ca9d"
                      strokeWidth={4}
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPages;
