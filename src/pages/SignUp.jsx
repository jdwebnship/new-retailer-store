import React from "react";
import CommonHeader from "../components/CommonHeader";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] py-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Create your account</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border rounded-md px-3 py-2"
                placeholder="John Doe"
              />
            </div>
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
            <div>
              <label className="block text-sm mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full border rounded-md px-3 py-2"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white rounded-md py-2"
            >
              Sign up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to={"/signin"} className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
