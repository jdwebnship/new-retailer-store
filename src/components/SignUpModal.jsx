import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "../redux/slices/authSlice";
import modalImg from "../assets/images/modal.jpg";
import { useNavigate } from "react-router-dom";

// Initial values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  mobile: "",
  terms: false,
};

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number, and one special character"
    ),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  terms: Yup.boolean().oneOf([true], "Please accept the terms & conditions"),
});

const SignUpModal = ({ isOpen, onClose, phoneNumber }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      mobile: phoneNumber || "",
    },
    validationSchema,
    enableReinitialize: true,
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
        dispatch(registerUser({ data: payload, onSuccess: onClose }));
        navigate("/checkout");
      } catch (error) {
        console.error("Sign up failed:", error);
      }
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-[rgba(0,0,0,0.7)] bg-opacity-50 transition-opacity duration-300 overflow-hidden" />
      <div className="fixed inset-0 flex items-center justify-center p-5 lg:p-0">
        <DialogPanel className="relative bg-white rounded-[1.5rem] shadow-lg w-full max-w-[67.5rem] mx-5 lg:mx-0 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Side: Background Image */}
          <div className="w-full lg:w-1/2 bg-cover bg-center">
            <img
              src={modalImg}
              className="h-full w-full object-cover"
              alt="Sign up"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1504672281656-e3e7b6e4a328";
              }}
            />
          </div>

          {/* Right Side: Form Content */}
          <div className="w-full lg:w-1/2 px-[1.5rem] lg:px-[3rem] py-[1.2rem] lg:py-[2rem] flex flex-col justify-start text-left">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                stroke="#101828"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M24 8L8 24M8 8L24 24" />
              </svg>
            </button>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <p className="mb-1 text-base lg:text-2xl font-bold">
                  Create your account
                </p>
                <p className="mb-3 text-sm lg:text-lg">
                  Sign up to get started with your account
                </p>
              </div>
              {/* First & Last Name */}
              <div className="sm:mb-0 mb-3 flex flex-col sm:flex-row space-x-4">
                <div className="sm:w-1/2 w-full mb-3 relative">
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
                    onChange={formik.handleChange}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-500 text-sm absolute">
                      {formik.errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="sm:mb-0 mb-3 flex flex-col sm:flex-row space-x-4">
                <div className="sm:w-1/2 w-full mb-3 relative">
                  <label className="block text-sm mb-2.5 font-bold uppercase">
                    Email
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
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm absolute">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="sm:w-1/2 w-full relative">
                  {/* Password */}

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
              </div>

              {/* Mobile */}
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
                  placeholder="Enter your mobile number"
                  value={formik.values.mobile}
                  onChange={(e) => {
                    // Only allow numbers
                    const value = e.target.value.replace(/\D/g, "");
                    formik.setFieldValue("mobile", value);
                  }}
                  onBlur={formik.handleBlur}
                  disabled={!!phoneNumber}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <p className="text-red-500 text-sm absolute">
                    {formik.errors.mobile}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-2 mt-4">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="shrink-0 h-4.5 w-4.5 rounded border-gray-300 bg-white mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium select-none"
                >
                  By creating an account you agree with our{" "}
                  <a href="#" className="underline hover:text-blue-800">
                    Terms of Service
                  </a>
                  ,{" "}
                  <a href="#" className="underline hover:text-blue-800">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {formik.touched.terms && formik.errors.terms && (
                <p className="text-red-500 text-sm">{formik.errors.terms}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white rounded-[0.625rem] py-4 px-6 uppercase font-medium mt-6 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default SignUpModal;
