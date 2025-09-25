import CommonHeader from "../components/CommonHeader";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login, sendLoginOTP, verifyLoginOTP } from "../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LoginSchema } from "../utils/validationSchema";
import LoadingButton from "../components/LoadingButton";

const initialValues = {
  email: "",
  password: "",
};

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, verificationLoading } = useSelector((state) => state.auth);
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const payload = {
        user_token: import.meta.env.VITE_API_KEY,
        email: values.email,
        password: values.password,
      };
      try {
        dispatch(login({ credentials: payload, navigate }));
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Only digits
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
        const res = await dispatch(sendLoginOTP(mobile)).unwrap();
        if (res?.success) {
          setIsOtpSent(true);
          setTimer(30); // Start timer
        }
      } catch (error) {
        console.error("Failed to send OTP:", error);
      }
    }
  };

  const handleResend = async () => {
    if (timer > 0) return; // Prevent resend if timer is active
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    const mobile = cleanNumber.length === 10 ? cleanNumber : "";
    try {
      const res = await dispatch(sendLoginOTP(mobile)).unwrap();
      if (res?.success) {
        setOtp(["", "", "", ""]); // Clear OTP inputs
        setTimer(30); // Reset timer
      }
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  };

  const handleConfirm = async () => {
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      try {
        const cleanNumber = phoneNumber.replace(/\D/g, "");
        const mobile = cleanNumber.length === 10 ? cleanNumber : "";
        const res = await dispatch(
          verifyLoginOTP({ mobile, otp: otpValue })
        ).unwrap();
        if (res?.success) {
          navigate("/");
        }
      } catch (error) {
        console.error("OTP verification failed:", error);
      }
    }
  };

  useEffect(() => {
    let interval;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] lg:py-[6.25rem] md:py-[5rem] py-[3.5rem]">
        <div className="max-w-[37.5rem] mx-auto text-left">
          {!isOtpLogin ? (
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              {/* Email/Password Form (unchanged) */}
              <div className="form-group relative">
                <label
                  className="block text-sm mb-2.5 font-bold uppercase"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none form-control"
                  placeholder="Enter your email address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                    }
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-red-500 text-sm text-left absolute">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
              <div className="relative">
                <label className="block text-sm mb-2.5 font-bold uppercase">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none pr-12"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm absolute">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="mt-6 text-right">
                <Link
                  to={"/forgot-password"}
                  className="text-sm underline   hover:text-[#007BFF] site-link uppercase transition-all duration-300"
                >
                  Forgot your Password?
                </Link>
              </div>

              <LoadingButton type="submit" loading={loading} text="Sign In" />
            </form>
          ) : (
            <div>
              <div className="space-y-3 xs:space-y-4 sm:space-y-6 w-full">
                <div>
                  <p className="mb-1 text-base xs:text-lg md:text-xl lg:text-2xl font-bold">
                    Login with OTP
                  </p>
                </div>
                <div className="mb-2 xs:mb-3 sm:mb-6">
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
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, "");
                      setPhoneNumber(numericValue.trimStart());
                    }}
                    className="w-full border border-[#AAAAAA] rounded-md px-4 py-[0.82rem] focus:outline-none pr-12"
                    placeholder="Enter your phone number"
                    aria-describedby="phone-error"
                  />
                  {phoneNumber && !/^\d{10}$/.test(phoneNumber) && (
                    <p
                      id="phone-error"
                      className="mt-1 text-xs xs:text-sm sm:text-sm text-red-500"
                    >
                      Please enter a valid 10-digit phone number
                    </p>
                  )}
                </div>

                {isOtpSent && (
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
                            onPaste={handleOtpPaste}
                            className="w-full border border-[#AAAAAA] rounded-lg px-1 xs:px-2 sm:px-4 py-2 sm:py-[0.82rem] text-center outline-none text-base"
                            inputMode="numeric"
                            maxLength="1"
                            aria-label={`OTP digit ${index + 1}`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between items-center gap-1 sm:gap-0 mb-3">
                        <button
                          onClick={handleResend}
                          className={`w-auto whitespace-nowrap xs:w-auto underline text-xs xs:text-sm sm:text-sm ${timer > 0
                            ? "cursor-not-allowed opacity-50 text-gray-500"
                            : "cursor-pointer hover:opacity-100 text-gray-900"
                            }`}
                          disabled={timer > 0}
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
                    </div>
                  </div>
                )}

                {!isOtpSent && (
                  <LoadingButton
                    onClick={handleContinue}
                    loading={loading}
                    disabled={!phoneNumber || !/^\d{10}$/.test(phoneNumber)}
                    text="Send OTP"
                  />
                )}
              </div>
            </div>
          )}
          <div className="mt-6 text-center">
            <p className="text-sm uppercase">
              {!isOtpLogin ? (
                <Link
                  onClick={() => setIsOtpLogin(true)}
                  className="underline hover:text-[#007BFF] site-link transition-all duration-300"
                >
                  Login with OTP instead
                </Link>
              ) : (
                <Link
                  onClick={() => {
                    setIsOtpLogin(false);
                    setIsOtpSent(false);
                    setPhoneNumber("");
                    setOtp(["", "", "", ""]);
                    setTimer(30);
                  }}
                  className="underline hover:text-[#007BFF] site-link transition-all duration-300"
                >
                  Login with password
                </Link>
              )}
            </p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm uppercase">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="underline hover:text-[#007BFF] site-link transition-all duration-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
