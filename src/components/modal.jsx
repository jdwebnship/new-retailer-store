import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import modalImg from "../assets/images/modal.jpg";
import { sendOTP, verifyOTP } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { closeCheckoutModal } from "../redux/slices/uiSlice";
import { syncGuestCartItems } from "../utils/helper";
import LoadingButton from "./LoadingButton";

const ModalComponent = ({
  isModalOpen,
  setShowSignUpModal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verificationError, loading, verificationLoading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [step, setStep] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (value.length === 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    } else if (value.length > 1) {
      return;
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (paste.length === 4) {
      setOtp(paste.split(""));
      setTimeout(() => {
        document.getElementById("otp-input-3").focus();
      }, 0);
    }
  };

  const handleContinue = async () => {
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    if (cleanNumber.length === 10) {
      const mobile = cleanNumber;

      try {
        await dispatch(sendOTP(mobile)).unwrap();
        setStep("otp");
        setTimer(30);
      } catch (error) {
        console.error("Failed to send OTP:", error);
      }
    }
  };

  const handleConfirm = async () => {
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      try {
        const cleanNumber = phoneNumber.replace(/\D/g, "");
        const mobile =
          cleanNumber.length === 10 ? `${cleanNumber}` : cleanNumber;

        const res = await dispatch(
          verifyOTP({ mobile, otp: otpValue })
        ).unwrap();

        if (res?.success) {
          if (!res?.data?.is_existing_customer) {
            setShowSignUpModal(true);
          } else {
            setShowSignUpModal(false);
            const token = res?.data?.token;
            if (token && cartItems.length > 0) {
              syncGuestCartItems(token, cartItems, dispatch);
              navigate("/checkout");
            }
          }
          dispatch(closeCheckoutModal());
        }
      } catch (error) {
        console.error("OTP verification failed:", error);
      }
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    const cleanNumber = phoneNumber.replace(/\D/g, "");
    const mobile = cleanNumber.length === 10 ? `${cleanNumber}` : cleanNumber;

    try {
      await dispatch(sendOTP(mobile)).unwrap();
      setTimer(30);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
    setOtp(["", "", "", ""]);
    setTimer(30);
  };

  useEffect(() => {
    if (step !== "otp" || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timer]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => dispatch(closeCheckoutModal())}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-[rgba(0,0,0,0.7)] bg-opacity-50 transition-opacity duration-300 overflow-hidden" />

      <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-0 z-50">
        <DialogPanel className="relative bg-white rounded-2xl sm:rounded-[1.5rem] shadow-lg w-full max-w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-[67.5rem] mx-auto flex flex-col lg:flex-row overflow-hidden min-h-[60vh] sm:min-h-[32rem]">
          {/* Left Side: Background Image */}
          <div className="w-full lg:w-1/2 h-32 xs:h-40 sm:h-64 md:h-80 lg:h-auto bg-cover bg-center flex-shrink-0">
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
          <div className="relative w-full lg:w-1/2 p-3 xs:p-4 sm:p-6 md:p-8 lg:p-[3.75rem] flex flex-col justify-start text-left">
            <button
              onClick={() => dispatch(closeCheckoutModal())}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-xl sm:text-2xl focus:outline-none cursor-pointer"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
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
              <div className="space-y-3 xs:space-y-4 sm:space-y-6 w-full">
                <div>
                  <p className="mb-1 text-base xs:text-lg md:text-xl lg:text-2xl font-bold">
                    Sign in or Create account.
                  </p>
                  <p className="mb-3 xs:mb-4 sm:mb-6 text-xs xs:text-sm sm:text-base lg:text-lg">
                    Login or Create account with your phone number.
                  </p>
                </div>
                <div className="mb-2 xs:mb-3 sm:mb-4">
                  <label
                    htmlFor="phone-number"
                    className="block text-xs xs:text-sm font-bold mb-2"
                  >
                    PHONE NUMBER
                  </label>
                  <input
                    id="phone-number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border border-[#AAAAAA] rounded-lg px-2 xs:px-3 sm:px-4 py-2 sm:py-[0.82rem] outline-none text-sm xs:text-base"
                    placeholder="Enter your phone number"
                    aria-describedby="phone-error"
                  />
                  {phoneNumber && !/^\d{10}$/.test(phoneNumber) && (
                    <p
                      id="phone-error"
                      className="mt-1 text-xs xs:text-sm sm:text-sm text-red-500"
                    >
                      Please enter a valid phone number
                    </p>
                  )}
                </div>
                <LoadingButton
                  onClick={handleContinue}
                  loading={loading}
                  disabled={!phoneNumber || !/^\d{10}$/.test(phoneNumber)}
                  text="Continue"
                />
                <p className="text-xs xs:text-sm sm:text-sm text-left">
                  By signing in, you agree to our{" "}
                  <Link
                    to="/terms-use"
                    className="underline font-medium hover:text-blue-800"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="underline font-medium hover:text-blue-800"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <div className="space-y-3 xs:space-y-4 sm:space-y-6 w-full">
                <div>
                  <DialogTitle
                    as="h2"
                    className="text-lg xs:text-xl sm:text-2xl lg:text-[2rem] font-bold text-gray-900 mb-2"
                  >
                    Verify Your Phone Number
                  </DialogTitle>
                  {verificationError && (
                    <p className="text-red-500 text-xs xs:text-sm sm:text-sm mb-2">
                      {verificationError}
                    </p>
                  )}
                  <p className="mb-3 xs:mb-4 sm:mb-6 text-sm xs:text-base sm:text-lg text-left">
                    Enter the verification code sent to{" "}
                    <span className="font-bold">{phoneNumber}</span>
                  </p>
                </div>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="grid grid-cols-4 gap-1 xs:gap-2 sm:gap-4 mb-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-input-${index}`}
                          type="text"
                          value={digit}
                          onChange={(e) => handleOtpChange(e, index)}
                          // onKeyDown={(e) => handleOtpKeyDown(e, index)}
                          onPaste={handleOtpPaste}
                          className="w-full border border-[#AAAAAA] rounded-lg px-1 xs:px-2 sm:px-4 py-2 sm:py-[0.82rem] text-center outline-none text-base"
                          inputMode="numeric"
                          aria-label={`OTP digit ${index + 1}`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center gap-1 sm:gap-0">
                      <button
                        onClick={handleResend}
                        disabled={timer > 0}
                        className={`w-auto whitespace-nowrap xs:w-auto underline text-xs xs:text-sm sm:text-sm ${
                          timer > 0
                            ? "cursor-not-allowed opacity-50 text-gray-500"
                            : "cursor-pointer hover:opacity-100 text-gray-900"
                        }`}
                      >
                        <span className="block w-full text-left">
                          {timer > 0 ? `RESEND IN ${timer}s` : "RESEND CODE"}
                        </span>
                      </button>

                      {timer > 0 && (
                        <span className="block w-full xs:w-auto text-right text-xs xs:text-sm sm:text-sm">
                          ({timer}s)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 xs:gap-3 sm:gap-[0.9879rem] mt-2">
                    <LoadingButton
                      onClick={handleConfirm}
                      loading={verificationLoading}
                      disabled={otp.join("").length !== 4}
                      text="Confirm"
                    />
                    <button
                      onClick={() => setStep("phone")}
                      className="w-full border text-[#111111] rounded-md sm:rounded-[0.625rem] py-2 xs:py-3 sm:py-4 uppercase font-medium outline-none cursor-pointer text-sm xs:text-base"
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
