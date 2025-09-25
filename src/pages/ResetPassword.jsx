import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordWithToken } from "../redux/slices/authSlice";
import CommonHeader from "../components/CommonHeader";
import { resetPasswordSchema } from "../utils/validationSchema";
import { toast } from "react-toastify";
import LoadingButton from "../components/LoadingButton";

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
            <LoadingButton
              type="submit"
              disabled={loading}
              loading={loading}
              text="Update password"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
