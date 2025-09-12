import React, { useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules"; // Import Mousewheel and Navigation modules
import "swiper/css"; // Core Swiper styles
import "swiper/css/mousewheel"; // Mousewheel styles
import "swiper/css/navigation"; // Navigation styles

function ProductDetail() {
  // Dummy product data with unique image URLs
  const product = {
    name: "Women's Classic Watch",
    price: 199.99,
    description:
      "A timeless piece crafted with elegance and precision, perfect for any occasion.",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://picsum.photos/600/400?random=1",
      "https://picsum.photos/600/400?random=2",
      "https://picsum.photos/600/400?random=3",
      "https://picsum.photos/600/400?random=4",
      "https://picsum.photos/600/400?random=5",
      "https://picsum.photos/600/400?random=6",
      "https://picsum.photos/600/400?random=7",
      "https://picsum.photos/600/400?random=8",
    ],
  };

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  // State for quantity
  const [quantity, setQuantity] = useState(1);

  // Handle quantity increment and decrement
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="">
      <CommonHeader />
      <div className="container mx-auto px-4 py-25">
        <div className="flex flex-col lg:flex-row gap-24.5">
          {/* Left Column: Vertical Swiper */}

          {/* Center Column: Main Product Image */}
          <div className="w-full lg:w-2/4 flex justify-center">
            <div className="w-full lg:w-1/6 flex justify-center">
              <div className="relative flex flex-col items-center">
                {/* Previous Arrow (Above Swiper) */}
                <div className="swiper-button-prev mb-2 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-900 transition shadow-md">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </div>
                <Swiper
                  direction="vertical"
                  slidesPerView={4}
                  spaceBetween={8}
                  mousewheel={true} // Enable mousewheel scrolling
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }} // Enable navigation arrows
                  modules={[Mousewheel, Navigation]} // Register Mousewheel and Navigation modules
                  className="h-[400px] w-24"
                >
                  {product.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-full h-full object-cover rounded-md cursor-pointer border-2 ${
                          selectedImage === image
                            ? "border-blue-500"
                            : "border-transparent"
                        }`}
                        onClick={() => setSelectedImage(image)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* Next Arrow (Below Swiper) */}
                <div className="swiper-button-next mt-2 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-900 transition shadow-md">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <img
                src={selectedImage}
                alt="Main Product"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="w-full lg:w-2/4 text-left">
            <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
            <p className="text-xl  mb-4">${product.price.toFixed(2)}</p>
            <p className="mb-4">{product.description}</p>

            {/* Available Sizes */}
            <div className="mb-6">
              {/* <h4 className="text-lg font-medium mb-2 uppercase">Available Sizes</h4> */}
              <div className="flex gap-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              {/* <h4 className="text font-medium mb-2 uppercase">Quantity</h4> */}
              <div className="inline-flex items-center border border-gray-300 rounded-md py-2">
                <button
                  onClick={handleDecrement}
                  className="w-10 h-full text-gray-800 rounded-md flex items-center justify-center hover:bg-gray-300 transition"
                  disabled={quantity === 1}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 12H6"
                    />
                  </svg>
                </button>
                <span className="w-12 text-center text-lg font-medium">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-10 h-full text-gray-800 rounded-md flex items-center justify-center hover:bg-gray-300 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-black text-white py-2 rounded-md hover:bg-blue-700 transition">
                Add to Cart
              </button>
              <button className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
