import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import Slider from "./Slider";
import heroimg from "../assets/images/hero.jpg";
import btnarrow from "../assets/btn-up-arrow.svg";
import { Link } from "react-router-dom";

function SingleImage() {
  const { theme, buttonTextColor } = useTheme();
  return (
    <div className="hero-overlay relative">
      <img src={heroimg} alt="" srcset="" />
      <div className="w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-1">
        <p className="uppercase text-white mb-[8px]">Wardrobe Refresh</p>
        <h1 className="text-[2rem] lg:text-[52px] xl:text-[62px] uppercase text-white mb-[8px]">
          New styles are here
        </h1>
        <p className="text-white text-2xl lg:text-[22px] mb-[0.9375rem]">
          Shine with our latest must-haves
        </p>

        <Link
          to={"/shop"}
          className="inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center"
        >
          View Collection
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

function Video() {
  return <span className="text-white">Video Placeholder</span>;
}

export default function Banner() {
  const { theme } = useTheme();
  if (theme.bannerType === "image") return <SingleImage />;
  if (theme.bannerType === "video") return <Video />;
  return <Slider />;
}
