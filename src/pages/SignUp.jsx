// import React, { useState } from "react";
// import CommonHeader from "../components/CommonHeader";
// import { Link } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";

// function SignUp() {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div>
//       <CommonHeader />
//       <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] lg:py-[6.25rem] md:py-[5rem] py-[3.5rem]">
//         <div className="max-w-[37.5rem] mx-auto text-left">
//           <form className="space-y-6">
//             <div className="sm:mb-0 mb-6 flex flex-col sm:flex-row space-x-4">
//               <div className="sm:w-1/2 w-full mb-6">
//                 <label
//                   className="block text-sm mb-2 font-bold uppercase"
//                   htmlFor="first-name"
//                 >
//                   First name
//                 </label>
//                 <input
//                   id="first-name"
//                   type="text"
//                   className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none"
//                   placeholder="Enter your first name"
//                 />
//               </div>
//               <div className="sm:w-1/2 w-full">
//                 <label
//                   className="block text-sm mb-2 font-bold uppercase"
//                   htmlFor="last-name"
//                 >
//                   Last name
//                 </label>
//                 <input
//                   id="last-name"
//                   type="text"
//                   className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none"
//                   placeholder="Enter your last name"
//                 />
//               </div>
//             </div>
//             <div>
//               <label
//                 className="block text-sm mb-2 font-bold uppercase"
//                 htmlFor="email"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none"
//                 placeholder="Enter your email address"
//               />
//             </div>
//             {/* Password Field with Eye Icon */}
//             <div>
//               <label
//                 className="block text-sm mb-2 font-bold uppercase"
//                 htmlFor="password"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none pr-12"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-3 flex items-center text-gray-500"
//                 >
//                   {showPassword ? (
//                     <Eye className="h-5 w-5" />
//                   ) : (
//                     <EyeOff className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//             </div>
//             <div>
//               <label
//                 className="block text-sm mb-2 font-bold uppercase"
//                 htmlFor="number"
//               >
//                 Mobile Number
//               </label>
//               <input
//                 id="number"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 type="text"
//                 className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none"
//                 placeholder="Enter your Mobile Number"
//                 autoComplete="tel"
//               />
//             </div>
//             <div className="flex items-start gap-2">
//               <input
//                 type="checkbox"
//                 className="shrink-0 h-5 w-5 rounded border-gray-300 bg-white text-transparent focus:ring-blue-500 appearance-none custom-checkbox"
//               />
//               <label htmlFor="terms" className="text-sm font-medium select-none">
//                 By creating an account you agree with our Terms of Service,
//                 Privacy Policy,
//               </label>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-black text-white rounded-[0.625rem] cursor-pointer py-4 uppercase"
//             >
//               Sign up
//             </button>
//           </form>
//           <div className="mt-4 text-center">
//             <p className="text-sm uppercase">
//               Already have an account?{" "}
//               <Link to={"/signin"} className="underline hover:text-[#007BFF]">
//                 Sign In
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;

import React, { useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
// import { register } from "../redux/slices/authSlice"; // adjust import if needed

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
  terms: Yup.boolean().oneOf([true], " Please accept the terms & conditions"),
});

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
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
            {/* First & Last Name */}
            <div className="sm:mb-0 mb-6 flex flex-col sm:flex-row space-x-4">
              <div className="sm:w-1/2 w-full mb-6 relative">
                <label className="block text-sm mb-2 font-bold uppercase">
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
                <label className="block text-sm mb-2 font-bold uppercase">
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
            <div className="relative">
              <label className="block text-sm mb-2 font-bold uppercase">
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
                <p className="text-red-500 text-sm absolute">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm mb-2 font-bold uppercase">
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
                <p className="text-red-500 text-sm absolute">{formik.errors.password}</p>
              )}
            </div>

            {/* Mobile */}
            <div className="relative">
              <label className="block text-sm mb-2 font-bold uppercase">
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-500 text-sm absolute">{formik.errors.mobile}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formik.values.terms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shrink-0 h-5 w-5 rounded border-gray-300 bg-white"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium select-none"
              >
                By creating an account you agree with our Terms of Service,
                Privacy Policy,
              </label>
            </div>
            {formik.touched.terms && formik.errors.terms && (
              <p className="text-red-500 text-sm">{formik.errors.terms}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full btn rounded-[0.625rem] cursor-pointer py-4 uppercase"
            >
              Sign up
            </button>
          </form>

          {/* Link */}
          <div className="mt-4 text-center">
            <p className="text-sm uppercase">
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
