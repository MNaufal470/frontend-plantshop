import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AttributeFilter from "./AttributeFilter";
import CategoryFilter from "./CategoryFilter";
import FeaturedProduct from "./FeaturedProduct";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

const Sidebar = ({
  setOpenFilter,
  setRefetch,
  refetch,
  categoryExist,
  setFilters,
}) => {
  const navigate = useNavigate();
  const [attrFromFilter, setAttrFromFilter] = useState([]);
  const [showReset, setShowReset] = useState(false);
  const [rating, setRating] = useState({});
  const [price, setPrice] = useState([1, 100]);
  const location = useLocation();
  const addFiltersHandler = () => {
    setShowReset(true);
    setFilters({
      attrs: attrFromFilter,
      price: price,
      rating: rating,
    });
    navigate(location.pathname.replace(/\/[0-9]+$/, ""));
  };
  const ResetFilterHandler = () => {
    setShowReset(false);
    setFilters({});
    navigate("/shop/product-list");
  };
  return (
    <div className="md:w-[250px] relative h-screen md:h-full  overflow-x-hidden overflow-y-scroll scrollbar-hide  pb-20 md:pb-0">
      <div
        className=" w-full headSidebar pb-5 border-b-[1px] border-[#f1f1f1] flex items-center justify-end pr-4 md:hidden"
        onClick={() => setOpenFilter(false)}
      >
        <span>CLOSE</span>
        <i className="ri-close-line text-xl"></i>
      </div>
      <div className="px-5  md:px-2  pt-10 md:pt-0 flex flex-col gap-y-10 ">
        <CategoryFilter setFilters={setFilters} />
        {categoryExist && (
          <>
            <RatingFilter setRating={setRating} />
            <PriceFilter price={price} setPrice={setPrice} />
            <AttributeFilter
              attrFromFilter={attrFromFilter}
              setAttrFromFilter={setAttrFromFilter}
            />
            <div className="flex items-center justify-between  border-t-[1.5px] border-b-[1.5px] border-[#e1e1e1] py-5">
              <button
                className={` buttonFilter ${!showReset ? "w-full" : ""}`}
                onClick={addFiltersHandler}
              >
                Filter
              </button>
              {showReset && (
                <button
                  className="buttonResetFilter"
                  onClick={ResetFilterHandler}
                >
                  Reset Filter
                </button>
              )}
            </div>
          </>
        )}
        <FeaturedProduct />
      </div>
    </div>
  );
};

export default Sidebar;
