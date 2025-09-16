import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  submitContactForm,
  resetContactState,
} from "../redux/slices/contactSlice";
import { toast } from "react-toastify";
import CommonHeader from "../components/CommonHeader";
import Facebook from "../assets/facebook.svg";
import Instagram from "../assets/instagram.svg";
import Mail from "../assets/mail.svg";
import Call from "../assets/call.svg";
import Map from "../assets/map-pin1.svg";
import Twitter from "../assets/twitter.svg";

// Validation schema
const validationSchema = Yup.object({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
  subscribe: Yup.boolean(),
});

function Contacts() {
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector(
    (state) => state.contact
  );

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      subscribe: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const token = localStorage.getItem("token");
        if (token) {
          formData.append("token", token);
        }

        await dispatch(submitContactForm(formData)).unwrap();

        toast.success(
          "Message sent successfully! We will get back to you soon."
        );
        resetForm();
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "Failed to send message. Please try again later.";
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (success) {
      formik.resetForm();
      dispatch(resetContactState());
    }
    if (error) {
      toast.error(error);
      dispatch(resetContactState());
    }
  }, [success, error, message, dispatch, formik]);

  return (
    <div>
      <CommonHeader />
      <div className="2xl:max-w-[80rem] mx-auto py-10 md:py-[6.5rem] px-4 sm:px-6 lg:px-[4.6875rem] 2xl:px-[0] text-left">
        <div className="flex flex-col lg:flex-row gap-[1.5rem] xl:gap-y-[4.375rem]">
          <div className="space-y-6 lg:w-2/6">
            <div class="rounded-lg bg-[#fff7f2] p-5 flex flex-col gap-3">
              <h3 class="font-semibold text-lg lg:text-2xl pb-2 border-b border-[#f3f3f3]">
                Contact Information
              </h3>
              <a
                className="flex gap-2 text-base items-center hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
                href=""
              >
                <span class="flex items-center justify-center w-8 h-8 bg-[#111111] rounded-full p-1 shrink-0">
                  <img
                    className="w-[1.125rem] h-[1.125rem]"
                    src={Mail}
                    alt=""
                  />
                </span>
                <span>supprt@jdshipnweb.com</span>
              </a>
              <a
                className="flex gap-2 text-base items-center hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
                href=""
              >
                <span class="flex items-center justify-center w-8 h-8 bg-[#111111] rounded-full p-1 shrink-0 ">
                  <img
                    className="w-[1.125rem] h-[1.125rem]"
                    src={Call}
                    alt=""
                  />
                </span>
                <span>+91 9876543210</span>
              </a>
              <a
                className="flex gap-2 text-base items-center hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
                href=""
              >
                <span class="flex items-center justify-center w-8 h-8 bg-[#111111] rounded-full p-1 shrink-0">
                  <img className="w-[1.125rem] h-[1.125rem]" src={Map} alt="" />
                </span>
                <span>123 Business Street, City, Country – ZIP</span>
              </a>
            </div>

            <div class="rounded-lg bg-[#fff7f2] p-5 flex flex-col gap-3">
              <h3 class="font-semibold text-lg lg:text-2xl pb-2 border-b border-[#f3f3f3]">
                Business Hours
              </h3>
              <div className="flex flex-col gap-2 text-base">
                <span>Monday – Friday: 9:00 AM – 6:00 PM</span>
                <span>Saturday: 10:00 AM – 2:00 PM</span>
                <span>Sunday: Closed</span>
              </div>
            </div>

            <div class="rounded-lg bg-[#fff7f2] p-5 flex items-center gap-4">
              <div class="w-full">
                <h3 class="font-semibold text-lg lg:text-2xl pb-2 border-b border-[#f3f3f3]">
                  Follow Our Journey
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <a
                    className="flex gap-2 text-base items-center hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
                    href=""
                  >
                    <span class="flex items-center justify-center w-8 h-8 bg-[#111111] rounded-full p-1 shrink-0">
                      <img
                        className="w-[1.125rem] h-[1.125rem]"
                        src={Facebook}
                        alt=""
                      />
                    </span>
                    <span>Facebook</span>
                  </a>
                  <a
                    className="flex gap-2 text-base items-center hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
                    href=""
                  >
                    <span class="flex items-center justify-center w-8 h-8 bg-[#111111] rounded-full p-1 shrink-0">
                      <img
                        className="w-[1.125rem] h-[1.125rem]"
                        src={Instagram}
                        alt=""
                      />
                    </span>
                    <span>Instagram</span>
                  </a>
                  <a
                    className="flex gap-2 text-base items-center hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
                    href="#"
                  >
                    <span class="flex items-center justify-center w-8 h-8 bg-[#111111] rounded-full p-1 shrink-0">
                      <img
                        className="w-[1.125rem] h-[1.125rem]"
                        src={Twitter}
                        alt=""
                      />
                    </span>
                    <span>Twitter</span>
                  </a>
                  <a
                    className="flex gap-2 text-base items-center hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
                    href=""
                  >
                    <span class="flex items-center justify-center w-8 h-8 bg-[#111111] rounded-full p-1 shrink-0">
                      <img
                        className="w-[1.125rem] h-[1.125rem]"
                        src={Twitter}
                        alt=""
                      />
                    </span>
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl lg:w-8/12 lg:pl-5">
            <div className="mb-6">
              <h6 className="text-3xl font-bold uppercase mb-3">
                How can we help?
              </h6>
              <p className="text-base">
                "We’d love to hear from you. Whether you have a question,
                feedback, or just want to connect — our team is here
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-6 flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 mb-6 md:mb-0 sm:pr-3">
                  <label
                    className="block text-sm mb-2.5 font-bold uppercase"
                    htmlFor="firstName"
                  >
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={`w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA] ${
                      formik.touched.firstName && formik.errors.firstName
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Enter your First name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-500 text-sm absolute">
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>
                <div className="w-full sm:w-1/2 sm:pl-3">
                  <label
                    className="block text-sm mb-2.5 font-bold uppercase"
                    htmlFor="lastname"
                  >
                    Last Name *
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    className={`w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]`}
                    placeholder="Enter your Last name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname}
                  />
                  {formik.touched.lastname && formik.errors.lastname && (
                    <p className="text-red-500 text-sm absolute">
                      {formik.errors.lastname}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm mb-2.5 font-bold uppercase"
                  htmlFor="email"
                >
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]`}
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm absolute">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm mb-2.5 font-bold uppercase"
                  htmlFor="phone_number"
                >
                  Phone Number *
                </label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  className={`w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]`}
                  placeholder="Enter your 10-digit phone number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone_number}
                />
                {formik.touched.phone_number && formik.errors.phone_number && (
                  <p className="text-red-500 text-sm absolute">
                    {formik.errors.phone_number}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm mb-2.5 font-bold uppercase"
                  htmlFor="subject"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  className={`w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subject}
                >
                  <option value="" className="opacity-50">
                    Select a subject
                  </option>
                  <option value="order">Order Inquiry</option>
                  <option value="returns">Returns & Refunds</option>
                  <option value="product">Product Question</option>
                </select>
                {formik.touched.subject && formik.errors.subject && (
                  <p className="text-red-500 text-sm absolute">
                    {formik.errors.subject}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  className="block text-sm mb-2.5 font-bold uppercase"
                  htmlFor="message"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className={`w-full border rounded-lg p-[0.82rem] border-[#AAAAAA]`}
                  placeholder="Enter your message"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                ></textarea>
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-500 text-sm absolute">
                    {formik.errors.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="subscribe"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.subscribe}
                  />
                  <span className="ml-2">
                    I would like to receive updates and promotions via email.
                  </span>
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#111111] text-white py-3 px-8 rounded-lg hover:bg-[#333333] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
