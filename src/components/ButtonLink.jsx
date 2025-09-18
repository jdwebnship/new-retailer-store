import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

function ButtonLink({ to, children, className = "" }) {
  const { buttonTextColor } = useTheme();

  return (
    <Link
      to={to}
      className={`inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-base lg:text-lg font-medium focus:outline-none items-center ${className}`}
    >
      {children}
      <span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke={buttonTextColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

export default ButtonLink;
