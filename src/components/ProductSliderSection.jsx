import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { postNewArrivals } from "../redux/slices/newArrivalsSlice";
import CardComponent from "./CardComponent";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import ButtonLink from "./ButtonLink";

function ProductSliderSection() {
  const dispatch = useDispatch();
  const { newArrivals } = useSelector((state) => state.newArrivals);
  const newTrending = newArrivals?.products;

  useEffect(() => {
    dispatch(postNewArrivals());
  }, [dispatch]);

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
          {newTrending &&
            newTrending.map((product, index) => (
              <SwiperSlide key={index}>
                <CardComponent product={product} />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="mt-[30px] lg:mt-[3.125rem] text-center">
          <ButtonLink to="/shop">Shop ALL New Trending</ButtonLink>
        </div>
      </section>
    </div>
  );
}

export default ProductSliderSection;
