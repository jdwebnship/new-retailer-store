import React from "react";
import CommonHeader from "../components/CommonHeader";
import { Link, useLocation } from "react-router-dom";
import order from "../assets/images/fail.svg";
import { useTheme } from "../contexts/ThemeContext";

function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId ?? "#ORD-000000";
  const { theme, bottomFooterTextColor } = useTheme();

  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] py-16 text-center">
        <div className="mx-auto max-w-xl p-8">
          <div className="text-3xl mb-2">
            <img className="mx-auto" src={order} alt="" />
          </div>
          {/* <h1 className="text-2xl font-semibold mb-[0.9375rem]">
            Order Placed Successfully
          </h1> */}
          <h1 className="text-2xl font-semibold mb-[0.9375rem]">
            ⚠️ Oops! Something went wrong.
          </h1>
          {/* <p className="text-sm font-medium py-6">
            Reference ID:{" "}
            <span
              className="px-[0.9375rem] py-[0.5rem] rounded-lg"
              style={{
                backgroundColor: theme.bottomFooterBackgroundColor,
                height: "fit-content",
              }}
            >
              {orderId}
            </span>
          </p> */}
          <div
            className="flex flex-col justify-center gap-3 p-6 rounded-2xl max-w-[26.875rem] mx-auto"
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
              to="/my-account"
              className="mt-6 w-full sm:text-lg font-normal bg-black text-white rounded-[0.625rem] sm:py-4 py-3 uppercase disabled:opacity-60 cursor-pointer"
            >
              Go to Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
