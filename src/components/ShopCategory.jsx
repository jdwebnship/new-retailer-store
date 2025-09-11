import React from "react";
import "../App.css";

import CardSlider from "./CardSlider";
import { useTheme } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";

function ShopCategory() {
  const { buttonTextColor } = useTheme();
  return (
    <div className="py-[3.125rem] lg:py-[100px]">
      <p className="uppercase">The Essentials</p>
      <h2 className="text-[2rem] lg:text-[2.625rem] font-bold mb-[1.25rem] lg:mb-[3.125rem]">
        Shop Category
      </h2>
      <CardSlider />
      <div className="mt-[30px] lg:mt-[3.125rem]">
        <Link
          to={"/categories"}
          className="inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center"
        >
          View All Categories
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke={buttonTextColor}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default ShopCategory;
