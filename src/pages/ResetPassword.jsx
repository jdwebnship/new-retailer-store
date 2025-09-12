import React from "react";
import CommonHeader from "../components/CommonHeader";

function ResetPassword() {
  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] lg:py-[6.25rem] md:py-[5rem] py-[3.5rem]">
        <div className="max-w-[37.5rem] mx-auto text-left">
          <form className="space-y-6">
            <div>
              <label className="block text-sm mb-2 font-bold uppercase" htmlFor="password">
                New password
              </label>
              <input
                id="password"
                type="password"
                className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 font-bold uppercase" htmlFor="confirm">
                Confirm password
              </label>
              <input
                id="confirm"
                type="password"
                className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none"
                placeholder="Enter confirm password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white rounded-[0.625rem] cursor-pointer py-4 uppercase"
            >
              Update password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
