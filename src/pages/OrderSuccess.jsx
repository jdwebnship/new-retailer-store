import React from "react";
import CommonHeader from "../components/CommonHeader";
import { Link } from "react-router-dom";
import order from "../assets/images/Illustration.svg";
import { useTheme } from "../contexts/ThemeContext";
import { useSelector } from "react-redux";

function OrderSuccess() {
  const { user } = useSelector((state) => state.auth);
  const { theme } = useTheme();

  const orderIds = user?.order_id || [];
  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] py-16 text-center">
        <div className="mx-auto max-w-xl md:p-8">
          <div className="text-3xl mb-[0.9375rem]">
            <img className="mx-auto" src={order} alt="" />
          </div>
          <h1 className="text-2xl font-semibold mb-[0.9375rem]  ">
            Order Placed Successfully
          </h1>
          {/* <h1 className="text-2xl font-semibold mb-[0.9375rem]">
            ⚠️ Oops! Something went wrong.
          </h1> */}
          <div className="text-sm font-medium py-6 flex gap-2 justify-center items-center  ">
            <div className="flex gap-2 flex-wrap justify-center md:max-w-[32.875rem]">
              <div className="py-[0.5rem] whitespace-nowrap">
                Your order ID :
              </div>
              <div className="flex gap-2 flex-wrap  md:max-w-[32.875rem]">
                {orderIds.map((id, index) => (
                  <div
                    key={index}
                    className="px-[0.9375rem] py-[0.5rem] rounded-lg text-sm
                  "
                    style={{
                      backgroundColor: theme.bottomFooterBackgroundColor,
                      height: "fit-content",
                    }}
                  >
                    {id}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="flex flex-col justify-center gap-[0.9375rem] p-6 rounded-2xl max-w-[26.875rem] mx-auto  "
            style={{
              backgroundColor: theme.bottomFooterBackgroundColor,
              height: "fit-content",
            }}
          >
            <p>
              Thank you for your purchase! 🎉 Stay updated with our latest
              products and exclusive promotions.
            </p>
            <Link
              to="/shop"
              className="w-full sm:text-lg font-normal btn bg-black text-white rounded-[0.625rem] sm:py-4 py-3 uppercase disabled:opacity-60 cursor-pointer"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
