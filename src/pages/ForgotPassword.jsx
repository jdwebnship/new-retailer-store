import CommonHeader from "../components/CommonHeader";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/slices/authSlice";
import { forgotPasswordSchema } from "../utils/validationSchema";

const initialValues = {
  email: "",
};

function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      try {
        dispatch(forgotPassword({ email: values.email }));
      } catch (error) {
        console.error("Something went wrong", error);
      }
    },
  });

  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] lg:py-[6.25rem] md:py-[5rem] py-[3.5rem]">
        <div className="max-w-[37.5rem] mx-auto text-left">
          <p className="bg-[#FFF7F2] p-[0.9375rem] rounded-[0.625rem] text-sm font-medium text-[#111111] mb-6 text-center">
            Please enter the email address associated with your account. We'll
            promptly send you a link to reset your password.
          </p>
          <form className="space-y-6 relative" onSubmit={formik.handleSubmit}>
            <div>
              <label
                className="block text-sm mb-2.5 font-bold uppercase"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none form-control"
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
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-600 text-sm text-left absolute">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full btn text-white py-3.5 px-6 rounded-[0.625rem] font-medium text-base hover:bg-opacity-90 transition-all duration-300 flex justify-center items-center cursor-pointer ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Send reset link...
                </>
              ) : (
                "Send reset link"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
