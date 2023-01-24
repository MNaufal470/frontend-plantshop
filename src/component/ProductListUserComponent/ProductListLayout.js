import { Skeleton } from "@mui/material";
import React from "react";
import InputSearch from "../ShopComponent/InputSearch";
import ProductListShop from "../ShopComponent/ProductListShop";

const ProductListLayout = ({ products, setSortOption, loading }) => {
  return (
    <div className="  md:ml-0">
      <div className="md:pt-7 flex md:flex-col lg:flex-row gap-y-5  items-center md:justify-between justify-end">
        <div className="mt-10 md:mt-0">
          <InputSearch product={true} productList={true} />
        </div>
        <select
          name=""
          id=""
          className="text-center outline-none md:text-sm border-[1px] border-black py-2 text-black w-[150px] md:w-auto text-xs absolute top-0 md:relative"
          onChange={(e) => {
            setSortOption(e.target.value);
          }}
        >
          <option value="" className="text-[10px]  md:text-sm">
            Default Sorting
          </option>
          <option value="rating_-1" className="text-[10px]  md:text-sm">
            Sort By Popularity
          </option>
          <option value="createdAt_-1" className="text-[10px]  md:text-sm">
            Sort By Latest
          </option>
          <option value="price_1" className="text-[10px]  md:text-sm">
            Sort By Price: Low to High
          </option>
          <option value="price_-1" className="text-[10px]  md:text-sm">
            Sort By Price: High to Low
          </option>
        </select>
      </div>
      <div
        className={`grid  ${
          products?.length === 0 ? "" : "grid-cols-2 md:grid-cols-2"
        }  md:gap-x-10 gap-x-5   gap-y-10 mt-5`}
      >
        {products?.length > 0 &&
          !loading &&
          products?.map((item) => (
            <ProductListShop
              image={item.images[0].path}
              name={item.name}
              price={item.price}
              category={item.category}
              key={item._id}
              id={item._id}
              rating={item.rating}
              reviewsNumber={item.reviewsNumber}
              shopUser={true}
              item={item}
            />
          ))}
        {products?.length === 0 && (
          <div className="flex justify-center items-center  w-full">
            <div
              class="bg-black/60 border-t-2 border-b-2 border-black text-white px-4 py-3 w-full"
              role="alert"
            >
              <p class="font-bold">We Are Sorry</p>
              <p class="text-sm">Product your looking for is not found.</p>
            </div>
          </div>
        )}
        {loading &&
          Array.from({ length: 4 }).map((_, idx) => (
            <div className="w-100" key={idx}>
              <Skeleton variant="rectangular" width={"100%"} height={300} />
              <div className="flex justify-between items-center">
                <Skeleton animation="wave" width={"60%"} />
                <Skeleton animation="wave" width={"30%"} />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton animation="wave" width={"30%"} />
                <Skeleton animation="wave" width={"60%"} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductListLayout;
