import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import ButtonLink from "./ButtonLink";

const MarqueeText = () => {
  const items = Array(8).fill("Step into style|Empower your look");
  return (
    <div className="flex gap-[1.875rem] text-[0.875rem] mr-[1.875rem] marquee-span items-center">
      {items.map((item, idx) => {
        const [first, second] = item.split("|");
        return (
          <React.Fragment key={idx}>
            <span className="uppercase">{first}</span>
            <span className="dots"></span>
            <span className="uppercase">{second}</span>
            <span className="dots"></span>
          </React.Fragment>
        );
      })}
    </div>
  );
};

function Advertisement() {
  const { theme, bottomFooterTextColor } = useTheme();
  const { homeSections } = useSelector((state) => state.homeSections);

  const secondarySection = homeSections?.data?.find(
    (section) => section.section === "secondary"
  );

  const imageUrl =
    secondarySection?.image_url || "https://via.placeholder.com/800x780";
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
        <MarqueeText />
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
          className="w-full h-full rounded-[2.125rem] object-cover"
        />
        <div className="view-collection absolute top-1/2 left-1/2 w-full max-w-[20rem] lg:max-w-[44.5625rem] md:max-w-[40rem] sm:max-w-[35rem] -translate-x-1/2 -translate-y-1/2 category-title p-[20px] sm:p-[2.5rem] md:p-[4.6875rem] rounded-[2.125rem] overflow-hidden">
          <div className="flex flex-col gap-[0.9375rem]">
            <h2 className="text-lg font-bold text-[1.625rem] lg:text-[2.625rem] text-white whitespace-normal">
              {title}
            </h2>
            <div
              className="text-[1rem] lg:text-[22px] text-white whitespace-normal"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div>
              <ButtonLink to="/shop">View Collection</ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <Marquee>
        <MarqueeText />
      </Marquee>
    </div>
  );
}

export default Advertisement;
