import React from "react";
import CommonHeader from "../components/CommonHeader";

function ForgotPassword() {
  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] lg:py-[6.25rem] md:py-[5rem] py-[3.5rem]">
        <div className="max-w-[37.5rem] mx-auto text-left">
          <p className="bg-[#FFF7F2] p-4 rounded-[0.625rem] text-sm font-medium text-[#111111] mb-6 text-center">
          Please enter the email address associated with your account. We'll promptly send you a link to reset your password.
          </p>
          <form className="space-y-6">
            <div>
              <label className="block text-sm mb-2 font-bold uppercase" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none"
                placeholder="Enter your email address"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white rounded-[0.625rem] cursor-pointer py-4 uppercase"
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
