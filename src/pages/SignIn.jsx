import CommonHeader from "../components/CommonHeader";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../slice/authSlice";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        user_token: import.meta.env.VITE_API_KEY,
        email: values.email,
        password: values.password,
      };
      try {
        const resultAction = await dispatch(login(payload));
        if (resultAction.payload?.success) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }

      // Handle sign-in here
      console.log("Signing in with:", values);
      // Example: call your API here
    },
  });

  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] py-10">
        <div className="max-w-md mx-auto">
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label
                className="block text-sm mb-1 text-left form-label"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border rounded-md px-3 py-2 form-control"
                placeholder="you@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-600 text-sm mt-1 text-left">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>
            <div className="form-group">
              <label
                className="block text-sm mb-1 text-left form-label"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full border rounded-md px-3 py-2 form-control"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-600 text-sm mt-1 text-left">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>
            <div className="mt-4 text-left">
              <Link
                to={"/forgot-password"}
                className="text-sm hover:underline site-link"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white rounded-md py-2"
            >
              Sign in
            </button>
          </form>
          <div className="mt-2 text-left">
            <p className="text-sm text-uppercase">
              Don't have an account?{" "}
              <Link to={"/signup"} className="hover:underline site-link">
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
