import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CardItem } from "./CardItem";
import { useSelector } from "react-redux";

export default function CardSlider() {
  const { theme } = useTheme();
  const isSwiper = (theme?.categoryLayout || "swiper") === "swiper";
  const { storeInfo, loading } = useSelector((state) => state.storeInfo);

  const categories = storeInfo?.sub_category_list || [];

  return (
    <div className="px-6 sm:px-6 lg:px-10 xl:px-[4.6875rem]">
      {isSwiper ? (
        <div className="newsSlider-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            className="newsSlider"
            spaceBetween={30}
            slidesPerView={1.1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            // pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : categories.length > 0 ? (
              categories.map((item, idx) => (
                <SwiperSlide key={idx} className="flex justify-center">
                  <CardItem item={item} />
                </SwiperSlide>
              ))
            ) : (
              <div className="flex items-center justify-center p-4">
                <p className="text-sm text-gray-500">No categories found</p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </Swiper>
        </div>
      ) : (
        <section className="py-[3.125rem] lg:py-[100px]">
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-4">
              {categories.map((item, idx) => (
                <CardItem key={idx} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center p-4">
              <p className="text-sm text-gray-500">No categories found</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
