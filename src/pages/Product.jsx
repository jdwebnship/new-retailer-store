import React, { useState } from "react";
import CommonHeader from "../components/CommonHeader";
import s01 from "../assets/images/s-01.jpg";
import s02 from "../assets/images/s-02.jpg";
import s03 from "../assets/images/s-03.jpg";
import s04 from "../assets/images/s-04.jpg";
import s05 from "../assets/images/s-05.jpg";
import cross from "../assets/x.svg";
import CardComponent from "../components/CardComponent";
import PriceRangeSlider from "../components/Pricerangeslider";

function Product() {
  // State for price range slider
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Dummy product data
  const products = [
    {
      id: 1,
      productName: "Women's Classic Watch",
      category: "Women's Watch",
      price: 199.99,
      inStock: true,
      imageSrc: s01,
    },
    {
      id: 2,
      productName: "Men's Sport Perfume",
      category: "Perfumes for Men",
      price: 49.99,
      inStock: false,
      imageSrc: s02,
    },
    {
      id: 3,
      productName: "Graphic T-Shirt",
      category: "T-Shirts",
      price: 29.99,
      inStock: true,
      imageSrc: s03,
    },
    {
      id: 4,
      productName: "Luxury Women's Watch",
      category: "Women's Watch",
      price: 299.99,
      inStock: true,
      imageSrc: s04,
    },
    {
      id: 5,
      productName: "Casual T-Shirt",
      category: "T-Shirts",
      price: 19.99,
      inStock: false,
      imageSrc: s05,
    },
    {
      id: 1,
      productName: "Women's Classic Watch",
      category: "Women's Watch",
      price: 199.99,
      inStock: true,
      imageSrc: s01,
    },
    {
      id: 2,
      productName: "Men's Sport Perfume",
      category: "Perfumes for Men",
      price: 49.99,
      inStock: false,
      imageSrc: s02,
    },
    {
      id: 3,
      productName: "Graphic T-Shirt",
      category: "T-Shirts",
      price: 29.99,
      inStock: true,
      imageSrc: s03,
    },
  ];

  return (
    <div className="">
      <CommonHeader />
      <div className="mx-auto py-[3.125rem] lg:py-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7.5 px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem]">
          {/* Left Column: Filters */}
          <div className="lg:col-span-2 text-start fillters">
            <div className="flex flex-col border-b mb-[1rem] xl:mb-[1.5rem]">
              <div className="flex justify-between w-full">
                <h4 className="text-lg font-bold mb-2 uppercase text-[0.875rem] text-[#111111]">
                  Filter By <span>(2)</span>
                </h4>
                <span className="underline text-[0.875rem]">Clear All</span>
              </div>
              <div className="flex flex-wrap gap-[0.5rem] py-[1.5rem]">
                <span className="bg-[#F8F8F8] inline-flex px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
                  In stock <img src={cross} alt="" />
                </span>
                <span className="bg-[#F8F8F8] inline-flex px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
                  Out of Stock <img src={cross} alt="" />
                </span>
                <span className="bg-[#F8F8F8] inline-flex px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
                  Women’s Watch
                  <img src={cross} alt="" />
                </span>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="mb-[1.5rem]">
              <h4 className="text-lg font-bold uppercase text-[0.875rem] text-[#111111] mb-[0.9375rem]">
                Availability <span>(2)</span>
              </h4>
              <div className="flex flex-wrap gap-5 lg:gap-[0.5rem] flex-row lg:flex-col">
                <label className="flex items-center text-[0.875rem]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                    defaultChecked
                  />
                  <span className="ml-2">In Stock</span>
                </label>
                <label className="flex items-center text-[0.875rem]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                    defaultChecked
                  />
                  <span className="ml-2">Out of Stock</span>
                </label>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-[1.5rem]">
              <h4 className="text-lg font-bold mb-2 uppercase text-[0.875rem] text-[#111111]">
                Category <span>(2)</span>
              </h4>
              <div className="flex flex-wrap gap-5 lg:gap-[0.5rem] flex-row lg:flex-col">
                <label className="flex items-center text-[0.875rem]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                    defaultChecked
                  />
                  <span className="ml-2">Women’s Watch</span>
                </label>

                <label className="flex items-center text-[0.875rem]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                    defaultChecked
                  />
                  <span className="ml-2">Men’s Sneaker</span>
                </label>

                <label className="flex items-center text-[0.875rem]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                    defaultChecked
                  />
                  <span className="ml-2">Women’s Sneaker</span>
                </label>

                <label className="flex items-center text-[0.875rem]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                    defaultChecked
                  />
                  <span className="ml-2"> Perfumes for Men’s</span>
                </label>

                <label className="flex items-center text-[0.875rem]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                    defaultChecked
                  />
                  <span className="ml-2">Perfumes for Women’s</span>
                </label>

                <label className="flex items-center text-[0.875rem]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                    defaultChecked
                  />
                  <span className="ml-2">T-Shirts</span>
                </label>

                <label className="flex items-center text-[0.875rem]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                    defaultChecked
                  />
                  <span className="ml-2">Handbags</span>
                </label>

                <label className="flex items-center text-[0.875rem]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                    defaultChecked
                  />
                  <span className="ml-2">Duffle Bags</span>
                </label>

                <label className="flex items-center text-[0.875rem]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                    defaultChecked
                  />
                  <span className="ml-2">Sunglasses</span>
                </label>

                <label className="flex items-center text-[0.875rem]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                    defaultChecked
                  />
                  <span className="ml-2">Caps</span>
                </label>
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <h4 className="text-lg font-bold uppercase text-[0.875rem] text-[#111111] mb-[0.9375rem]">
                Price Range
              </h4>
              <PriceRangeSlider />
            </div>
          </div>

          {/* Right Column: Product Display */}
          <div className="lg:col-span-10 lg:pl-[1.875rem]">
            <div className="flex flex-wrap gap-2 justify-between mb-[1.5rem]">
              <select className="uppercase">
                <option className="uppercase">Short By</option>
                <option value="">In Stock</option>
              </select>
              <span className="text-[#808080] uppercase">
                Showing 1-15 Of 1348 Results.
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-y-[4.375rem]">
              {products.map((product, index) => (
                <CardComponent
                  key={index}
                  productName={product.productName}
                  price={product.price}
                  imageSrc={product.imageSrc}
                />
              ))}
            </div>
            <nav className="mt-[4.375rem]" aria-label="Page navigation">
              <ul class="flex items-center justify-center -space-x-px h-8 text-sm text-[1rem]">
                {/* <li>
                  <a href="#" class="px-3 h-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M20 8L12 16L20 24"
                        stroke="#111111"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </li> */}
                <li>
                  <a href="#" class="px-3 h-8">
                    1
                  </a>
                </li>
                <li>
                  <a href="#" class="px-3 h-8">
                    2
                  </a>
                </li>
                <li>
                  <a href="#" aria-current="page" class="px-3 h-8">
                    3
                  </a>
                </li>
                <li>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="3"
                      viewBox="0 0 11 3"
                      fill="none"
                    >
                      <path
                        d="M1.31475 2.176C0.77075 2.176 0.30675 1.728 0.30675 1.2C0.30675 0.656 0.77075 0.192 1.31475 0.192C1.85875 0.192 2.32275 0.656 2.32275 1.2C2.32275 1.728 1.85875 2.176 1.31475 2.176ZM5.50225 2.176C4.95825 2.176 4.49425 1.728 4.49425 1.2C4.49425 0.656 4.95825 0.192 5.50225 0.192C6.04625 0.192 6.51025 0.656 6.51025 1.2C6.51025 1.728 6.04625 2.176 5.50225 2.176ZM9.68975 2.176C9.14575 2.176 8.68175 1.728 8.68175 1.2C8.68175 0.656 9.14575 0.192 9.68975 0.192C10.2338 0.192 10.6978 0.656 10.6978 1.2C10.6978 1.728 10.2338 2.176 9.68975 2.176Z"
                        fill="#111111"
                      />
                    </svg>
                  </span>
                </li>
                <li>
                  <a href="#" class="px-3 h-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M12 24L20 16L12 8"
                        stroke="#111111"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
