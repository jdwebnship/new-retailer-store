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
import { fetchCart, clearCart } from "../redux/slices/cartSlice";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const ModalComponent = ({
  isModalOpen,
  // setIsModalOpen,
  setShowSignUpModal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verificationError } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  // useEffect(() => {
  //           dispatch(fetchCart());
  //       }, []);


  const [step, setStep] = useState("phone"); // "phone" or "otp"
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]); // Array for 4 OTP digits
  const [timer, setTimer] = useState(30); // 30-second timer for resend

  // Handle OTP input
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Only digits
    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to next input if not last
      if (index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (value.length === 0) {
      // Allow clearing the field and move focus to previous
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    } else if (value.length > 1) {
      // If user pastes more than one digit, ignore (paste is handled separately)
      return;
    }
  };

  // Handle OTP paste
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

  // Handle phone number submission
  const handleContinue = async () => {
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    if (cleanNumber.length === 10) {
      // Use the cleaned 10-digit number
      const mobile = cleanNumber;

      try {
        await dispatch(sendOTP(mobile)).unwrap();
        setStep("otp");
        setTimer(30);
      } catch (error) {
        console.error("Failed to send OTP:", error);
        // if (error?.userNotRegistered && typeof onOTPSendError === "function") {
        //   onOTPSendError(error);
        // } else {
        //   // Show error toast for other errors
        //   toast.error(error?.message || "Failed to send OTP");
        // }
      }
    }
  };

  // Handle OTP submission
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
              syncGuestCartItems(token);
            }
            navigate("/checkout");
          }
          // setIsModalOpen(false);
          dispatch(closeCheckoutModal());
        }
        // On successful verification, close the modal
        // Reset OTP state for next time
        // dispatch(resetOTPState());
      } catch (error) {
        console.error("OTP verification failed:", error);
      }
    }
  };

  const syncGuestCartItems = async (token) => {
    if (!token || !cartItems?.length) {
      return { success: false, message: 'No token or cart items found' };
    }
    
    const cart_items = cartItems.map((item) => ({
      product_id: item?.id || item?.product_id,
      quantity: item.quantity || 1,
      retailer_id: item.retailer_id || null,
      wholesaler_id: item.wholesaler_id || null,
      selected_variant: item.selected_variant || null,
      id: (item.selected_variant && item.selected_variant.id) || null
    }));

    try {
      const response = await axiosInstance.post(
        '/customer/add-to-cart-guest',
        { cart_items },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response?.data?.success || response?.status === 200) {
        // Refresh the cart from server
        await dispatch(fetchCart());
        return { 
          success: true, 
          message: response?.data?.message || 'Cart synced successfully' 
        };
      } else {
        const errorMessage = response?.data?.message || 'Failed to sync cart';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
      const errorMessage = error.response?.data?.message || 'Something went wrong while syncing cart';
      dispatch(clearCart());
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Handle resend code
  const handleResend = async () => {
    if (timer > 0) return;

    const cleanNumber = phoneNumber.replace(/\D/g, "");
    const mobile = cleanNumber.length === 10 ? `${cleanNumber}` : cleanNumber;

    try {
      await dispatch(sendOTP(mobile)).unwrap();
      setTimer(30); // Reset timer on successful resend
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
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
                <button
                  onClick={handleContinue}
                  className="w-full btn rounded-md sm:rounded-[0.625rem] py-2 xs:py-3 sm:py-4 uppercase font-medium outline-none disabled:bg-gray-400 disabled:cursor-not-allowed mb-2 sm:mb-[0.9375rem] text-base xs:text-lg"
                  disabled={!phoneNumber || !/^\d{10}$/.test(phoneNumber)}
                >
                  Continue
                </button>
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
                        className={`w-full xs:w-auto text-gray-900 underline opacity-20 hover:opacity-100 cursor-pointer ${
                          timer > 0 ? "cursor-not-allowed" : ""
                        } text-xs xs:text-sm sm:text-sm`}
                        disabled={timer > 0}
                      >
                        <span className="block w-full text-left">
                          RESEND CODE
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
                    <button
                      onClick={handleConfirm}
                      className="w-full btn rounded-md sm:rounded-[0.625rem] py-2 xs:py-3 sm:py-4 uppercase font-medium outline-none disabled:bg-gray-400 disabled:cursor-not-allowed mb-2 sm:mb-[0.9375rem] text-base xs:text-lg"
                      disabled={otp.join("").length !== 4}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setStep("phone")}
                      className="w-full border border-[#000000] text-[#111111] rounded-md sm:rounded-[0.625rem] py-2 xs:py-3 sm:py-4 uppercase font-medium outline-none cursor-pointer text-sm xs:text-base"
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
