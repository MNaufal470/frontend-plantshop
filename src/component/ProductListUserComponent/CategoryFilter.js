import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const CategoryFilter = ({ setFilters }) => {
  const { categories } = useSelector((state) => state.categories);
  const { category } = useParams() || "";
  let total = 0;
  categories.map((item) => {
    if (item.totalProduct) {
      total = total + item.totalProduct;
    }
  });
  return (
    <>
      <div>
        <h1 className="font-bold">Category</h1>
        <div className="mt-3 flex flex-col gap-y-4">
          <Link to={"/shop/product-list/"}>
            <div
              className={`text-sm ${
                category === undefined
                  ? "text-black font-semibold"
                  : "text-[#928987]"
              } flex justify-between hover:text-[#000] transition duration-200 cursor-pointer`}
            >
              <span>All Categories</span>
              <p className="p-1 px-2 bg-[#f1f1f1] rounded-full text-xs">
                {total}
              </p>
            </div>
          </Link>
          {categories.map((item) => (
            <Link
              to={"/shop/product-list/category/" + item.name.replace(" ", "-")}
              key={item._id}
              onClick={() => {
                setFilters({});
              }}
            >
              <div
                className={`text-sm ${
                  category === item.name.replace(" ", "-")
                    ? "text-black font-semibold"
                    : "text-[#928987]"
                } flex justify-between hover:text-[#000] transition duration-200 cursor-pointer`}
              >
                <span>{item.name}</span>
                <p className="p-1 px-2 bg-[#f1f1f1] rounded-full text-xs">
                  {item.totalProduct}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
