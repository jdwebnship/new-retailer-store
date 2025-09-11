import React from "react";
import CommonHeader from "../components/CommonHeader";

function ForgotPassword() {
  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] py-10">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-gray-600 mb-4">
            Enter your email to receive a reset link.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border rounded-md px-3 py-2"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white rounded-md py-2"
            >
              Send reset link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
