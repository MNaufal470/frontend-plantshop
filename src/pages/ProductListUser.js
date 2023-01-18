import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MetaComponent from "../component/MetaComponent";
import Pagination from "../component/ProductListUserComponent/Pagination";
import ProductListLayout from "../component/ProductListUserComponent/ProductListLayout";
import Sidebar from "../component/ProductListUserComponent/Sidebar";

const ProductListUser = () => {
  const { category } = useParams() || "";
  const { categories } = useSelector((state) => state.categories);
  let categoryExist = categories.find(
    (item) => item?.name?.replace(" ", "-") === category
  );
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [paginationLinksNumbers, setPaginationLinksNumbers] = useState(null);
  const [pageNum, setPageNum] = useState(null);

  const [sortOption, setSortOption] = useState("");
  const { pageNumParam } = useParams() || 1;
  const { searchQuery } = useParams() || "";
  let filtersUrl;

  const proceedFilters = (filters) => {
    filtersUrl = "";
    Object.keys(filters).map((key, index) => {
      if (key === "price")
        filtersUrl += `&min=${filters[key][0]}&max=${filters[key][1]}`;
      else if (key === "rating") {
        let rat = "";
        Object.keys(filters[key]).map((key2, index2) => {
          if (filters[key][key2]) rat += `${key2},`;
          return "";
        });
        filtersUrl += "&rating=" + rat;
      } else if (key === "category") {
        let cat = "";
        Object.keys(filters[key]).map((key3, index3) => {
          if (filters[key][key3]) cat += `${key3},`;
          return "";
        });
        filtersUrl += "&category=" + cat;
      } else if (key === "attrs") {
        if (filters[key].length > 0) {
          let val = filters[key].reduce((acc, item) => {
            let key = item.key;
            let val = item.value.join("-");
            return acc + key + "-" + val + ",";
          }, "");
          filtersUrl += "&attrs=" + val;
        }
      }
      return "";
    });
    return filtersUrl;
  };

  const fetchProducts = useCallback(
    async (
      category = "",
      pageNumParam = null,
      searchQuery = "",
      filters = {},
      sortOption = ""
    ) => {
      filtersUrl = proceedFilters(filters);
      const search = searchQuery ? `search/${searchQuery}/` : "";
      const categoryName = category ? `category/${category}/` : "";
      const url = `${process.env.REACT_APP_PLANT}/api/products/${categoryName}${search}?pageNum=${pageNumParam}${filtersUrl}&sort=${sortOption}`;
      const { data } = await axios.get(url);

      return data;
    },
    []
  );

  useEffect(() => {
    setLoading(true);
    fetchProducts(
      category,
      pageNumParam,
      searchQuery,
      filters,
      sortOption
    ).then((res) => {
      setProducts(res);
      setPaginationLinksNumbers(res.paginationLinksNumber);
      setPageNum(res.pageNum);
    });
    const timeOutLoading = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeOutLoading);
    };
  }, [
    category,
    pageNumParam,
    searchQuery,
    filters,
    categories,
    sortOption,
    fetchProducts,
  ]);

  return (
    <>
      <MetaComponent
        title={"Plantex | E-Commerce 2022"}
        desciption="Nothing adds more beauty and comfort to our homes and offices than the lush flowers and foliage of indoor plants. Bedrooms, bathrooms, kitchens, cubicles… There really isn’t a space a houseplant can’t enliven. Just add light and water, and you’ve got a growing indoor oasis. Bringing plants into your home is aesthetically pleasing and – amazingly – plants can offer strong health benefits as well!"
      />
      <div className="container relative section !pt-[2.5rem] md:!pt-[5.5rem]">
        <div className="relative flex mx-5 gap-x-10 flex-col md:flex-row">
          <div>
            <div className="md:hidden">
              <i
                className="ri-sound-module-fill text-xl"
                onClick={() => {
                  setOpenFilter(true);
                }}
              ></i>
            </div>
            <div
              className={`sidebar fixed md:relative ${
                openFilter ? "left-0" : "left-[-100%] md:!left-0"
              }  top-0 pt-7  w-[70%] md:w-[unset]  z-[99] md:z-[1] bg-white transition-all duration-300`}
            >
              <Sidebar
                setOpenFilter={setOpenFilter}
                categoryExist={categoryExist}
                setFilters={setFilters}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <ProductListLayout
              products={products.products}
              setSortOption={setSortOption}
              loading={loading}
            />
            <div className="flex justify-center  mt-10 md:mt-10">
              {paginationLinksNumbers > 1 && (
                <Pagination
                  category={category}
                  searchQuery={searchQuery}
                  paginationLinksNumber={paginationLinksNumbers}
                  pageNum={pageNum}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListUser;
