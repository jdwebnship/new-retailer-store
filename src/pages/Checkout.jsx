import React, { useEffect, useMemo, useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import watch from "../assets/watch.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/slices/cartSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  applyDiscount,
  clearDiscount,
  performCheckout,
} from "../redux/slices/checkoutSlice";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { discount, discountLoading, checkoutLoading } = useSelector((state) => state.checkout);

  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  const userData = user?.customer || {};

  const discountValue = discount && parseFloat(discount.discount);
  const discountProductIds = discount?.product_id || [];

  const updatedCartItems = cartItems.map((item) => {
    const itemId = item.product_id || item.retailer_product_id;

    if (discount && discountProductIds.includes(itemId)) {
      return {
        ...item,
        discountedPrice: parseFloat(item.final_price) - discountValue,
        discountApplied: true,
      };
    }

    return {
      ...item,
      discountedPrice: item.final_price,
      discountApplied: false,
    };
  });

  const couponForm = useFormik({
    initialValues: { coupon_code: "" },
    onSubmit: (values, { setFieldError }) => {
      dispatch(
        applyDiscount({
          payload: {
            coupon_code: values?.coupon_code.trim(),
            phone_number: userData.phone_number,
          },
          setFieldError,
        })
      );
    },
  });

  useEffect(() => {
    if (user?.isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, user?.isAuthenticated]);

  const subtotal = updatedCartItems?.reduce(
    (acc, item) => acc + item.final_price * item.quantity,
    0
  );
  const total = subtotal;
  const discTotal = Number(discount?.discount)
    ? total - Number(discount?.discount) * discount?.product_id?.length
    : total;

  const priceDetails = [
    { label: "Subtotal", value: subtotal },
    {
      label: "Discount",
      value: Number(discount?.discount)
        ? Number(discount?.discount) * discount?.product_id?.length
        : 0,
      display: discount ? true : false,
    },
    { label: "Shipping", value: 0, isFree: true },
  ];

  const formik = useFormik({
    initialValues: {
      phone_number: userData.phone_number || "",
      email: userData.email || "",
      firstname: userData.firstname || "",
      lastname: userData.lastname || "",
      address: userData.address || "",
      pincode: userData.pincode || "",
      alt_phone_number: userData.alt_phone_number || "",
      city: userData.city || "",
      state: userData.state || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      address: Yup.string().required("Address is required"),
      pincode: Yup.string()
        .matches(/^[0-9]{6}$/, "Must be a valid 6-digit pincode")
        .required("Pincode is required"),
      alt_phone_number: Yup.string()
        .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number")
        .required("Alt Phone number is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
    }),
    onSubmit: (values) => {
      const products = updatedCartItems.map((item) => {
        const base = { quantity: item.quantity || 1 };
        return item.retailer_id
          ? {
              ...base,
              retailer_id: item.retailer_id,
              retailer_product_id:
                item?.product_id || item?.retailer_product_id,
              final_amount: item?.discountApplied
                ? item?.discountedPrice
                : item?.final_price,
              product_variation:
                item?.selected_variant?.product_variation || null,
              quantity: item?.quantity || null,
              coupon_id: item?.discountApplied ? discount?.id : undefined,
            }
          : {
              ...base,
              wholesaler_id: item.wholesaler_id,
              product_id: item?.id || item?.product_id,
              final_amount: item?.discountApplied
                ? item?.discountedPrice
                : item?.final_price,
              product_variation:
                item?.selected_variant?.product_variation || null,
              quantity: item?.quantity || null,
              coupon_id: item?.discountApplied ? discount?.id : undefined,
            };
      });
      const payload = {
        ...values,
        products,
        phone_number: values?.phone_number || userData?.phone_number,
        user_token: import.meta.env.VITE_API_KEY,
        payment_method: paymentMethod,
      };
      dispatch(performCheckout({payload, navigate}));
    },
    enableReinitialize: true,
  });

  return (
    <div>
      <CommonHeader />
      {/* Form */}
      <div className="w-full max-w-auto 2xl:max-w-[80rem] mx-auto py-10 lg:py-[6.25rem] px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] 2xl:px-[0]">
        <div className="grid lg:grid-cols-2 gap-8 text-start w-full xl:gap-15">
          <div className="w-full ">
            <form id="checkout-form">
              <div className="flex flex-col gap-6">
                <div className="w-full">
                  <label
                    className="block text-sm mb-2.5 font-bold uppercase"
                    htmlFor="phonenumber"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phonenumber"
                    type="text"
                    className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                    placeholder="Enter your Phone number"
                    value={userData.phone_number || ""}
                    readOnly
                  />
                </div>
                <h3 className="text-2xl font-bold">Shipping Details</h3>
                <hr className="opacity-10" />
                {/* Email */}
                <div className="relative">
                  <label className="block text-sm mb-2.5 font-bold uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm absolute">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                {/* First & Last Name */}
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/2 mb-6 md:mb-0 sm:pr-3">
                    <label className="block text-sm font-bold mb-1 uppercase relative">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                    />
                    {formik.touched.firstname && formik.errors.firstname && (
                      <p className="text-red-500 text-sm absolute">
                        {formik.errors.firstname}
                      </p>
                    )}
                  </div>
                  <div className="w-full sm:w-1/2 sm:pl-3 relative">
                    <label className="block text-sm font-bold mb-1 uppercase">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                    />
                    {formik.touched.lastname && formik.errors.lastname && (
                      <p className="text-red-500 text-sm absolute">
                        {formik.errors.lastname}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="relative">
                  <label className="block text-sm mb-2.5 font-bold uppercase">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="text-red-500 text-sm absolute">
                      {formik.errors.address}
                    </p>
                  )}
                </div>

                {/* Zip & Alt Phone */}
                <div className="flex flex-col sm:flex-row relative">
                  <div className="w-full sm:w-1/2 mb-6 md:mb-0 sm:pr-3">
                    <label className="block text-sm font-bold mb-1 uppercase">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formik.values.pincode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                    />
                    {formik.touched.pincode && formik.errors.pincode && (
                      <p className="text-red-500 text-sm absolute">
                        {formik.errors.pincode}
                      </p>
                    )}
                  </div>
                  <div className="w-full sm:w-1/2 sm:pl-3 relative">
                    <label className="block text-sm font-bold mb-1 uppercase">
                      Alternate Phone
                    </label>
                    <input
                      type="text"
                      name="alt_phone_number"
                      value={formik.values.alt_phone_number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                    />
                    {formik.touched.alt_phone_number &&
                      formik.errors.alt_phone_number && (
                        <p className="text-red-500 text-sm absolute">
                          {formik.errors.alt_phone_number}
                        </p>
                      )}
                  </div>
                </div>

                {/* City & State */}
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/2 mb-6 md:mb-0 sm:pr-3 relative">
                    <label className="block text-sm font-bold mb-1 uppercase">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                    />
                    {formik.touched.city && formik.errors.city && (
                      <p className="text-red-500 text-sm absolute">
                        {formik.errors.city}
                      </p>
                    )}
                  </div>
                  <div className="w-full sm:w-1/2 sm:pl-3 relative">
                    <label className="block text-sm font-bold mb-1 uppercase">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full border border-[#AAAAAA] rounded-lg p-[0.82rem] focus:outline-none"
                    />
                    {formik.touched.state && formik.errors.state && (
                      <p className="text-red-500 text-sm absolute">
                        {formik.errors.state}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div
            className="p-4 md:p-[1.875rem] rounded-[2.125rem]"
            style={{
              backgroundColor: theme.bottomFooterBackgroundColor,
              height: "fit-content",
            }}
          >
            <div className="flex  flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Your Orders</h3>
                <Link to="/cart" className="text-sm uppercase underline">
                  Edit Cart
                </Link>
              </div>
              {updatedCartItems?.map((item) => {
                const firstImage = item.product_images?.split(",")[0] || watch;
                return (
                  <div key={item.cart_id} className="bottom-card">
                    <div className="flex sm:gap-[0.82rem] justify-between">
                      <div className="flex gap-[0.5rem] sm:gap-[1.5rem]">
                        <div className="w-[4] md:w-[5rem] h-[4rem] md:h-[5rem] rounded-[0.625rem] overflow-hidden flex-shrink-0">
                          <img
                            src={firstImage}
                            alt={item.product_name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = watch;
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold line-clamp-2 text-sm sm:text-base">
                            {item.product_name}
                          </h3>
                          <div className="flex items-center gap-2 text-[#5C5F6A] mt-1">
                            {item?.selected_variant && (
                              <>
                                <span className="text-base border-r pr-2 border-[#1111111f]">
                                  <span className="font-bold text-[#AAAAAA]">
                                    Size:{" "}
                                  </span>
                                  <span className="text-[#111111] font-bold">
                                    {item.selected_variant.product_variation}
                                  </span>
                                </span>
                              </>
                            )}
                            <span>
                              {item?.discountApplied ? (
                                <>
                                  <span className="text-[#111111] font-bold pr-2">
                                    <span>₹ </span>
                                    {item?.final_price * item?.quantity -
                                      discount?.discount}
                                  </span>{" "}
                                  <span
                                    style={{
                                      textDecoration: "line-through",
                                      color: "gray",
                                    }}
                                  >
                                    ₹{item?.final_price * item?.quantity}
                                  </span>
                                </>
                              ) : (
                                <span className="text-base ">
                                  <span className="text-[#111111] font-bold pr-2">
                                    ₹{item?.final_price * item?.quantity}{" "}
                                  </span>
                                  <span className="line-through text-sm text-[#808080]">
                                    ₹19,999
                                  </span>
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="font-bold text-sm sm:text-base">
                        × {item.quantity || 1}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Discount */}
            <div className="relative w-full my-6">
              {discount ? (
                <div className="flex items-center gap-3 mt-3 p-3 border border-green-600 rounded-lg bg-green-50 shadow-sm">
                  <span className="inline-block px-3 py-1 rounded-md border border-green-600 bg-white text-sm font-medium text-green-700">
                    {discount?.code}
                  </span>
                  <span className="text-green-700 text-sm font-medium">
                    Coupon Applied!
                  </span>
                  <button
                    onClick={() => {
                      couponForm.resetForm();
                      dispatch(clearDiscount());
                    }}
                    className="ml-auto text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
                  >
                    <Trash2 size={18} strokeWidth={2} />
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={couponForm.handleSubmit}
                  className="flex flex-col sm:flex-row border rounded-lg border-[#111111] relative"
                >
                  <div className="relative flex-1 ">
                    <input
                      type="text"
                      id="coupon_code"
                      name="coupon_code"
                      placeholder="Coupon Code"
                      className={`w-full px-4 py-4 text-gray-700 placeholder-gray-500 bg-transparent focus:outline-none 
                      ${
                        couponForm.touched.coupon_code &&
                        couponForm.errors.coupon_code
                          ? "border-red-500"
                          : discount
                          ? "border-green-500"
                          : "border-none"
                      }`}
                      value={couponForm.values.coupon_code}
                      onChange={couponForm.handleChange}
                      onBlur={couponForm.handleBlur}
                      disabled={!!discount || discountLoading}
                    />
                    {couponForm.touched.coupon_code &&
                      couponForm.errors.coupon_code && (
                        <p className="mt-1 text-sm text-red-600 absolute">
                          {couponForm.errors.coupon_code}
                        </p>
                      )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={couponForm.values.coupon_code === ""}
                      className={`btn sm:px-[3rem] px-[0.9rem] py-[0.9rem] rounded-r-sm lg:text-lg focus:outline-none  
                        ${
                          couponForm.values.coupon_code === ""
                            ? "bg-gray-400"
                            : "bg-black hover:bg-gray-800"
                        }`}
                    >
                      Apply
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Payment Method */}
            <div className="my-6">
              <h3 className="text-2xl font-bold mb-4">Payment Method</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <label
                  className={`flex items-center gap-3 p-2 xl:p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === "cod"
                      ? "border-black shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                      : "border-[#AAAAAA] hover:border-black/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="peer hidden"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full border mr-1 ${
                      paymentMethod === "cod"
                        ? "border-black"
                        : "border-[#AAAAAA]"
                    }`}
                  >
                    <span
                      className={`block w-2.5 h-2.5 rounded-full ${
                        paymentMethod === "cod" ? "bg-black" : "bg-transparent"
                      }`}
                    />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-2 xl:p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === "prepaid"
                      ? "border-black shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                      : "border-[#AAAAAA] hover:border-black/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="peer hidden"
                    checked={paymentMethod === "prepaid"}
                    onChange={() => setPaymentMethod("prepaid")}
                  />
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full border mr-1 ${
                      paymentMethod === "prepaid"
                        ? "border-black"
                        : "border-[#AAAAAA]"
                    }`}
                  >
                    <span
                      className={`block w-2.5 h-2.5 rounded-full ${
                        paymentMethod === "prepaid"
                          ? "bg-black"
                          : "bg-transparent"
                      }`}
                    />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-semibold">Prepaid</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="space-y-[0.9375rem] text-sm">
              {priceDetails
                .filter((item) => item.display !== false)
                .map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="sm:text-lg font-medium text-gray-700">
                      {item.label}
                    </span>
                    <span
                      className={`sm:text-lg font-medium ${
                        item.label.toLowerCase() === "discount"
                          ? "text-green-600"
                          : "text-gray-900"
                      }`}
                    >
                      {item.isFree
                        ? "Free"
                        : `${
                            item.label.toLowerCase() === "discount" ? "-" : ""
                          }₹${item.value?.toFixed(2)}`}
                    </span>
                  </div>
                ))}

              <div className="border-t border-[#11111126] pt-6 mt-6 flex justify-between font-medium">
                <span className="md:text-2xl text-lg font-medium">Total</span>
                <span className="md:text-2xl text-lg font-medium">
                  ₹{discTotal?.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              type="submit"
              form="checkout-form"
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
              className={`mt-6 w-full sm:text-lg font-normal text-white rounded-[0.625rem] py-4 uppercase ${checkoutLoading || !paymentMethod
                ? 'bg-gray-400'
                : 'bg-black hover:bg-gray-800'
                }`}
              disabled={checkoutLoading || !paymentMethod}
            >
              {checkoutLoading ? "Placing Order..." : "Place Order"}
            </button>
            <div className="text-center mt-6">
              <Link
                className="sm:text-lg uppercase font-normal underline hover:text-[#007BFF]"
                to={"/shop"}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
