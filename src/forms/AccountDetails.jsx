import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountDetails } from "../redux/slices/accountDetailsSlice";
import { updateAccountDetailsSuccess } from "../redux/slices/authSlice";

import { AccountDetailsSchema } from "../utils/validationSchema";
import LoadingButton from "../components/LoadingButton";
import Loader from "../components/Loader";

const AccountDetails = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.accountDetails);

  const formik = useFormik({
    initialValues: {
      firstname: user?.customer?.firstname || "",
      lastname: user?.customer?.lastname || "",
    },
    validationSchema: AccountDetailsSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const resultAction = await dispatch(
          updateAccountDetails(values)
        ).unwrap();
        if (resultAction.success) {
          dispatch(updateAccountDetailsSuccess(resultAction?.data));
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message || "Failed to update account details";
        console.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full text-start">
      <div className="flex justify-between w-full pb-[1.5rem] items-center">
        <h3 className="text-2xl font-bold text-[#111111]">
          Update Account Details
        </h3>
      </div>
      <hr className="opacity-10" />
      <form onSubmit={formik.handleSubmit} className="mt-6">
        {loading ? (
          <div className="h-80 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="mb-6 relative">
              <label
                className="block text-sm mb-2.5 font-bold uppercase"
                htmlFor="firstname"
              >
                First Name
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                className="w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]"
                placeholder="Enter your first name"
                onChange={(e) => {
                  formik.setFieldValue("firstname", e.target.value.trimStart());
                }}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
              />
              {formik.touched.firstname && formik.errors.firstname && (
                <p className="text-red-500 text-sm absolute">
                  {formik.errors.firstname}
                </p>
              )}
            </div>

            <div className="mb-6 relative">
              <label
                className="block text-sm mb-2.5 font-bold uppercase"
                htmlFor="lastname"
              >
                Last Name
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                className="w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]"
                placeholder="Enter your last name"
                onChange={(e) => {
                  formik.setFieldValue("lastname", e.target.value.trimStart());
                }}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <p className="text-red-500 text-sm absolute">
                  {formik.errors.lastname}
                </p>
              )}
            </div>

            <LoadingButton
              type="submit"
              loading={formik.isSubmitting}
              text="Update Details"
              fullWidth={false}
              disabled={!formik.dirty || formik.isSubmitting}
            />
          </>
        )}
      </form>
    </div>
  );
};

export default AccountDetails;
