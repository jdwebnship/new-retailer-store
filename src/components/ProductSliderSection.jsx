import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import CardComponent from "./CardComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import s01 from "../assets/images/s-01.jpg";
import s02 from "../assets/images/s-02.jpg";
import s03 from "../assets/images/s-03.jpg";
import s04 from "../assets/images/s-04.jpg";
import s05 from "../assets/images/s-05.jpg";

function ProductSliderSection() {
  const { theme, buttonTextColor } = useTheme();

  const products = [
    {
      productName: "Chanel Jumbo Paris Glossy bag with...",
      price: "3,298",
      oldPrice: "3,898",
      imageSrc: s01,
    },
    {
      productName: "Sample Product 2",
      price: "49.99",
      oldPrice: "59.99",
      imageSrc: s02,
    },
    {
      productName: "Sample Product 3",
      price: "19.99",
      oldPrice: "29.99",
      imageSrc: s03,
    },
    {
      productName: "Sample Product 1",
      price: "29.99",
      oldPrice: "39.99",
      imageSrc: s04,
    },
    {
      productName: "Sample Product 2",
      price: "49.99",
      oldPrice: "59.99",
      imageSrc: s05,
    },
    {
      productName: "Chanel Jumbo Paris Glossy bag with...",
      price: "3,298",
      oldPrice: "3,898",
      imageSrc: s01,
    },
    {
      productName: "Sample Product 2",
      price: "49.99",
      oldPrice: "59.99",
      imageSrc: s02,
    },
    {
      productName: "Sample Product 3",
      price: "19.99",
      oldPrice: "29.99",
      imageSrc: s03,
    },
    {
      productName: "Sample Product 1",
      price: "29.99",
      oldPrice: "39.99",
      imageSrc: s04,
    },
    {
      productName: "Sample Product 2",
      price: "49.99",
      oldPrice: "59.99",
      imageSrc: s05,
    },
  ];

  return (
    <div className="py-[3.125rem] lg:py-[100px]">
      <p className="uppercase">Explore</p>
      <h2 className="text-[2rem] lg:text-[2.625rem] font-bold mb-[1.25rem] lg:mb-[3.125rem]">
        New Trending
      </h2>
      <section className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem]">
        <Swiper
          modules={[Navigation, Pagination]}
        //   loop={true}
          spaceBetween={24}
          slidesPerView={1}
          navigation
        //   pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          className="mySwiper"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <CardComponent
                productName={product.productName}
                price={product.price}
                oldPrice={product.oldPrice}
                imageSrc={product.imageSrc}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-[30px] lg:mt-[3.125rem] text-center">
          <a
            href=""
            className="inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center"
          >
            Shop ALL New Trending
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
          </a>
        </div>
      </section>
    </div>
  );
}

export default ProductSliderSection;