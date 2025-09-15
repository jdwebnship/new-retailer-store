import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Advertisment() {
  const { theme, bottomFooterTextColor, buttonTextColor } = useTheme();
  const { homeSections } = useSelector((state) => state.homeSections);

  const secondarySection = homeSections?.data?.find(
    (section) => section.section === "secondary"
  );

  const imageUrl =
    secondarySection?.image_url || "https://via.placeholder.com/800x780"; // Fallback image
  const title = secondarySection?.title || "Browse Our Fashion Paradise!";
  const content =
    secondarySection?.content ||
    "<p>Step into a world of style and explore our diverse collection of clothing categories.</p>";

  return (
    <div
      className="py-[0.9375rem]"
      style={{
        backgroundColor: theme?.bottomFooterBackgroundColor || "#1f2937",
        color: bottomFooterTextColor || "#ffffff",
        fontFamily: theme?.fontFamily || "system-ui, -apple-system, sans-serif",
      }}
    >
      <Marquee>
        <div className="flex gap-4 text-[0.875rem] mr-4">
          <span className="uppercase">Step into style </span> •{" "}
          <span className="uppercase"> Empower your look</span> •
          <span className="uppercase">Step into style </span> •{" "}
          <span className="uppercase"> Empower your look</span> •
          <span className="uppercase">Step into style </span> •{" "}
          <span className="uppercase"> Empower your look</span> •
          <span className="uppercase">Step into style </span> •{" "}
          <span className="uppercase"> Empower your look</span> •
          <span className="uppercase">Step into style </span> •{" "}
          <span className="uppercase"> Empower your look</span> •
          <span className="uppercase">Step into style </span> •{" "}
          <span className="uppercase"> Empower your look</span> •
          <span className="uppercase">Step into style </span> •{" "}
          <span className="uppercase"> Empower your look</span> •
        </div>
      </Marquee>
      <div
        className="py-[1.875rem] px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] rounded-[2.125rem] relative"
        style={{
          width: "100%",
          height: "780px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "2.125rem",
            objectFit: "cover",
          }}
        />
        <div className="view-collection absolute top-1/2 left-1/2 w-full max-w-[20rem] lg:max-w-[45.625rem] md:max-w-[40rem] sm:max-w-[35rem] -translate-x-1/2 -translate-y-1/2 category-title p-[20px] sm:p-[2.5rem] md:p-[4.6875rem] rounded-[2.125rem] overflow-hidden">
          <div className="flex flex-col gap-[0.9375rem]">
            <h2
              className="text-lg font-bold text-[1.625rem] lg:text-[2.625rem] text-white"
              style={{ whiteSpace: "normal" }}
            >
              {title}
            </h2>
            <div
              className="text-[1rem] lg:text-[22px] text-white"
              style={{ whiteSpace: "normal" }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div>
              <Link
                to={"/shop"}
                className="inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center w-max justify-center"
              >
                View Collection
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          {/* <p className="text-md text-gray-600">{item.price}</p> */}
        </div>
      </div>
      <Marquee>
        <div className="flex gap-4 text-[0.875rem] mr-4">
          <span className="uppercase">Step into style </span> •{" "}
          <span className="uppercase"> Empower your look</span> •
          <span className="uppercase">Step into style </span> •{" "}
          <span className="uppercase"> Empower your look</span> •
          <span className="uppercase">Step into style </span> •{" "}
          <span className="uppercase"> Empower your look</span> •
          <span className="uppercase">Step into style </span> •{" "}
          <span className="uppercase"> Empower your look</span> •
          <span className="uppercase">Step into style </span> •{" "}
          <span className="uppercase"> Empower your look</span> •
          <span className="uppercase">Step into style </span> •{" "}
          <span className="uppercase"> Empower your look</span> •
          <span className="uppercase">Step into style </span> •{" "}
          <span className="uppercase"> Empower your look</span> •
        </div>
      </Marquee>
    </div>
  );
}
export default Advertisment;
