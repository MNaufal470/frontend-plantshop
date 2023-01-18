import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyModal from "../../component/Modal";

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState({ show: false, id: "" });

  const fetchCategories = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_PLANT}/api/categories`
    );
    return data;
  };

  const deleteHandler = async (id) => {
    setModal({ show: true, id });
  };

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res));
  }, [modal]);
  return (
    <div className="w-full h-screen overflow-y-scroll pb-20">
      {modal.show && (
        <MyModal
          setModal={setModal}
          modal={modal.show}
          id={modal.id}
          category={true}
        />
      )}
      <div className="pt-[61px] border-b-2 border-gray-300 w-full " />
      <div className="px-5 pt-10 text-right mb-5 ">
        <Link to={"/admin/category/create"}>
          <button className="py-3 px-5 bg-[#7451f8] rounded-full text-white font-semibold">
            Add New Category
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mx-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                No.
              </th>
              <th scope="col" className="py-3 px-6">
                Category
              </th>
              <th scope="col" className="py-3 px-6">
                Attribute
              </th>
              <th scope="col" className="py-3 px-6">
                Total Products
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((ctx, i) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={ctx._id}
              >
                <td className="py-4 px-6 text-black">{i + 1}.</td>
                <td className="py-4 px-6 font-medium flex items-center gap-x-2 text-gray-900  ">
                  <img
                    src={ctx.image}
                    alt=""
                    className="w-[30px] h-[30px] rounded-full object-cover"
                  />
                  {ctx.name}
                </td>
                <td className="py-4 px-6 ">
                  {ctx.attrs.length > 0
                    ? ctx?.attrs.map((attr) => (
                        <p key={attr.key}>{attr.key},</p>
                      ))
                    : "No attributes attached for this category"}
                </td>
                <td className="py-4 px-6 font-medium  text-gray-900 ">
                  {ctx.totalProduct}
                </td>
                <td className="py-4 px-6 flex items-center gap-x-1">
                  <Link to={"/admin/category/edit/" + ctx._id}>
                    <p className="py-1 px-3 text-[#00008b] border-dotted border-[1px] rounded border-[#00008b] cursor-pointer hover:bg-[#00008b] hover:text-white">
                      Edit
                    </p>
                  </Link>
                  <p
                    className="py-1 px-3 text-[#dc143c] border-dotted border-[1px] rounded border-[#dc143c] cursor-pointer hover:bg-[#dc143c] hover:text-white"
                    onClick={() => deleteHandler(ctx._id)}
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

export default AdminCategoryPage;
