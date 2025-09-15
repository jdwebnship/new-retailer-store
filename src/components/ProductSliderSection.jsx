import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { postNewArrivals } from "../redux/slices/newArrivalsSlice";
import CardComponent from "./CardComponent";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

function ProductSliderSection() {
  const { buttonTextColor } = useTheme();
  const dispatch = useDispatch();
  const { newArrivals } = useSelector((state) => state.newArrivals);
  const newTreniding = newArrivals?.products

  useEffect(() => {
    dispatch(postNewArrivals());
  }, [dispatch])

  return (
    <div className="py-[3.125rem] lg:py-[100px]">
      <p className="uppercase">Explore</p>
      <h2 className="text-[2rem] lg:text-[2.625rem] font-bold mb-[1.25rem] lg:mb-[3.125rem]">
        New Trending
      </h2>
      <section className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem]">
        <Swiper
          modules={[Navigation, Pagination]}
          //   loop={true}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          //   pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          className="mySwiper"
        >
          {newTreniding && newTreniding.map((product, index) => (
            <SwiperSlide key={index}>
              <CardComponent product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-[30px] lg:mt-[3.125rem] text-center">
          <a
            href="#"
            className="inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center"
          >
            Shop ALL New Trending
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
          </a>
        </div>
      </section>
    </div>
  );
}

export default ProductSliderSection;