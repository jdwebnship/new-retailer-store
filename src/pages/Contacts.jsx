import CommonHeader from "../components/CommonHeader";
import Facebook from "../assets/facebook.svg";
import Instagram from "../assets/instagram.svg";
import Mail from "../assets/mail.svg";
import Call from "../assets/call.svg";
import Map from "../assets/map-pin1.svg";
import Twitter from "../assets/twitter.svg";

function Contacts() {
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
              <div className="flex gap-2 text-base items-center">
                <span class="flex items-center justify-center w-8 h-8 bg-[#111111] rounded-full p-1 shrink-0">
                  <img
                    className="w-[1.125rem] h-[1.125rem]"
                    src={Mail}
                    alt=""
                  />
                </span>
                <a
                  class="hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
                  href=""
                >
                  supprt@jdshipnweb.com
                </a>
              </div>
              <div className="flex gap-2 text-base items-center">
                <span class="flex items-center justify-center w-8 h-8 bg-[#111111] rounded-full p-1 shrink-0">
                  <img
                    className="w-[1.125rem] h-[1.125rem]"
                    src={Call}
                    alt=""
                  />
                </span>
                <a
                  class="hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
                  href=""
                >
                  +91 9876543210
                </a>
              </div>
              <div className="flex gap-2 text-base items-center">
                <span class="flex items-center justify-center w-8 h-8 bg-[#111111] rounded-full p-1 shrink-0">
                  <img className="w-[1.125rem] h-[1.125rem]" src={Map} alt="" />
                </span>
                <a
                  class="hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
                  href=""
                >
                  123 Business Street, City, Country – ZIP
                </a>
              </div>
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
                  <div className="flex gap-2 text-base items-center">
                    <span class="flex items-center justify-center w-8 h-8 bg-[#111111] rounded-full p-1 shrink-0">
                      <img
                        className="w-[1.125rem] h-[1.125rem]"
                        src={Facebook}
                        alt=""
                      />
                    </span>
                    <a
                      href="#"
                      className="hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
                    >
                      Facebook
                    </a>
                  </div>
                  <div className="flex gap-2 text-base items-center">
                    <span class="flex items-center justify-center w-8 h-8 bg-[#111111] rounded-full p-1 shrink-0">
                      <img
                        className="w-[1.125rem] h-[1.125rem]"
                        src={Instagram}
                        alt=""
                      />
                    </span>
                    <a
                      href="#"
                      className="hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
                    >
                      Instagram
                    </a>
                  </div>
                  <div className="flex gap-2 text-base items-center">
                    <span class="flex items-center justify-center w-8 h-8 bg-[#111111] rounded-full p-1 shrink-0">
                      <img
                        className="w-[1.125rem] h-[1.125rem]"
                        src={Twitter}
                        alt=""
                      />
                    </span>
                    <a
                      href="#"
                      className="hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
                    >
                      Twitter
                    </a>
                  </div>
                  <div className="flex gap-2 text-base items-center">
                    <span class="flex items-center justify-center w-8 h-8 bg-[#111111] rounded-full p-1 shrink-0">
                      <img
                        className="w-[1.125rem] h-[1.125rem]"
                        src={Twitter}
                        alt=""
                      />
                    </span>
                    <a
                      href="#"
                      className="hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl lg:w-8/12 lg:pl-5">
            {/* <Form> */}
            <div className="mb-6">
              <h6 className="text-3xl font-bold uppercase mb-3">
                How can we help?
              </h6>
              <p className="text-base">
                "We’d love to hear from you. Whether you have a question,
                feedback, or just want to connect — our team is here
              </p>
            </div>
            <div className="mb-6 flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/2 mb-6 md:mb-0 sm:pr-3">
                <label
                  className="block text-sm mb-2.5 font-bold uppercase"
                  htmlFor="fname"
                >
                  First Name
                </label>
                <input
                  id="fname"
                  name="fname"
                  type="text"
                  className="w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]"
                  placeholder="Enter your Firts name"
                />
              </div>
              <div className="w-full sm:w-1/2 sm:pl-3">
                <label
                  className="block text-sm mb-2.5 font-bold uppercase"
                  htmlFor="lname"
                >
                  Last Name
                </label>
                <input
                  id="lname"
                  name="lname"
                  type="text"
                  className="w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]"
                  placeholder="Enter your Last name"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-sm mb-2.5 font-bold uppercase"
                htmlFor="Email "
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                className="w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm mb-2.5 font-bold uppercase"
                htmlFor="phonenumber"
              >
                Phone Number
              </label>
              <input
                id="phonenumber"
                name="phonenumber"
                type="text"
                className="w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm mb-2.5 font-bold uppercase"
                htmlFor="phonenumber"
              >
                Phone Number
              </label>
              <select
                name=""
                id=""
                className="w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]"
              >
                <option value="" className="opacity-50">
                  Select a subject
                </option>
                <option value="order">Order Inquiry</option>
                <option value="rreturns">Returns & Refunds</option>
                <option value="product">Product Question</option>
              </select>
            </div>

            <div className="mb-6">
              <label
                className="block text-sm mb-2.5 font-bold uppercase"
                htmlFor="phonenumber"
              >
                Message
              </label>
              <textarea
                id="phonenumber"
                name="phonenumber"
                type="text"
                className="w-full border rounded-lg p-[0.82rem] focus:outline-none border-[#AAAAAA]"
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              className="inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center disabled:opacity-50"
            >
              Send Message
            </button>
            {/* </Form> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
