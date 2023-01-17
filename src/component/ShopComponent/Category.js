import React from "react";
import { Link } from "react-router-dom";

const Category = ({ img, name }) => {
  return (
    <Link to={"/shop/product-list/category/" + name.replace(" ", "-")}>
      <div className="text-center">
        <img
          src={img}
          alt=""
          className=" group/under rounded-full w-[178px] h-[178px] opacity-80 hover:opacity-100  "
        />
        <h1 className=" mt-3 font-light  object-cover  ">{name}</h1>
      </div>
    </Link>
  );
};

export default Category;
