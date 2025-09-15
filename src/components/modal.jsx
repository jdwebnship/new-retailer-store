// src/components/ModalComponent.jsx
import React, { useState } from "react";
import modalImg from "../assets/images/modal.jpg";

const ModalComponent = ({ isModalOpen, setIsModalOpen }) => {
  const [step, setStep] = useState("phone"); // "phone" or "otp"
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]); // Array for 4 OTP digits
  const [timer, setTimer] = useState(30); // 30-second timer for resend

  // Handle OTP input
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (index < 3 && value) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // Handle phone number submission
  const handleContinue = () => {
    if (phoneNumber && /^\+?[1-9]\d{9,14}$/.test(phoneNumber)) {
      setStep("otp"); // Move to OTP step
      setTimer(30); // Reset timer
    }
  };

  // Handle OTP submission
  const handleConfirm = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      alert(`OTP ${otpValue} verified!`); // Replace with actual verification logic
      setIsModalOpen(false); // Close modal on success
    }
  };

  // Handle resend code
  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimer(30);
    // Add logic to resend OTP here
  };

  // Timer logic
  React.useEffect(() => {
    let interval;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-[1.5rem] shadow-lg w-full mx-5 lg:mx-0 lg:max-w-[67.5rem] flex flex-wrap overflow-hidden">
            {/* Left Side: Background Image */}
            <div className="w-full lg:w-1/2 bg-cover bg-center">
              <img src={modalImg} className="h-full w-full" alt="" />
            </div>

            {/* Right Side: Form Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-start items-center text-left  p-[1.75rem] lg:p-[3.75rem]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M24 8L8 24M8 8L24 24"
                    stroke="#101828"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              {step === "phone" ? (
                <>
                  <div className="w-full">
                    <h2 className="text-[1.5rem] lg:text-[2rem] font-bold text-left mb-6">
                      STORE NAME
                    </h2>
                    <p className="mb-1 text-[1]  lg:text-2xl font-bold">
                      Sign in or Create account.
                    </p>
                    <p className="mb-6 text-sm lg:text-lg">
                      login or Create account with your phone number.
                    </p>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-bold mb-2">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none form-control  "
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <button
                    onClick={handleContinue}
                    className="w-full btn rounded-[0.625rem] cursor-pointer py-4 uppercase"
                    disabled={
                      !phoneNumber || !/^\+?[1-9]\d{9,14}$/.test(phoneNumber)
                    }
                  >
                    CONTINUE
                  </button>
                  <p className="text-left text-sm mt-2">
                    By signing in, you agree to our{" "}
                    <a href="#" className="underline font-medium">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline font-medium">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </>
              ) : (
                <>
                  <div className="w-full">
                    <h2 className="text-[2rem] font-bold text-left mb-2 text-2xl">
                      Verify your phone number
                    </h2>
                    <p className="text-left mb-6 text-lg ">
                      Enter your verification that we have sent to <br />
                      <span className="font-bold">+91 9876543210</span>
                    </p>
                  </div>
                  <div className="flex flex-col h-100 justify-between">
                    <div className="">
                      <div className="grid grid-cols-4 gap-4 mb-2">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index)}
                            className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none form-control text-center "
                            maxLength="1"
                            inputMode="numeric"
                          />
                        ))}
                      </div>
                      <button
                        onClick={handleResend}
                        className="w-full flex text-dark "
                        disabled={timer > 0}
                      >
                        <span className="block w-full text-left underline opacity-20">
                          RESEND CODE
                        </span>
                        <span className="block w-full text-right">
                          {timer > 0 ? `(${timer}s)` : ""}
                        </span>
                      </button>
                    </div>
                    <div className="flex flex-col gap-[0.9879rem] w-full">
                      <button
                        onClick={handleConfirm}
                        className="w-full btn rounded-[0.625rem] cursor-pointer py-4 uppercase"
                        disabled={otp.join("").length !== 4}
                      >
                        CONFIRM
                      </button>
                      <button
                        onClick={() => setStep("phone")}
                        className="w-full border-2 rounded-[0.625rem] cursor-pointer py-4 uppercase"
                      >
                        BACK
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
