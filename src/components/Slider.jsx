import React, { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

const Slider = ({ data }) => {
  const { buttonTextColor } = useTheme();
  const sliderFiles = data?.[0]?.slider_files || [];
  useEffect(() => {
    const tline = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: ".animation-section",
        scrub: 0.5,
        start: "10% 10%",
        end: "bottom -=100%",
        ease: "linear",
      },
    });

    tline.to(".animation-section", {
      y: "25vh",
      duration: 3,
    });

    return () => {
      tline.scrollTrigger?.kill();
      tline.kill();
    };
  }, []);

  return (
    <section className="animation-section">
      <div className="relative w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop
          className="h-[85vh]"
        >
          {sliderFiles.map((file, idx) => (
            <SwiperSlide key={file}>
              <div className="relative w-full h-full">
                {file.endsWith(".webm") || file.endsWith(".mp4") ? (
                  <video
                    src={file}
                    autoPlay
                    loop
                    muted
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
                  />
                ) : (
                  <img
                    src={file}
                    alt={`Slide ${idx + 1}`}
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
                  />
                )}
                <div className="w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-1 text-center">
                  <p className="uppercase text-white mb-[8px]">
                    {data?.[0]?.title || "Wardrobe Refresh"}
                  </p>
                  <div
                    className="text-[2rem] lg:text-[52px] xl:text-[62px] uppercase text-white mb-[8px]"
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.[0]?.content || "<p>New styles are here</p>",
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Slider;
