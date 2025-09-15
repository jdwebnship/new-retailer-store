import React, { useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import watch from "../assets/watch.png";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const items = location.state?.items || [];
  const { theme, bottomFooterTextColor } = useTheme();
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();
    navigate("/payment", { state: { items } });
  };

  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <div>
      <CommonHeader />
      {/* Form */}
      <div className="w-full max-w-auto 2xl:max-w-[80rem] mx-auto py-10 lg:py-[6.25rem] px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] 2xl:px-[0]">
        <div className="grid lg:grid-cols-2 gap-8 text-start w-full xl:gap-15">
          <div className="w-full ">
            <form action="">
              <div className="flex flex-col gap-6">
                <div className="w-full">
                  <label
                    className="block text-sm mb-2.5 font-bold uppercase"
                    htmlFor="phonenumber"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phonenumber"
                    type="text"
                    className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                    placeholder="Enter your Phone number"
                  />
                </div>
                <h3 className="text-2xl font-bold">Shipping Details</h3>
                <hr className="opacity-10" />
                <div className="w-full">
                  <label
                    className="block text-sm mb-2.5 font-bold uppercase"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="text"
                    className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className=" flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/2 mb-6 md:mb-0 sm:pr-3">
                    <label
                      className="block text-sm font-bold mb-1 uppercase"
                      htmlFor="fname"
                    >
                      first name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="w-full sm:w-1/2 sm:pl-3">
                    <label
                      className="block text-sm font-bold mb-1 uppercase"
                      htmlFor="lname"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lname"
                      className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    className="block text-sm mb-2.5 font-bold uppercase"
                    htmlFor="email"
                  >
                    Address
                  </label>
                  <input
                    id="email"
                    type="text"
                    className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                    placeholder="Enter your address"
                  />
                </div>
                <div className=" flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/2 mb-6 md:mb-0 sm:pr-3">
                    <label
                      className="block text-sm font-bold mb-1 uppercase"
                      htmlFor="fname"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="fname"
                      className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                      placeholder="Enter your zipcode"
                    />
                  </div>
                  <div className="w-full sm:w-1/2 sm:pl-3">
                    <label
                      className="block text-sm font-bold mb-1 uppercase"
                      htmlFor="lname"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="lname"
                      className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div className=" flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/2 mb-6 md:mb-0 sm:pr-3">
                    <label
                      className="block text-sm font-bold mb-1 uppercase"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                      placeholder="Enter your city"
                    />
                  </div>
                  <div className="w-full sm:w-1/2 sm:pl-3">
                    <label
                      className="block text-sm font-bold mb-1 uppercase"
                      htmlFor="state"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                      placeholder="Enter your state"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div
            className="p-4 md:p-[1.875rem] rounded-[2.125rem]"
            style={{
              backgroundColor: theme.bottomFooterBackgroundColor,
              height: "fit-content",
            }}
          >
            <div className="flex  flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Your Orders</h3>
                <a href="" className="text-sm uppercase underline">
                  Edit Cart
                </a>
              </div>
              <div className="bottom-card">
                <div className="flex sm:gap-[0.82rem] justify-between">
                  <div className="flex gap-[0.5rem] sm:gap-[1.5rem]">
                    <div className="w-[4] md:w-[5rem] h-[4rem] md:h-[5rem] rounded-[0.625rem] overflow-hidden flex-shrink-0">
                      <img
                        src={watch}
                        alt="Longines Heritage Classic Copper-Black watch"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold line-clamp-2 text-sm sm:text-base">
                        Longines Heritage Classic Copper-Black
                      </h3>
                      <div className="flex mt-[0.5rem] items-center gap-4">
                        <span className="leading-none inline-block font-bold text-sm sm:text-base text-[#AAAAAA] border-r border-[#AAAAAA] pr-2 mr-2">
                          Size:{" "}
                          <strong className="font-bold text-[#111111] ml-2">
                            L
                          </strong>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="leading-none text-sm sm:text-base font-bold text-[#111111]">
                            ₹3,298
                          </span>
                          <span className="leading-none line-through text-sm text-[#808080]">
                            ₹19,999
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-sm sm:text-base">× 3</p>
                </div>
              </div>
              <div className="bottom-card">
                <div className="flex sm:gap-[0.82rem] justify-between">
                  <div className="flex gap-[0.5rem] sm:gap-[1.5rem]">
                    <div className="w-[4] md:w-[5rem] h-[4rem] md:h-[5rem] rounded-[0.625rem] overflow-hidden flex-shrink-0">
                      <img
                        src={watch}
                        alt="Longines Heritage Classic Copper-Black watch"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold line-clamp-2 text-sm sm:text-base">
                        Longines Heritage Classic Copper-Black
                      </h3>
                      <div className="flex mt-[0.5rem] items-center gap-4">
                        <span className="leading-none inline-block font-bold text-sm sm:text-base text-[#AAAAAA] border-r border-[#AAAAAA] pr-2 mr-2">
                          Size:{" "}
                          <strong className="font-bold text-[#111111] ml-2">
                            L
                          </strong>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="leading-none text-sm sm:text-base font-bold text-[#111111]">
                            ₹3,298
                          </span>
                          <span className="leading-none line-through text-sm text-[#808080]">
                            ₹19,999
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-sm sm:text-base">× 3</p>
                </div>
              </div>
              <div className="bottom-card">
                <div className="flex sm:gap-[0.82rem] justify-between">
                  <div className="flex gap-[0.5rem] sm:gap-[1.5rem]">
                    <div className="w-[4] md:w-[5rem] h-[4rem] md:h-[5rem] rounded-[0.625rem] overflow-hidden flex-shrink-0">
                      <img
                        src={watch}
                        alt="Longines Heritage Classic Copper-Black watch"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold line-clamp-2 text-sm sm:text-base">
                        Longines Heritage Classic Copper-Black
                      </h3>
                      <div className="flex mt-[0.5rem] items-center gap-4">
                        <span className="leading-none inline-block font-bold text-sm sm:text-base text-[#AAAAAA] border-r border-[#AAAAAA] pr-2 mr-2">
                          Size:{" "}
                          <strong className="font-bold text-[#111111] ml-2">
                            L
                          </strong>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="leading-none text-sm sm:text-base font-bold text-[#111111]">
                            ₹3,298
                          </span>
                          <span className="leading-none line-through text-sm text-[#808080]">
                            ₹19,999
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-sm sm:text-base">× 3</p>
                </div>
              </div>
            </div>
            <div className="relative flex w-full border-2 border-blue-[#111111] rounded-[0.625rem] overflow-hidden my-6">
              <input
                type="text"
                placeholder="Coupon Code"
                className="flex-1 px-4 py-4 text-gray-700 placeholder-gray-[#808080] bg-transparent border-none outline-none"
              />
              <button className="px-8 lg:px-14 py-2 bg-black text-white hover:bg-gray-800 transition-colors">
                Apply
              </button>
            </div>

            {/* Payment Method */}
            <div className="my-6">
              <h3 className="text-2xl font-bold mb-4">Payment Method</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <label
                  className={`flex items-center gap-3 p-2 xl:p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === "cod"
                      ? "border-black shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                      : "border-[#AAAAAA] hover:border-black/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="peer hidden"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full border mr-1 ${
                      paymentMethod === "cod"
                        ? "border-black"
                        : "border-[#AAAAAA]"
                    }`}
                  >
                    <span
                      className={`block w-2.5 h-2.5 rounded-full ${
                        paymentMethod === "cod" ? "bg-black" : "bg-transparent"
                      }`}
                    />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-2 xl:p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === "prepaid"
                      ? "border-black shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                      : "border-[#AAAAAA] hover:border-black/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="peer hidden"
                    checked={paymentMethod === "prepaid"}
                    onChange={() => setPaymentMethod("prepaid")}
                  />
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full border mr-1 ${
                      paymentMethod === "prepaid"
                        ? "border-black"
                        : "border-[#AAAAAA]"
                    }`}
                  >
                    <span
                      className={`block w-2.5 h-2.5 rounded-full ${
                        paymentMethod === "prepaid"
                          ? "bg-black"
                          : "bg-transparent"
                      }`}
                    />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-semibold">Prepaid</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="sm:text-lg font-medium">Subtotal</span>
                <span className="sm:text-lg font-medium">
                  <span>₹</span> 29,682
                </span>
              </div>
              <div className="flex justify-between">
                <span className="sm:text-lg font-medium">Discount</span>
                <span className="sm:text-lg font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="sm:text-lg font-medium">Shipping</span>
                <span className="sm:text-lg font-medium">Free</span>
              </div>
              <div className="border-t border-[#11111126] pt-5 mt-4 flex justify-between font-medium">
                <span className="md:text-2xl text-lg font-medium">Total</span>
                <span className="md:text-2xl text-lg font-medium">2</span>
              </div>
            </div>
            <button
              className="mt-6 w-full sm:text-lg font-normal bg-black text-white rounded-[0.625rem] py-4 uppercase disabled:opacity-60"
              disabled={!paymentMethod}
            >
              Place Order
            </button>
            <div className="text-center mt-6">
              <Link
                className="sm:text-lg uppercase font-normal underline hover:text-[#007BFF]"
                to={"/shop"}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
