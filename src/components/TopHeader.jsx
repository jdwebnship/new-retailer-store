import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "../contexts/ThemeContext";
import { useSelector } from "react-redux";

function TopHeader({ visible = true, onHeightChange }) {
  const { theme, topHeaderTextColor } = useTheme();
  const ref = useRef(null);

  const { storeInfo } = useSelector((state) => state.storeInfo);

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

  // Animate show/hide with GSAP for extra smoothness
  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      yPercent: visible ? 0 : -100,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
  }, [visible]);

  return (
    <div
      ref={ref}
      className="top-header fixed top-0 left-0 right-0 z-50 py-[0.625rem] sm:py-[0.75] md:py-[0.9375rem] text-xs sm:text-sm border-b border-gray-200"
      style={{
        backgroundColor: topHeaderBgColor,
        color: topHeaderTextColor,
        fontFamily: theme?.fontFamily || "system-ui, -apple-system, sans-serif",
        willChange: "transform",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="w-[100%] px-4 sm:px-6 md:px-10 lg:px-[4.6875rem] mx-auto">
        <div className="flex items-center justify-center mx-auto text-center">
          <span className="font-medium text-[0.75] sm:text-[0.875rem] md:text-[1rem]">
            {storeInfo?.storeinfo?.offer_text ||
              "All over India Delivery Available."}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
