import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

function Facebook() {
  const { theme, footerTextColor } = useTheme();
  return (
    <span className="relative">
      {/* Settings Button */}

      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.666626 12.067C0.666626 18.033 4.99963 22.994 10.6666 24V15.333H7.66663V12H10.6666V9.333C10.6666 6.333 12.5996 4.667 15.3336 4.667C16.1996 4.667 17.1336 4.8 17.9996 4.933V8H16.4666C14.9996 8 14.6666 8.733 14.6666 9.667V12H17.8666L17.3336 15.333H14.6666V24C20.3336 22.994 24.6666 18.034 24.6666 12.067C24.6666 5.43 19.2666 0 12.6666 0C6.06663 0 0.666626 5.43 0.666626 12.067Z"
          fill={footerTextColor || "#ffffff"}
        />
      </svg>
    </span>
  );
}

export default Facebook;
