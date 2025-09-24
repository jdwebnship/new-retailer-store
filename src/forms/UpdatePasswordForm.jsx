import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/slices/resetPasswordSlice";
import { UpdatePasswordSchema } from "../utils/validationSchema";
import LoadingButton from "../components/LoadingButton";
import { Eye, EyeOff } from "lucide-react";

const UpdatePasswordForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: UpdatePasswordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const resultAction = await dispatch(resetPassword(values)).unwrap();
        console.log("resultAction", resultAction);
        if (resultAction.success) {
          resetForm();
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message || "Failed to update password";
        console.log(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full text-start">
      <div className="flex justify-between w-full pb-[1.5rem] items-center">
        <h3 className="text-2xl font-bold text-[#111111]">Update Password</h3>
      </div>
      <hr className="opacity-10" />
      <form onSubmit={formik.handleSubmit} className="mt-[1.5rem]">
        <div className="mb-6 relative">
          <label
            className="block text-sm mb-2.5 font-bold uppercase"
            htmlFor="old_password"
          >
            Old Password
          </label>
          <input
            id="old_password"
            name="old_password"
            type={showPassword.old_password ? "text" : "password"}
            className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none pr-10"
            placeholder="Enter old password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.old_password}
          />
          <button
            type="button"
            className="absolute right-3 top-12 text-gray-500 hover:text-gray-700 "
            onClick={() => togglePasswordVisibility("old_password")}
          >
            {showPassword.old_password ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>
          {formik.touched.old_password && formik.errors.old_password && (
            <div className="text-red-500 text-sm absolute">
              {formik.errors.old_password}
            </div>
          )}
        </div>

        <div className="mb-6 relative">
          <label
            className="block text-sm mb-2.5 font-bold uppercase"
            htmlFor="new_password"
          >
            New Password
          </label>
          <input
            id="new_password"
            name="new_password"
            type={showPassword.new_password ? "text" : "password"}
            className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none pr-10"
            placeholder="Enter new password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.new_password}
          />
          <button
            type="button"
            className="absolute right-3 top-12 text-gray-500 hover:text-gray-700"
            onClick={() => togglePasswordVisibility("new_password")}
          >
            {showPassword.new_password ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>
          {formik.touched.new_password && formik.errors.new_password && (
            <div className="text-red-500 text-sm absolute">
              {formik.errors.new_password}
            </div>
          )}
        </div>

        <div className="mb-6 relative">
          <label
            className="block text-sm mb-2.5 font-bold uppercase"
            htmlFor="confirm_password"
          >
            Confirm New Password
          </label>
          <input
            id="confirm_password"
            name="confirm_password"
            type={showPassword.confirm_password ? "text" : "password"}
            className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none pr-10"
            placeholder="Confirm new password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirm_password}
          />
          <button
            type="button"
            className="absolute right-3 top-12 text-gray-500 hover:text-gray-700"
            onClick={() => togglePasswordVisibility("confirm_password")}
          >
            {showPassword.confirm_password ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>
          {formik.touched.confirm_password &&
            formik.errors.confirm_password && (
              <div className="text-red-500 text-sm absolute">
                {formik.errors.confirm_password}
              </div>
            )}
        </div>

        <LoadingButton
          type="submit"
          loading={formik.isSubmitting}
          text="Update Password"
          fullWidth={false}
        />
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
