import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "../contexts/ThemeContext";
import { useSelector } from "react-redux";
import Mail from "./Mail";
import Call from "./Call";
import Facebook from "./Facebook";
import Twitter from "./Twitter";
import Instagram from "./instagram";
import { Link } from "react-router-dom";

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
      <div className="w-[100%] px-2 sm:px-6 lg:px-10 xl:px-[4.6875rem] mx-auto">
        <div className="flex items-center justify-between mx-auto text-center">
          <div className="sm:flex text-base gap-2 sm:gap-4 customer-care hidden">
            <a
              href="#"
              className="flex  gap-2 hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
            >
              <span className="icon">
                <Mail />{" "}
              </span>
              <span className="hidden xl:block">
                {storeInfo?.storeinfo?.email || "storename123@gmail.com"}
              </span>
            </a>
            <a
              href="#"
              className="flex gap-2 hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
            >
              <span className="icon">
                <Call />
              </span>
              <span className="hidden xl:block">
                {storeInfo?.storeinfo?.mobile_no || "+91 9876543210"}
              </span>
            </a>
          </div>
          <span className="font-medium text-[0.75] sm:text-[0.875rem] md:text-[1rem] center-nav flex-1 flex items-center justify-center relative sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
            {storeInfo?.storeinfo?.offer_text ||
              "All over India Delivery Available."}
          </span>
          <div className="sm:flex hidden text-base gap-2 sm:gap-4 social-login">
            <Link
              to={storeInfo?.storeinfo?.facebook_url || "#"}
              target="_blank"
              className="flex gap-2 hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
            >
              <span className="icon">
                <Facebook />
              </span>
              <span className="hidden xl:block">Facebook</span>
            </Link>
            <Link
              to={storeInfo?.storeinfo?.instagram_url || "#"}
              target="_blank"
              className="flex gap-2 hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
            >
              <span className="icon">
                <Instagram />
              </span>
              <span className="hidden xl:block">Instagram</span>
            </Link>
            <Link
              to={storeInfo?.storeinfo?.twitter_url || "#"}
              target="_blank"
              className="flex gap-2 hover:!text-[#007BFF] transition-all duration-600 ease-in-out"
            >
              <span className="icon">
                <Twitter />
              </span>
              <span className="hidden xl:block">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
