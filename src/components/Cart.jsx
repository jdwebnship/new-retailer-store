import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { theme, headerTextColor } = useTheme();
  const navigate = useNavigate();
  return (
    <div
      className="relative cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        navigate("/cart");
      }}
    >
      {/* Settings Button */}

      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-[1.625rem] md:h-[1.625rem]"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.2063 21.9375H4.79378C4.59386 21.9366 4.40111 21.8628 4.25158 21.7301C4.10205 21.5974 4.00596 21.4148 3.98128 21.2164L2.5391 8.21641C2.52627 8.10314 2.53742 7.98844 2.57182 7.87976C2.60623 7.77109 2.66312 7.67086 2.73879 7.58561C2.81446 7.50036 2.90723 7.43199 3.01105 7.38493C3.11488 7.33788 3.22745 7.3132 3.34144 7.3125H22.6586C22.7726 7.31322 22.8852 7.33792 22.989 7.38498C23.0928 7.43204 23.1856 7.50041 23.2612 7.58566C23.3369 7.6709 23.3938 7.77112 23.4282 7.87978C23.4626 7.98845 23.4738 8.10314 23.461 8.21641L22.0188 21.2164C21.9941 21.4148 21.898 21.5974 21.7485 21.7301C21.5989 21.8628 21.4062 21.9365 21.2063 21.9375Z"
          stroke={headerTextColor || "#111111"}
          strokeWidth="1.625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.9375 10.5625V7.3125C8.9375 6.23506 9.36551 5.20175 10.1274 4.43988C10.8892 3.67801 11.9226 3.25 13 3.25C14.0774 3.25 15.1108 3.67801 15.8726 4.43988C16.6345 5.20175 17.0625 6.23506 17.0625 7.3125V10.5625"
          stroke={headerTextColor || "#111111"}
          strokeWidth="1.625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default Cart;
