import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

function Search() {
  const { theme, headerTextColor } = useTheme();
  return (
    <div className="relative">
      {/* Settings Button */}

      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-[1.625rem] md:h-[1.625rem]"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.8141 17.8141L22.75 22.75M11.7813 20.3125C16.4929 20.3125 20.3125 16.4929 20.3125 11.7813C20.3125 7.06956 16.4929 3.25 11.7813 3.25C7.06956 3.25 3.25 7.06956 3.25 11.7813C3.25 16.4929 7.06956 20.3125 11.7813 20.3125Z"
          stroke={headerTextColor || "#111111"}
          strokeWidth="1.625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default Search;
