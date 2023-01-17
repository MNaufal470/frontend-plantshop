import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyModal from "../../component/Modal";

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState({ show: false, id: "" });
  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products/admin/products");
    return data;
  };

  useEffect(() => {
    fetchProducts().then((res) => setProducts(res));
  }, [modal]);

  return (
    <div className="w-full h-screen overflow-y-scroll pb-20">
      {modal && (
        <MyModal
          setModal={setModal}
          modal={modal.show}
          id={modal.id}
          product={true}
        />
      )}
      <div className="pt-[61px] border-b-2 border-gray-300 w-full" />
      <div className="px-5 pt-10 text-right mb-5 ">
        <Link to={"/admin/product/create"}>
          <button className="py-3 px-5 bg-[#7451f8] rounded-full text-white font-semibold">
            Add New Product
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mx-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                No
              </th>
              <th scope="col" className="py-3 px-6">
                Product Name
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Category
              </th>
              <th scope="col" className="py-3 px-6">
                Stocks
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((item, idx) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={item._id}
                >
                  <td className="py-4 px-6 font-medium text-gray-900 ">
                    {idx + 1}
                  </td>
                  <td className="py-4 px-6 font-medium  text-gray-900  ">
                    {item.name}
                  </td>
                  <td className="py-4 px-6">${item.price}</td>
                  <td className="py-4 px-6">
                    <span className="py-2 px-1  font-semibold w-auto ">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="py-2 px-1  font-semibold w-auto ">
                      {item.stocks}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex items-center gap-x-1">
                    <Link to={`/admin/product/edit/${item._id}`}>
                      <p className="py-1 px-3 text-[#00008b] border-dotted border-[1px] rounded border-[#00008b] cursor-pointer hover:bg-[#00008b] hover:text-white">
                        Edit
                      </p>
                    </Link>
                    <p
                      className="py-1 px-3 text-[#dc143c] border-dotted border-[1px] rounded border-[#dc143c] cursor-pointer hover:bg-[#dc143c] hover:text-white"
                      onClick={() => setModal({ show: true, id: item._id })}
                    >
                      Delete
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductPage;
