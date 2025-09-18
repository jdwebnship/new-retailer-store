import React, { useEffect } from "react";
import Slider from "./Slider";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchHomeSections } from "../redux/slices/homeSectionsSlice";
import ButtonLink from "./ButtonLink";

function SingleImage({ data }) {
  const imageUrl = data?.image_url || "https://via.placeholder.com/800x400";

  return (
    <div className="hero-overlay relative">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={data?.title || "Hero Image"}
          className="w-full h-full object-cover"
        />
      )}
      <div className="w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-1 text-center">
        {data?.title && (
          <p className="uppercase text-white mb-[8px]">
            {data?.title || "Wardrobe Refresh"}
          </p>
        )}
        {data?.content && (
          <div
            className="text-[2rem] lg:text-[52px] xl:text-[62px] uppercase text-white mb-[8px] font-bold"
            dangerouslySetInnerHTML={{
              __html: data?.content || "<p>New styles are here</p>",
            }}
          />
        )}
        <p className="text-white text-2xl lg:text-[22px] mb-6">
          Shine with our latest must-haves
        </p>
        <ButtonLink to="/shop">View Collection</ButtonLink>
      </div>
    </div>
  );
}

function Video({ data }) {
  const videoUrl = data?.video_url || "https://via.placeholder.com/800x400";

  return (
    <div className="hero-overlay relative">
      {videoUrl && (
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      )}
      <div className="w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-1 text-center">
        <p className="uppercase text-white mb-[8px]">
          {data?.title || "Wardrobe Refresh"}
        </p>
        <div
          className="text-[2rem] lg:text-[52px] xl:text-[62px] uppercase text-white mb-[8px] font-bold"
          dangerouslySetInnerHTML={{
            __html: data?.content || "<p>New styles are here</p>",
          }}
        />
        <p className="text-white text-2xl lg:text-[22px] mb-6">
          Shine with our latest must-haves
        </p>
        <ButtonLink to="/shop">View Collection</ButtonLink>
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
