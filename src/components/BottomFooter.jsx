import React from "react";
import { useTheme } from "../contexts/ThemeContext";

function BottomFooter() {
  const { theme, bottomFooterTextColor } = useTheme();

  return (
    <section
      className="text-center py-[2.5rem] px-[1rem] lg:py-[70px] rounded-t-none rounded-3xl -mb-[70px] z-1"
      style={{
        backgroundColor: theme?.bottomFooterBackgroundColor || "#1f2937",
        color: bottomFooterTextColor || "#ffffff",
        fontFamily: theme?.fontFamily || "system-ui, -apple-system, sans-serif",
      }}
    >
      <form className="mx-auto flex flex-col items-center justify-center gap-4">
        <h2 className="text-[2rem] lg:text-[2.625rem] font-bold">
          Join Our Newsletter
        </h2>
        <p className="text-[1.125rem] lg:text-[22px]">
          We love to surprise our subscribers with occasional gifts.
        </p>
        <div className="flex justify-center items-stretch px-4">
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            required
            className="px-[1.5rem] py-[0.9375rem] sm:w-[18.75rem] w-[11.875rem] rounded-l-[0.625rem] bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-0"
          />
          <button
            className="btn sm:px-[1.5rem] px-[0.9rem] py-[0.9375rem] rounded-r-[0.625rem] lg:text-lg focus:outline-none "
            type="submit"
          >
            SUBSCRIBE
          </button>
        </div>
      </form>
    </section>
  );
}

export default BottomFooter;
