import React, { useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { SignupSchema } from "../utils/validationSchema";
import LoadingButton from "../components/LoadingButton";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  mobile: "",
  terms: false,
};

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues,
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      const payload = {
        user_token: import.meta.env.VITE_API_KEY,
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        password: values.password,
        phone_number: values.mobile,
      };
      try {
        dispatch(registerUser({ data: payload, navigate }));
      } catch (error) {
        console.error("Sign up failed:", error);
      }
    },
  });

  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] lg:py-[6.25rem] md:py-[5rem] py-[3.5rem]">
        <div className="max-w-[37.5rem] mx-auto text-left">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="sm:mb-0 mb-6 flex flex-col sm:flex-row space-x-6">
              <div className="sm:w-1/2 w-full mb-6 relative">
                <label className="block text-sm mb-2.5 font-bold uppercase">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none"
                  placeholder="Enter your first name"
                  value={formik.values.firstName}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "firstName",
                      e.target.value.trimStart()
                    );
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="text-red-500 text-sm absolute">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>
              <div className="sm:w-1/2 w-full relative">
                <label className="block text-sm mb-2.5 font-bold uppercase">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none"
                  placeholder="Enter your last name"
                  value={formik.values.lastName}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "lastName",
                      e.target.value.trimStart()
                    );
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="text-red-500 text-sm absolute">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm mb-2.5 font-bold uppercase">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none"
                placeholder="Enter your email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onKeyDown={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm absolute">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm mb-2.5 font-bold uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none pr-12"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm absolute">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm mb-2.5 font-bold uppercase">
                Mobile Number
              </label>
              <input
                id="mobile"
                name="mobile"
                inputMode="numeric"
                pattern="[0-9]*"
                type="text"
                className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none"
                placeholder="Enter your Mobile Number"
                autoComplete="tel"
                value={formik.values.mobile}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  formik.setFieldValue("mobile", numericValue.trimStart());
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-500 text-sm absolute">
                  {formik.errors.mobile}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 relative">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formik.values.terms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shrink-0 h-4.5 w-4.5 rounded border-gray-300 bg-white"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium select-none text-[#111111]"
              >
                By creating an account you agree with our{" "}
                <Link
                  className="hover:!text-[#007BFF] transition-all duration-300"
                  to="/terms-use"
                >
                  Terms of Service,
                </Link>
                <Link
                  className="hover:!text-[#007BFF] transition-all duration-300"
                  to="/privacy-policy"
                >
                  Privacy Policy.
                </Link>
              </label>
              {formik.touched.terms && formik.errors.terms && (
                <p className="text-red-500 text-sm absolute -bottom-[1.25rem]">
                  {formik.errors.terms}
                </p>
              )}
            </div>

            <LoadingButton type="submit" loading={loading} text="Sign up" />
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm uppercase text-[#111111]">
              Already have an account?{" "}
              <Link
                to={"/signin"}
                className="underline hover:text-[#007BFF] transition-all duration-300"
              >
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
