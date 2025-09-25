import CommonHeader from "../components/CommonHeader";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/slices/authSlice";
import { forgotPasswordSchema } from "../utils/validationSchema";
import LoadingButton from "../components/LoadingButton";

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
          <p className="bg-[#FFF7F2] p-[0.9375rem] rounded-[0.625rem] text-sm font-medium   mb-6 text-center">
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

            <LoadingButton
              type="submit"
              loading={loading}
              text="Send reset link"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
