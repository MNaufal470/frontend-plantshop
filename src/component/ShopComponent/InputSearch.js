import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropdown from "../Dropdown";

const InputSearch = ({ product = false, productList = false }) => {
  const { categories } = useSelector((state) => state.categories);
  let allCategories = [...categories, { name: "All" }];
  const matches = useMediaQuery("(min-width:600px)");
  const [search, setSearch] = useState("");
  const [searchTitle, setsearchTitle] = useState("All");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (e.keyCode && e.keyCode !== 13) return;
    setSearch("");
    if (search.trim()) {
      if (searchTitle === "All") {
        navigate(`/shop/product-list/search/${search}`);
      } else {
        navigate(
          `/shop/product-list/category/${searchTitle.replace(
            " ",
            "-"
          )}/search/${search}`
        );
      }
    } else if (searchTitle !== "All") {
      navigate(
        `/shop/product-list/category/${searchTitle.replaceAll(" ", "-")}`
      );
    } else {
      navigate(`/shop/product-list`);
    }
  };
  return (
    <form className="flex items-center " onSubmit={submitHandler}>
      <Dropdown
        list={allCategories}
        product={product}
        setsearchTitle={setsearchTitle}
        searchTitle={searchTitle}
      />
      <div className="relative flex-1">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className={`block ${
            product ? "py-4" : "p-4"
          } pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-r-md border   border-gray-300    outline-none`}
          placeholder="Search Products..."
          required=""
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
    </form>
  );
};

export default InputSearch;
