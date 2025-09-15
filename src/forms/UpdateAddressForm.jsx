import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  postShippingAddress,
  getShippingAddress,
  clearShippingAddress,
} from "../redux/slices/shippingAddressSlice"; // Adjust path
import { countryData } from "../utils/country";

const UpdateAddressForm = () => {
  const dispatch = useDispatch();
  const { shippingAddress, loading, error } = useSelector(
    (state) => state.shippingAddress
  );

  useEffect(() => {
    dispatch(getShippingAddress());
  }, []);

  // Set initial values based on fetched shipping address
  const initialValues = {
    address: shippingAddress?.address || "",
    pincode: shippingAddress?.pincode || "",
    city: shippingAddress?.city || "",
    state: shippingAddress?.state || "",
  };

  const validationSchema = Yup.object({
    address: Yup.string().required("Address is required"),
    pincode: Yup.string()
      .matches(/^\d+$/, "Pincode must be numeric")
      .required("Pincode is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const resultAction = await dispatch(
        postShippingAddress({
          address: values.address,
          pincode: values.pincode,
          city: values.city,
          state: values.state,
        })
      );
      if (postShippingAddress.fulfilled.match(resultAction)) {
        resetForm();
        dispatch(clearShippingAddress());
        dispatch(getShippingAddress());
      }
    } catch (err) {
      console.log("err", err);
      // Error is handled by toast in the slice
    }
  };

  return (
    <div className="w-full text-start">
      <div className="flex justify-between w-full pb-[1.5rem] items-center">
        <h3 className="text-2xl font-bold">Update Address</h3>
      </div>
      <hr className="opacity-10" />
      <div className="mt-[1.5rem]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, setFieldValue, values, errors, touched }) => (
            <Form>
              <div className="mb-6">
                <label
                  className="block text-sm mb-2.5 font-bold uppercase"
                  htmlFor="address"
                >
                  Address
                </label>
                <Field
                  id="address"
                  name="address"
                  type="text"
                  className={`w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA] }`}
                  placeholder="Enter your address"
                />
                <ErrorMessage
                  name="address"
                  component="p"
                  className="text-red-500 text-sm absolute"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm mb-2.5 font-bold uppercase"
                  htmlFor="pincode"
                >
                  Your Pincode
                </label>
                <Field
                  id="pincode"
                  name="pincode"
                  type="text"
                  className={`w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA] }`}
                  placeholder="Enter your pincode"
                />
                <ErrorMessage
                  name="pincode"
                  component="p"
                  className="text-red-500 text-sm absolute"
                />
              </div>
              <div className="mb-6 flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 mb-6 md:mb-0 sm:pr-3">
                  <label
                    className="block text-sm mb-2.5 font-bold uppercase"
                    htmlFor="state"
                  >
                    STATE
                  </label>
                  <Field
                    as="select"
                    id="state"
                    name="state"
                    className={`w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA] }`}
                    onChange={(e) => {
                      setFieldValue("state", e.target.value);
                      setFieldValue("city", ""); // Reset city when state changes
                    }}
                  >
                    <option value="">Select a state</option>
                    {Object.keys(countryData[0]).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="state"
                    component="p"
                    className="text-red-500 text-sm absolute"
                  />
                </div>
                <div className="w-full sm:w-1/2 sm:pl-3">
                  <label
                    className="block text-sm mb-2.5 font-bold uppercase"
                    htmlFor="city"
                  >
                    CITY
                  </label>
                  <Field
                    as="select"
                    id="city"
                    name="city"
                    className={`w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA] ${
                      !values.state ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!values.state}
                  >
                    <option value="">Select a city</option>
                    {values.state &&
                      countryData[0][values.state]?.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage
                    name="city"
                    component="p"
                    className="text-red-500 text-sm absolute"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center disabled:opacity-50"
                disabled={loading || isSubmitting}
              >
                {loading || isSubmitting ? "Saving..." : "Save Address"}
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateAddressForm;
