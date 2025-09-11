import React from "react";
import CommonHeader from "../components/CommonHeader";

function ResetPassword() {
  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] py-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Reset password</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1" htmlFor="password">
                New password
              </label>
              <input
                id="password"
                type="password"
                className="w-full border rounded-md px-3 py-2"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="confirm">
                Confirm password
              </label>
              <input
                id="confirm"
                type="password"
                className="w-full border rounded-md px-3 py-2"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white rounded-md py-2"
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
