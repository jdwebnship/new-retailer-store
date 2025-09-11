import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

function Call() {
  const { theme, footerTextColor } = useTheme();
  return (
    <span className="relative">
      {/* Settings Button */}

      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5541 6.24003L7.17108 2.33503C6.78108 1.88503 6.06608 1.88703 5.61308 2.34103L2.83108 5.12803C2.00308 5.95703 1.76608 7.18803 2.24508 8.17503C5.1067 14.1 9.88513 18.8851 15.8061 21.755C16.7921 22.234 18.0221 21.997 18.8501 21.168L21.6581 18.355C22.1131 17.9 22.1141 17.181 21.6601 16.791L17.7401 13.426C17.3301 13.074 16.6931 13.12 16.2821 13.532L14.9181 14.898C14.8482 14.9712 14.7563 15.0195 14.6564 15.0354C14.5565 15.0513 14.4542 15.0339 14.3651 14.986C12.1355 13.7021 10.2861 11.8503 9.00508 9.61903C8.95711 9.52978 8.93974 9.42726 8.95563 9.32719C8.97153 9.22711 9.01981 9.13502 9.09308 9.06503L10.4531 7.70403C10.8651 7.29003 10.9101 6.65103 10.5541 6.24003Z"
          stroke={footerTextColor || "#ffffff"}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  );
}

export default Call;
