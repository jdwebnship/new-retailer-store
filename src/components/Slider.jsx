import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
];

export default function Slider() {
  const { theme, buttonTextColor } = useTheme();

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        className="h-[85vh]"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={img}>
            <div className="relative w-full h-full">
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
              />
              <div className="w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-1">
                <p className="uppercase text-white mb-[8px]">
                  Wardrobe Refresh
                </p>
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
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
