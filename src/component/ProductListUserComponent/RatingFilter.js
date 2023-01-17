import { Rating } from "@mui/material";
import React from "react";

const RatingFilter = ({ setRating }) => {
  const addRating = (e, idx) => {
    setRating((item) => {
      return { ...item, [5 - idx]: e.target.checked };
    });
  };
  return (
    <div className="">
      <h1 className="font-bold">Rating</h1>
      <div className="flex justify-between items-center mt-3">
        <Rating size="medium" value={5} readOnly />
        <input
          className="cursor-pointer w-4 h-4 "
          type="checkbox"
          onChange={(e) => addRating(e, 0)}
        />
      </div>
      <div className="flex justify-between items-center mt-3">
        <Rating size="medium" value={4} readOnly />
        <input
          className="cursor-pointer w-4 h-4 "
          type="checkbox"
          onChange={(e) => addRating(e, 1)}
        />
      </div>
      <div className="flex justify-between items-center mt-3">
        <Rating size="medium" value={3} readOnly />
        <input
          className="cursor-pointer w-4 h-4 "
          type="checkbox"
          onChange={(e) => addRating(e, 2)}
        />
      </div>
      <div className="flex justify-between items-center mt-3">
        <Rating size="medium" value={2} readOnly />
        <input
          className="cursor-pointer w-4 h-4 "
          type="checkbox"
          onChange={(e) => addRating(e, 3)}
        />
      </div>
      <div className="flex justify-between items-center mt-3">
        <Rating size="medium" value={1} readOnly />
        <input
          className="cursor-pointer w-4 h-4 "
          type="checkbox"
          onChange={(e) => addRating(e, 4)}
        />
      </div>
    </div>
  );
};

export default RatingFilter;
