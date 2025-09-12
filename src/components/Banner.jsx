import React, { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Slider from "./Slider";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchHomeSections } from "../redux/slices/homeSectionsSlice";

function SingleImage({ data }) {
  const { buttonTextColor } = useTheme();
  const imageUrl = data?.image_url || "https://via.placeholder.com/800x400";

  return (
    <div className="hero-overlay relative">
      <img
        src={imageUrl}
        alt={data?.title || "Hero Image"}
        className="w-full h-full object-cover"
      />
      <div className="w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-1 text-center">
        <p className="uppercase text-white mb-[8px]">
          {data?.title || "Wardrobe Refresh"}
        </p>
        <div
          className="text-[2rem] lg:text-[52px] xl:text-[62px] uppercase text-white mb-[8px]"
          dangerouslySetInnerHTML={{
            __html: data?.content || "<p>New styles are here</p>",
          }}
        />
        <p className="text-white text-2xl lg:text-[22px] mb-[0.9375rem]">
          Shine with our latest must-haves
        </p>
        <Link
          to="/shop"
          className="inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center"
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}

function Video({ data }) {
  const videoUrl = data?.video_url || "https://via.placeholder.com/800x400";

  return (
    <div className="hero-overlay relative">
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />
      <div className="w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-1 text-center">
        <p className="uppercase text-white mb-[8px]">
          {data?.title || "Wardrobe Refresh"}
        </p>
        <div
          className="text-[2rem] lg:text-[52px] xl:text-[62px] uppercase text-white mb-[8px]"
          dangerouslySetInnerHTML={{
            __html: data?.content || "<p>New styles are here</p>",
          }}
        />
        <p className="text-white text-2xl lg:text-[22px] mb-[0.9375rem]">
          Shine with our latest must-haves
        </p>
        <Link
          to="/shop"
          className="inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center"
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
                stroke={useTheme().buttonTextColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function Banner() {
  // const { theme } = useTheme();
  const dispatch = useDispatch();
  const { homeSections } = useSelector((state) => state.homeSections);

  useEffect(() => {
    dispatch(fetchHomeSections());
  }, [dispatch]);

  const heroSection = homeSections?.data?.find(
    (section) => section.section === "hero"
  );

  if (heroSection?.hero_type === "slider") {
    return <Slider data={homeSections?.data} />;
  }
  if (heroSection?.hero_type === "image") {
    return <SingleImage data={heroSection} />;
  }
  if (heroSection?.hero_type === "video") {
    return <Video data={heroSection} />;
  }

  return <SingleImage data={null} />;
}

//   console.log("homeSections", homeSections);
//   if (theme.bannerType === "image") return <SingleImage />;
//   if (theme.bannerType === "video") return <Video />;
//   return <Slider data={homeSections} />;
// }
