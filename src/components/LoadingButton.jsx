import React from "react";

const LoadingButton = ({
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  className = "",
  text = "",
  fullWidth = true,
  BorderRadius = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${
        fullWidth ? "w-full" : ""
      } btn text-white py-3.5 px-6 font-medium text-base hover:bg-opacity-90 transition-all duration-300 flex justify-center items-center cursor-pointer ${
        BorderRadius ? "rounded-r-sm" : "rounded-[0.625rem]"
      } ${
        loading || disabled ? "opacity-70 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {text}...
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default LoadingButton;
