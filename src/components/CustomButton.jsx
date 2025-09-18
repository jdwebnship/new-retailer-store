import React from "react";

const CustomButton = ({
  onClick,
  children,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 btn sm:px-[1.5rem] px-[0.9rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none flex items-center justify-center ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
