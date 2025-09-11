import React from "react";
import CommonHeader from "../components/CommonHeader";
import { Link } from "react-router-dom";

function OrderFailure() {
  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] py-16 text-center">
        <div className="mx-auto max-w-xl border rounded-md p-8">
          <div className="text-3xl mb-2">❌</div>
          <h1 className="text-2xl font-semibold mb-2">
            There was a problem processing your order.
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Possible reasons include payment declined or a temporary server
            issue.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/payment"
              className="bg-black text-white rounded-md py-2 px-4"
            >
              Retry Payment
            </Link>
            <Link to="/shop" className="border rounded-md py-2 px-4">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderFailure;
