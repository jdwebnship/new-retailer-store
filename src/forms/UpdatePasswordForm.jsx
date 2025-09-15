import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  resetPassword,
  clearResetPassword,
} from "../redux/slices/resetPasswordSlice"; // Adjust path

const UpdatePasswordForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.resetPassword);

  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    old_password: Yup.string()
      .min(6, "Old password must be at least 6 characters")
      .required("Old password is required"),
    new_password: Yup.string()
      .min(8, "New password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("New password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const resultAction = await dispatch(resetPassword(values));
      if (resetPassword.fulfilled.match(resultAction)) {
        resetForm();
        dispatch(clearResetPassword());
      }
    } catch (err) {
      // Error is handled by toast in the slice
    }
  };

  return (
    <div className="w-full text-start">
      <div className="flex justify-between w-full pb-[1.5rem] items-center">
        <h3 className="text-2xl font-bold">Update Password</h3>
      </div>
      <hr className="opacity-10" />
      <div className="mt-[1.5rem]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <label
                  className="block text-sm mb-2.5 font-bold uppercase"
                  htmlFor="oldpass"
                >
                  Old Password
                </label>
                <Field
                  id="oldpass"
                  name="old_password"
                  type="password"
                  className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                  placeholder="Enter old password"
                />
                <ErrorMessage
                  name="old_password"
                  component="p"
                  className="text-red-500 text-sm absolute"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm mb-2.5 font-bold uppercase"
                  htmlFor="newpass"
                >
                  New Password
                </label>
                <Field
                  id="newpass"
                  name="new_password"
                  type="password"
                  className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                  placeholder="Enter new password"
                />
                <ErrorMessage
                  name="new_password"
                  component="p"
                  className="text-red-500 text-sm absolute"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm mb-2.5 font-bold uppercase"
                  htmlFor="conpass"
                >
                  Confirm Password
                </label>
                <Field
                  id="conpass"
                  name="confirm_password"
                  type="password"
                  className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                  placeholder="Enter confirm password"
                />
                <ErrorMessage
                  name="confirm_password"
                  component="p"
                  className="text-red-500 text-sm absolute"
                />
              </div>
              <button
                type="submit"
                className="inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center disabled:opacity-50"
                disabled={loading || isSubmitting}
              >
                {loading || isSubmitting ? "Saving..." : "Save Password"}
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
