import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import CardComponent from "./CardComponent";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

function ProductSliderSection() {
  const { productDetails, product } = useSelector((state) => state.products);
  const similarProducts = product?.data?.products?.data;
  const filteredProducts = similarProducts?.filter(
    (p) => p.id !== productDetails?.product?.id
  );

  return (
    <div className="py-[3.125rem] lg:py-[100px]">
      {filteredProducts &&
        <>
          <p className="uppercase">Similar Products</p>
          <h2 className="text-[2rem] lg:text-[2.625rem] font-bold mb-[1.25rem] lg:mb-[3.125rem]">
            You might also like
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
              {filteredProducts &&
                filteredProducts.map((item, index) => (
                  <SwiperSlide key={index}>
                    <CardComponent product={item} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </section>
        </>
      }
    </div>
  );
}

export default ProductSliderSection;
