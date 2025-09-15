import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetpasswordwithtoken } from "../redux/slices/authSlice";
import CommonHeader from "../components/CommonHeader";

const initialValues = {
  password: "",
  confirm_password: "",
};

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number, and one special character"
    ),

  confirm_password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .oneOf(
      [Yup.ref("password"), null],
      "New Passwords and Confirm Password must match"
    ),
});

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        token: token,
        password: values.password,
        password_confirmation: values.confirm_password,
      };
      try {
        dispatch(resetpasswordwithtoken({ data: payload, navigate }));
      } catch (error) {
        console.error("Sign up failed:", error);
      }
    },
  });

  // fields config
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
              className="w-full btn rounded-[0.625rem] cursor-pointer py-4 uppercase"
            >
              Update password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
