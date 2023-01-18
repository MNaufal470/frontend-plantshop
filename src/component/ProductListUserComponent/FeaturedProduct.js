import { Rating, Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedProduct = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchSpesialProduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_PLANT}/api/products/spesial/getProductBy`)
      .then((res) => {
        setNewArrivals(res.data.newArrivals);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchSpesialProduct();
    const timeOutLoading = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeOutLoading);
    };
  }, []);

  return (
    <div>
      <h1>Featured Product</h1>
      {!loading &&
        newArrivals?.slice(0, 3).map((item, key) => (
          <Link to={"/shop/product-detail/" + item._id} key={item._id}>
            <div className="flex flex-col gap-y-4 hover:bg-[#f5f5f5]" key={key}>
              <div className="flex gap-x-2 border-b-[1.5px] border-[#e1e1e1] py-5">
                <img
                  src={item.images[0].path}
                  alt=""
                  className="w-[80px] object-contain"
                />
                <div>
                  <Rating readOnly value={item.rating} size="small" />
                  {item.reviewsNumber && (
                    <small className="text-xs mb-5">
                      ({item.reviewsNumber})
                    </small>
                  )}
                  <p className="font-bold text-sm text-black">{item.name}</p>
                  <p className="text-xs mb-2">{item.category}</p>
                  <p className="font-bold text-xs ">$ {item.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      {loading && (
        <div className="flex flex-col gap-y-4 hover:bg-[#f5f5f5]">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div className="flex gap-x-2  py-5" key={idx}>
              <Skeleton variant="rectangular" width={100} height={80} />
              <div className="w-full">
                <Skeleton animation="wave" width={"30%"} height={20} />

                <Skeleton animation="wave" width={"60%"} height={20} />
                <Skeleton animation="wave" width={"30%"} height={20} />
                <Skeleton animation="wave" width={"20%"} height={20} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProduct;
