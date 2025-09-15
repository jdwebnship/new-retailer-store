import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import modalImg from "../assets/images/modal.jpg";

const ModalComponent = ({ isModalOpen, setIsModalOpen }) => {
  const [step, setStep] = useState("phone"); // "phone" or "otp"
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]); // Array for 4 OTP digits
  const [timer, setTimer] = useState(30); // 30-second timer for resend

  // Handle OTP input
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input or previous on backspace
      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      } else if (!value && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  // Handle phone number submission
  const handleContinue = () => {
    if (phoneNumber && /^\+?[1-9]\d{9,14}$/.test(phoneNumber)) {
      setStep("otp");
      setTimer(30);
    }
  };

  // Handle OTP submission
  const handleConfirm = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      alert(`OTP ${otpValue} verified!`); // Replace with actual verification logic
      setIsModalOpen(false);
    }
  };

  // Handle resend code
  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimer(30);
    // Add logic to resend OTP here
  };

  // Timer logic
  useEffect(() => {
    let interval;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-[rgba(0,0,0,0.7)] bg-opacity-50 transition-opacity duration-300" />

      <div className="fixed inset-0 flex items-center justify-center p-5 lg:p-0">
        <DialogPanel className="relative bg-white rounded-[1.5rem] shadow-lg w-full max-w-[67.5rem] mx-5 lg:mx-0 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Side: Background Image */}
          <div className="w-full lg:w-1/2 bg-cover bg-center">
            <img
              src={modalImg}
              className="h-full w-full object-cover"
              alt="Modal background"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1504672281656-e3e7b6e4a328";
              }}
            />
          </div>

          {/* Right Side: Form Content */}
          <div className="w-full lg:w-1/2 p-[1.75rem] lg:p-[3.75rem] flex flex-col justify-start text-left">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                stroke="#101828"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M24 8L8 24M8 8L24 24" />
              </svg>
            </button>

            {step === "phone" ? (
              <div className="space-y-6 w-full">
                <div>
                  <DialogTitle
                    as="h2"
                    className="text-[1.5rem] lg:text-[2rem] font-bold mb-6"
                  >
                    Store Name
                  </DialogTitle>
                  <p className="mb-1 text-base lg:text-2xl font-bold">
                    Sign in or Create account.
                  </p>
                  <p className="mb-6 text-sm lg:text-lg">
                    Login or Create account with your phone number.
                  </p>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm font-bold mb-2"
                  >
                    PHONE NUMBER
                  </label>
                  <input
                    id="phone-number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border border-gray-400 rounded-md px-4 py-[0.82rem] outline-none"
                    placeholder="Enter your phone number"
                    aria-describedby="phone-error"
                  />
                  {phoneNumber && !/^\+?[1-9]\d{9,14}$/.test(phoneNumber) && (
                    <p id="phone-error" className="mt-1 text-sm text-red-500">
                      Please enter a valid phone number
                    </p>
                  )}
                </div>
                <button
                  onClick={handleContinue}
                  className="w-full btn rounded-[0.625rem] py-4 uppercase font-medium outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={
                    !phoneNumber || !/^\+?[1-9]\d{9,14}$/.test(phoneNumber)
                  }
                >
                  Continue
                </button>
                <p className="text-sm text-left">
                  By signing in, you agree to our{" "}
                  <a
                    href="#"
                    className="underline font-medium hover:text-blue-800"
                  >
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="underline font-medium hover:text-blue-800"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            ) : (
              <div className="space-y-6 w-full">
                <div>
                  <DialogTitle
                    as="h2"
                    className="text-2xl lg:text-[2rem] font-bold text-gray-900 mb-2"
                  >
                    Verify Your Phone Number
                  </DialogTitle>
                  <p className="mb-6 text-lg text-left">
                    Enter the verification code sent to{" "}
                    <span className="font-bold">
                      {phoneNumber}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="grid grid-cols-4 gap-4 mb-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-input-${index}`}
                          type="text"
                          value={digit}
                          onChange={(e) => handleOtpChange(e, index)}
                          className="w-full border border-gray-400 rounded-md px-4 py-[0.82rem] text-center outline-none"
                          maxLength="1"
                          inputMode="numeric"
                          aria-label={`OTP digit ${index + 1}`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={handleResend}
                        className={`w-full text-gray-900 underline opacity-20 hover:opacity-100 ${
                          timer > 0 ? "cursor-not-allowed" : ""
                        }`}
                        disabled={timer > 0}
                      >
                        <span className="block w-full text-left">
                          RESEND CODE
                        </span>
                      </button>
                      {timer > 0 && (
                        <span className="block w-full text-right ">
                          ({timer}s)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[0.9879rem]">
                    <button
                      onClick={handleConfirm}
                      className="w-full btn rounded-[0.625rem] py-4 uppercase font-medium outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={otp.join("").length !== 4}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setStep("phone")}
                      className="w-full border-1 border-[#000000] text-[#111111] rounded-[0.625rem] py-4 uppercase font-medium outline-none cursor-pointer"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalComponent;
