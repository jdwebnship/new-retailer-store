import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import CardComponent from "./CardComponent";

import s01 from "../assets/images/s-01.jpg";
import s02 from "../assets/images/s-02.jpg";
import s03 from "../assets/images/s-03.jpg";
import s04 from "../assets/images/s-04.jpg";
import s05 from "../assets/images/s-05.jpg";

function ProductSection() {
  const { theme, buttonTextColor } = useTheme();

  const products = [
    {
      productName: "Chanel Jumbo Paris Glossy bag with...",
      price: "3,298",
      imageSrc: s01,
    },
    {
      productName: "Sample Product 2",
      price: "49.99",
      imageSrc: s02,
    },
    {
      productName: "Sample Product 3",
      price: "19.99",
      imageSrc: s03,
    },
    {
      productName: "Sample Product 1",
      price: "29.99",
      imageSrc: s04,
    },
    {
      productName: "Sample Product 2",
      price: "49.99",
      imageSrc: s05,
    },
    {
      productName: "Chanel Jumbo Paris Glossy bag with...",
      price: "3,298",
      imageSrc: s01,
    },
    {
      productName: "Sample Product 2",
      price: "49.99",
      imageSrc: s02,
    },
    {
      productName: "Sample Product 3",
      price: "19.99",
      imageSrc: s03,
    },
    {
      productName: "Sample Product 1",
      price: "29.99",
      imageSrc: s04,
    },
    {
      productName: "Sample Product 2",
      price: "49.99",
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
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 xxl:grid-cols-5 gap-[1.5rem] md:gap-y-[4.375rem]">
          {products.map((product, index) => (
            <CardComponent
              key={index}
              productName={product.productName}
              price={product.price}
              imageSrc={product.imageSrc}
            />
          ))}
        </div>
        <div className="mt-[30px] lg:mt-[3.125rem]">
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
export default ProductSection;
