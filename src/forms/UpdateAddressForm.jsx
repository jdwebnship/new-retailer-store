import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  postShippingAddress,
  getShippingAddress,
} from "../redux/slices/shippingAddressSlice";
import { countryData } from "../utils/country";
import { UpdateAddressSchema } from "../utils/validationSchema";
import { toast } from "react-toastify";
import LoadingButton from "../components/LoadingButton";
import Loader from "../components/Loader";

const UpdateAddressForm = () => {
  const dispatch = useDispatch();
  const { shippingAddress, loading } = useSelector(
    (state) => state.shippingAddress
  );

  const formik = useFormik({
    initialValues: {
      address: shippingAddress?.address || "",
      pincode: shippingAddress?.pincode || "",
      city: shippingAddress?.city || "",
      state: shippingAddress?.state || "",
    },
    validationSchema: UpdateAddressSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
        await dispatch(
          postShippingAddress({
            address: values.address,
            pincode: values.pincode,
            city: values.city,
            state: values.state,
          })
        ).unwrap();
    },
  });

  useEffect(() => {
    dispatch(getShippingAddress());
  }, []);

  return (
    <div className="w-full text-start">
      <div className="flex justify-between items-center pb-6">
        <h3 className="text-2xl font-bold text-[#111111]">Update Address</h3>
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
                htmlFor="address"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                className="w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]"
                placeholder="Enter your address"
                onChange={(e) => {
                  formik.setFieldValue("address", e.target.value.trimStart());
                }}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500 text-sm absolute">
                  {formik.errors.address}
                </div>
              )}
            </div>

            <div className="mb-6 relative">
              <label
                className="block text-sm mb-2.5 font-bold uppercase"
                htmlFor="pincode"
              >
                Zip Code
              </label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                className="w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]"
                placeholder="Enter pincode"
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  formik.setFieldValue("pincode", numericValue.trimStart());
                }}
                onBlur={formik.handleBlur}
                value={formik.values.pincode}
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <div className="text-red-500 text-sm absolute">
                  {formik.errors.pincode}
                </div>
              )}
            </div>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              {/* State Select */}
              <div className="w-full sm:w-1/2 relative">
                <label
                  className="block text-sm mb-2.5 font-bold uppercase"
                  htmlFor="state"
                >
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  className="w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA] bg-white"
                  onChange={(e) => {
                    const selectedState = e.target.value;
                    formik.setFieldValue("state", selectedState);
                    formik.setFieldValue("city", ""); // ✅ reset city when state changes
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                >
                  <option value="">Select State</option>
                  {Object.keys(countryData[0] || {}).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {formik.touched.state && formik.errors.state && (
                  <div className="text-red-500 text-sm absolute">
                    {formik.errors.state}
                  </div>
                )}
              </div>

              {/* City Select */}
              <div className="w-full sm:w-1/2 sm:pl-3 relative">
                <label
                  className="block text-sm mb-2.5 font-bold uppercase"
                  htmlFor="city"
                >
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  className="w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA] bg-white"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  disabled={!formik.values.state} // ✅ disable until state is selected
                >
                  <option value="">Select a city</option>
                  {formik.values.state &&
                    [...new Set(countryData[0][formik.values.state] || [])] // ✅ remove duplicates
                      .map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                </select>
                {formik.touched.city && formik.errors.city && (
                  <div className="text-red-500 text-sm absolute">
                    {formik.errors.city}
                  </div>
                )}
              </div>
            </div>
            <LoadingButton
              type="submit"
              loading={loading}
              text="Save Address"
              fullWidth={false}
              disabled={!formik.dirty || formik.isSubmitting}
            />
          </>
        )}
      </form>
    </div>
  );
};

export default UpdateAddressForm;
