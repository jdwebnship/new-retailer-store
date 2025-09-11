import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import whatsapp from "../assets/Whatsapp.svg";
import save from "../assets/heart.svg";

const CardComponent = ({ productName, price, imageSrc }) => {
  const { textColor } = useTheme();

  return (
    <div
      className="text-start relative card-element"
      style={{
        height: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "0.625rem",
      }}
    >
      <div
        className="bg-[#F8F8F8] rounded-[1.125rem] flex flex-col align-items-center justify-center"
        style={{
          height: "29.125rem",
          borderRadius: "1.125rem",
          overflow: "hidden",
        }}
      >
        <img
          src={imageSrc}
          alt={productName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: "rotate(0deg)",
            opacity: 1,
          }}
        />
      </div>
      <div className="hover-content absolute left-0 right-0 h-100">
        <div className="flex justify-between h-100">
          <span className="bg-[#1111116b] uppercase text-[0.875rem] px-[0.9375rem] py-[8px] rounded-[8px] absolute top-[0.9375rem] left-[8px] font-bold text-white backdrop-blur-md transition-all duration-150 ease-in-out">
            Out Of Stock
          </span>
          <div className="social-icon absolute top-[0.9375rem] flex flex-col gap-2 right-[0.9375rem]">
            <a
              href=""
              className="bg-[#25D366] p-[9px] w-[2.625rem] h-[2.625rem] inline-block rounded-[8px]"
            >
              <img src={whatsapp} alt="" srcset="" />
            </a>

            <button className="bg-[#1111116b] p-[9px] w-[2.625rem] h-[2.625rem] inline-block rounded-[8px]">
              <img src={save} alt="" srcset="" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[0.1875rem] text-start">
        {/* Time */}
        <p className="text-sm opacity-40">Added 7 seconds ago</p>
        <h3
          className="line-clamp-1 mb-[6px]"
          style={{ margin: 0, fontSize: "1.125rem" }}
        >
          <a href="">{productName}</a>
        </h3>
        <div className="flex gap-2">
          <p
            className="font-bold"
            style={{ margin: 0, fontSize: "1.125rem", color: textColor }}
          >
            ₹{price}
          </p>
          <p
            className="font-regular line-through"
            style={{ margin: 0, fontSize: "1.125rem", color: "#555" }}
          >
            ₹19,999
          </p>
        </div>
        <button className="text-sm uppercase underline text-start cursor-pointer">
          Remove From Wishlist
        </button>
      </div>
    </div>
  );
};

export default CardComponent;
