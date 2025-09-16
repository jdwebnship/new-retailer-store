import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { updateAccountDetails } from "../redux/slices/accountDetailsSlice";
import { updateAccountDetailsSuccess } from "../redux/slices/authSlice";

const validationSchema = Yup.object({
  firstname: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),
  lastname: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),
});

const AccountDetails = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.accountDetails);
  const { user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      firstname: user?.customer?.firstname || "",
      lastname: user?.customer?.lastname || "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const resultAction = await dispatch(updateAccountDetails(values));
        if (updateAccountDetails.fulfilled.match(resultAction)) {
          dispatch(updateAccountDetailsSuccess(resultAction?.payload?.data));
        }
      } catch (err) {
        // Error is handled in the slice via toast
      }
    },
  });

  return (
    <div className="w-full text-start">
      <div className="flex justify-between w-full pb-[1.5rem] items-center">
        <h3 className="text-2xl font-bold">Update Account Details</h3>
      </div>
      <hr className="opacity-10" />
      <div className="mt-[1.5rem]">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-sm mb-2.5 font-bold uppercase"
              htmlFor="fname"
            >
              First name
            </label>
            <input
              id="fname"
              type="text"
              className="w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]"
              placeholder="Enter your first name"
              {...formik.getFieldProps("firstname")}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <p className="text-red-500 text-sm absolute">
                {formik.errors.firstname}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-sm mb-2.5 font-bold uppercase"
              htmlFor="lname"
            >
              Last Name
            </label>
            <input
              id="lname"
              type="text"
              className="w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]"
              placeholder="Enter your last name"
              {...formik.getFieldProps("lastname")}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <p className="text-red-500 text-sm absolute">
                {formik.errors.lastname}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center bg-blue-500 text-white hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDetails;
