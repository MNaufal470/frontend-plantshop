import Slider from "@mui/material/Slider";
import React from "react";

const PriceFilter = ({ price, setPrice }) => {
  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };
  return (
    <div>
      <h1 className="font-bold">Price</h1>
      <div>
        <Slider
          value={price}
          onChange={handleChange}
          min={1}
          max={100}
          sx={{
            height: 2,
            color: "rgba(0,0,0,0.87)",
            "& .MuiSlider-thumb": {
              borderRadius: 0,
              background: "none",
              border: "2px solid #000",
              width: 12,
              height: 12,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:focus, &:hover, &.Mui-active": {
                boxShadow: "none",
                // Reset on touch devices, it doesn't add specificity
              },
            },
          }}
        />
        <p className="text-sm">
          Range :{" "}
          <span className=" text-[#000]">
            ${price[0]} - ${price[1]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PriceFilter;
