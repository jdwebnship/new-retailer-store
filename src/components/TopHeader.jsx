import { useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

function TopHeader({ visible = true, onHeightChange }) {
  const { theme, topHeaderTextColor } = useTheme();
  const ref = useRef(null);

  const topHeaderBgColor = theme?.topHeaderBackgroundColor || "#f8f9fa";

  useEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      const h = ref.current?.offsetHeight || 0;
      onHeightChange && onHeightChange(h);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [onHeightChange]);

  return (
    <div
      ref={ref}
      className="top-header fixed top-0 left-0 right-0 z-50 py-[0.625rem] sm:py-[0.75] md:py-[0.9375rem] text-xs sm:text-sm border-b border-gray-200 transition-transform duration-300 ease-out"
      style={{
        backgroundColor: topHeaderBgColor,
        color: topHeaderTextColor,
        fontFamily: theme?.fontFamily || "system-ui, -apple-system, sans-serif",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="w-[100%] px-4 sm:px-6 md:px-10 lg:px-[4.6875rem] mx-auto">
        <div className="flex items-center justify-center mx-auto text-center">
          <span className="font-medium text-[0.75] sm:text-[0.875rem] md:text-[1rem]">
            All over India Delivery Available.
          </span>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
