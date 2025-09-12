import CommonHeader from "../components/CommonHeader";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
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
});

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        user_token: import.meta.env.VITE_API_KEY,
        email: values.email,
        password: values.password,
      };
      try {
        dispatch(login({ credentials: payload, navigate }));
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] lg:py-[6.25rem] md:py-[5rem] py-[3.5rem]">
        <div className="max-w-[37.5rem] mx-auto text-left">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="form-group relative">
              <label
                className="block text-sm mb-2 font-bold uppercase"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none form-control"
                placeholder="Enter your email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-600 text-sm text-left absolute">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>
            <div>
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
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>
            <div className="mt-4 text-right">
              <Link
                to={"/forgot-password"}
                className="text-sm underline hover:text-[#007BFF] site-link uppercase transition-all duration-300"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full btn rounded-[0.625rem] cursor-pointer py-4 uppercase"
            >
              Sign in
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm uppercase">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="underline hover:text-[#007BFF] site-link transition-all duration-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
