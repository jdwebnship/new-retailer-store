import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordWithToken } from "../redux/slices/authSlice";
import CommonHeader from "../components/CommonHeader";
import { resetPasswordSchema } from "../utils/validationSchema";
import { toast } from "react-toastify";

const initialValues = {
  password: "",
  confirm_password: "",
};

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/forgot-password");
      toast.error("Invalid or expired reset token");
    }
  }, [token, navigate]);

  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      const payload = {
        token: token,
        password: values.password,
        password_confirmation: values.confirm_password,
      };
      try {
        dispatch(resetPasswordWithToken({ data: payload, navigate }));
      } catch (error) {
        console.error("Sign up failed:", error);
      }
    },
  });

  const passwordFields = [
    {
      name: "password",
      label: "New Password",
      placeholder: "Enter new password",
    },
    {
      name: "confirm_password",
      label: "Confirm Password",
      placeholder: "Enter confirm password",
    },
  ];

  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] lg:py-[6.25rem] md:py-[5rem] py-[3.5rem]">
        <div className="max-w-[37.5rem] mx-auto text-left">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {passwordFields.map((field) => (
              <div className="relative" key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm mb-2.5 font-bold uppercase"
                >
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    id={field.name}
                    name={field.name}
                    type={showPassword[field.name] ? "text" : "password"}
                    className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none pr-12"
                    placeholder={field.placeholder}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        [field.name]: !prev[field.name],
                      }))
                    }
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                  >
                    {showPassword[field.name] ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formik.touched[field.name] && formik.errors[field.name] && (
                  <p className="text-red-500 text-sm absolute">
                    {formik.errors[field.name]}
                  </p>
                )}
              </div>
            ))}

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
                  Update password...
                </>
              ) : (
                "Update password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
