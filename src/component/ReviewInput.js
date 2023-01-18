import { Rating } from "@mui/material";
import React, { useState } from "react";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import { formReducer } from "../utils/validationInputs";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { toast } from "react-toastify";
const ReviewInput = ({ name, productId, render, setRender }) => {
  const { user } = useSelector((state) => state.userInfo);
  const [rating, setRating] = useState(3);
  const [ratingErr, setRatingErr] = useState(false);
  const [comment, dispatchComment] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const sendRequestToReview = async (reviewData) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_PLANT}/api/reviews/` + productId,
      reviewData
    );
    return data;
  };
  const handleChangeRating = (e, newValue) => {
    if (newValue !== null) {
      setRating(newValue);
      setRatingErr(false);
    }
  };
  const handleChangeComment = (e) => {
    dispatchComment({ type: "notEmpty", val: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.isValid) {
      return dispatchComment({ type: "notEmpty", val: comment.value });
    }
    if (rating === null) {
      return setRatingErr(true);
    }
    const reviewData = { comment: comment.value, rating };
    sendRequestToReview(reviewData)
      .then((res) => {
        toast.success(`Thank you for the feedback `, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => console.log(err));
    setRender(!render);
  };
  return (
    <div className="w-full  max-w-xl bg-white rounded-lg  mx-auto">
      <div className="p-4 pt-0">
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <Rating
              size="large"
              value={rating}
              onChange={handleChangeRating}
              min={1}
            />
            {ratingErr === true && (
              <p className="mt-1 mb-0 text-sm text-red-600 dark:text-red-500">
                Please select a valid star
              </p>
            )}
          </div>
          <DebounceInput
            element="textarea"
            rows="4"
            placeholder={`What do you think about ${name}?.`}
            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              comment.isValid === false
                ? "border-red-500 bg-red-50 outline-red-500"
                : ""
            }`}
            value={comment.value}
            onChange={handleChangeComment}
            debounceTimeout={700}
          />

          {comment.isValid === false && (
            <p className="mt-1 mb-0 text-sm text-red-600 dark:text-red-500">
              {comment.errors}
            </p>
          )}
          <div className="w-full">
            <button
              className="button w-full mt-2"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
        <div className="flex flex-col-reverse gap-y-3 md:flex-row flex   items-center gap-x-2 pb-4 mt-3">
          <img
            src={user.image}
            alt=""
            className="rounded-full border-2   block w-[55px] h-[55px] object-cover"
          />
          <p className="text-sm text-[#757a95] text-justify">
            You have recently made a purchase from Plantex. Please help us
            improve our customer satisfaction by writing a review.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewInput;
