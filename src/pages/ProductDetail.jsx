import React, { useEffect, useState, useRef } from "react";
import CommonHeader from "../components/CommonHeader";
import ProductSliderSection from "../components/ProductSliderSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/mousewheel";
import "swiper/css/navigation";
import whatsapp from "../assets/whatsapp-og.svg";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductsDetails } from "../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { getWhatsappLink, isInWishlist } from "../utils/common";
import { addtowishList, removeFromwishList } from "../redux/slices/WishListSlice";

function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const { productDetails } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { storeInfo } = useSelector((state) => state.storeInfo);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const phone_number = storeInfo?.storeinfo?.retailer?.phone_number;
  const product = productDetails?.product
  const wishlistData = wishlist?.data?.wishlist;
  const productImg = product?.product_images ? product?.product_images.split(',') : []
  const isWishlist =
    (isAuthenticated && isInWishlist(product?.id, wishlistData)) || false;

  const [thumbHeight, setThumbHeight] = useState("515px"); // Initial fallback
  const [mainHeight, setMainHeight] = useState("400px"); // Initial fallback
  const mainContainerRef = useRef(null);
  const thumbContainerRef = useRef(null);

  const addToWishList = () => {
    if (isAuthenticated) {
      if (isWishlist) {
        const payload = {
          product_id: !product?.retailer_id ? product?.id : null,
          retailer_product_id: product?.retailer_id ? product?.id : null,
        };
        dispatch(removeFromwishList(payload, dispatch));
      } else {
        const payload = {
          product_id: product?.id,
          retailer_id: product?.wholesaler_id ? null : product?.retailer_id,
          wholesaler_id: product?.retailer_id ? null : product?.wholesaler_id,
        };
        dispatch(addtowishList(payload, dispatch));
      }
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductsDetails({ slug }));
    } else {
      navigate("/shop");
    }
  }, [slug, dispatch, navigate]);

  const discount =
    product?.old_price && product?.new_price
      ? (((product?.old_price - product?.new_price) / product?.old_price) * 100).toFixed(0)
      : 0;

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    if (thumbsSwiper) {
      thumbsSwiper.slideTo(swiper.activeIndex);
    }
    // Update main height on slide change
    setTimeout(() => {
      if (mainContainerRef.current) {
        const currentImg = mainContainerRef.current.querySelector("img");
        if (currentImg && currentImg.complete) {
          const containerWidth = mainContainerRef.current.offsetWidth;
          const aspectRatio =
            currentImg.naturalWidth > 0 && currentImg.naturalHeight > 0
              ? currentImg.naturalWidth / currentImg.naturalHeight
              : 1.5;
          const calculatedHeight = containerWidth / aspectRatio;
          setMainHeight(`${calculatedHeight}px`);
        }
      }
    }, 50);
  };

  // Dynamic height calculation
  useEffect(() => {
    const updateHeights = () => {
      // Thumbnail height
      if (thumbContainerRef.current) {
        const thumbImg = thumbContainerRef.current.querySelector("img");
        const slidesPerView = 5;
        const spaceBetween = 15;
        const containerWidth = thumbContainerRef.current.offsetWidth;
        const aspectRatio =
          thumbImg && thumbImg.complete && thumbImg.naturalWidth > 0 && thumbImg.naturalHeight > 0
            ? thumbImg.naturalWidth / thumbImg.naturalHeight
            : 1.5;
        const singleThumbHeight = containerWidth / aspectRatio;
        const totalThumbHeight = singleThumbHeight * slidesPerView + spaceBetween * (slidesPerView - 1);
        setThumbHeight(`${totalThumbHeight}px`);
      }

      // Main height
      if (mainContainerRef.current) {
        const mainImg = mainContainerRef.current.querySelector("img");
        if (mainImg && mainImg.complete) {
          const containerWidth = mainContainerRef.current.offsetWidth;
          const aspectRatio =
            mainImg.naturalWidth > 0 && mainImg.naturalHeight > 0
              ? mainImg.naturalWidth / mainImg.naturalHeight
              : 1.5;
          const calculatedHeight = containerWidth / aspectRatio;
          setMainHeight(`${calculatedHeight}px`);
        }
      }
    };

    const timer = setTimeout(updateHeights, 100);
    window.addEventListener("resize", updateHeights);
    return () => {
      window.removeEventListener("resize", updateHeights);
      clearTimeout(timer);
    };
  }, [productImg]);

  // Preload images
  useEffect(() => {
    if (productImg.length > 0) {
      productImg.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [productImg]);

  if (!product) {
    return <div>Loading...</div>; // Simple loader while fetching
  }

  return (
    <div className="mr-auto ml-auto">
      <CommonHeader />
      <div className="pt-[3.125rem] lg:pt-[100px]">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12.5 2xl:gap-25 justify-center md:px-4 sm:px-6 lg:px-10 xl:px-[3.75rem]">
          {/* Image Column */}
          <div className="w-full lg:max-w-[calc((((100vw-5rem)+2rem)/12)*7-2rem)] xl:max-w-[calc(((100vw-7.5rem)+3.125rem)/12*7-3.125rem)] 2xl:max-w-[calc(((100vw-7.5rem)+6.25rem)/12*7-6.25rem)] gap-6 flex justify-center items-start px-3.5">
            <div className="w-full flex flex-col-reverse md:flex-row">
              <div className="product__slider flex flex-row md:flex-col w-full md:w-[100px] md:mr-6 mt-6 md:mt-0">
                <div className="slider__prev cursor-pointer text-center text-sm h-auto w-8 md:h-12 md:w-auto flex items-center justify-center select-none focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hidden md:block ai ai-ChevronUp"
                  >
                    <path d="M4 15l8-8 8 8" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="md:hidden ai ai-ChevronLeft"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </div>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  direction="horizontal"
                  slidesPerView={3}
                  spaceBetween={15}
                  freeMode={true}
                  // watchSlidesProgress={true}
                  // updateOnWindowResize={true}
                  breakpoints={{
                    0: { 
                      direction: "horizontal",
                      slidesPerView: 3 
                    },
                    768: { 
                      slidesPerView: 4, 
                      direction: "vertical" 
                    },
                    1440: { 
                      slidesPerView: 4, 
                      direction: "vertical"
                    },
                  }}
                  modules={[Navigation, Thumbs]}
                  navigation={{
                    nextEl: ".slider__next",
                    prevEl: ".slider__prev",
                  }}
                  className="w-[calc(100%-64px)] mx-4 md:w-full"
                  ref={thumbContainerRef}
                >
                  {productImg.map((src, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className={`slider__image w-full h-full rounded-[10px] overflow-hidden transition duration-250 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 swiper-slide-thumb-active:grayscale-0 swiper-slide-thumb-active:opacity-100 relative before:content-[''] before:block before:float-left before:pt-[100%] after:content-[''] after:table after:clear-both bg-[#f2f2f2] ${
                          activeIndex === index
                            ? "grayscale-0 opacity-100"
                            : "grayscale opacity-50"
                        }`}
                      >
                        <img src={src} alt="" className="absolute top-0 left-0 object-contain w-full h-full block" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="slider__next cursor-pointer text-center text-sm h-auto w-8 md:h-12 md:w-auto flex items-center justify-center select-none focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hidden md:block ai ai-ChevronDown"
                  >
                    <path d="M4 9l8 8 8-8" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="md:hidden ai ai-ChevronRight"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
              <Swiper
                direction="horizontal"
                slidesPerView={1}
                spaceBetween={24}
                grabCursor={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs, Mousewheel]}
                navigation={{
                  nextEl: ".slider__next",
                  prevEl: ".slider__prev",
                }}
                breakpoints={{
                  0: { direction: "horizontal" },
                  768: { direction: "horizontal" },
                }}
                onSlideChange={handleSlideChange}
                className="w-full md:max-w-full flex-1"
                // style={{ height: mainHeight }}
                ref={mainContainerRef}
              >
                {productImg.map((src, index) => (
                  <SwiperSlide key={index}>
                    <div className="slider__image w-full h-full rounded-[10px] overflow-hidden relative before:content-[''] before:block before:float-left before:pt-[100%] 2xl:before:pt-[70%] after:content-[''] after:table after:clear-both bg-[#f2f2f2]">
                      <img
                        src={src}
                        alt=""
                        className="absolute top-0 left-0 object-contain w-full h-full block transition-transform duration-3000 group-hover:scale-110"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Details Column */}
          <div className="w-full lg:max-w-[calc((((100vw-5rem)+2rem)/12)*5-2rem)] xl:max-w-[calc((((100vw-7.5rem)+3.125rem)/12)*5-3.125rem)] 2xl:max-w-[calc((((100vw-7.5rem)+6.25rem)/12)*5-6.25rem)] text-left px-3.5">
            <h3 className="text-[1.5rem] lg:text-[2rem] font-bold mb-3.5">{product.name}</h3>
            <div className="text-xl mb-3.5 price-wrapper inline-flex items-center border border-gray-300 rounded-lg p-4 w-auto flex-auto">
              <span className="mr-3 text-[1.5rem] font-bold">₹{product.new_price.toFixed(2)}</span>
              <span className="mr-3 line-through text-[1rem] text-[#808080]">₹{product.old_price.toFixed(2)}</span>
              <span className="mr-1 text-[0.875rem] discount bg-[#111111] px-[0.375rem] text-[#FFFFFF] rounded-sm">{discount}%</span>
              <span className="mr-1 text-[0.75rem] text-[#808080] uppercase">off</span>
            </div>
            <div className="item-stock-status mb-6">
              <p className="text-2xl flex items-center">
                <span className="indicator rounded-lg inline-block h-[0.625rem] w-[0.625rem] bg-[#25D366] mr-2"></span>
                {product.quantity > 0 ? "Item in stock" : "Out of stock"}
              </p>
            </div>
            {/* Available Sizes */}
            {product?.productVariations.length > 0 &&
              <div className="mb-6">
                <h4 className="text-sm font-bold mb-2 uppercase">Size</h4>
                <div className="flex gap-2">
                  {product?.productVariations.map((size, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-[#111111] hover:text-[#FFFFFF]"
                    >
                      {size?.product_variation}
                    </button>
                  ))}
                </div>
              </div>
            }

            <div className="flex gap-4 mb-3.5">
              <div className="quantity-wrapper">
                <div className="inline-flex items-center border border-gray-300 rounded-md py-2 h-full">
                  <button
                    onClick={handleDecrement}
                    className="w-10 h-full text-gray-800 rounded-md flex items-center justify-center cursor-pointer transition"
                    disabled={quantity === 1}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 12H6"
                      />
                    </svg>
                  </button>
                  <span className="w-12 text-center text-lg font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-10 h-full text-gray-800 rounded-md flex items-center justify-center cursor-pointer transition"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <button className="flex-1 btn sm:px-[1.5rem] px-[0.9rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none">
                Add to Cart
              </button>
            </div>
            <div className="text-xl mb-6 price-wrapper flex flex-wrap rounded-lg w-auto flex-auto gap-3.5">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  getWhatsappLink(e, product, phone_number);
                }}
                className="flex-1 btn btn-outline sm:px-[1.5rem] px-[0.9rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none flex items-center justify-center">
                <span className="max-w-[1.5rem] mr-2"><img className="w-full h-auto" src={whatsapp} alt="WhatsApp" /></span>Enquiry on whatsapp
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToWishList();
                }}
                className="flex-[100%] sm:flex-1 lg:flex-[100%] 2xl:flex-1 btn btn-outline sm:px-[1.5rem] px-[0.9rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none flex items-center justify-center">
                <span className="max-w-[1.5rem] mr-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                    fill={isWishlist ? "red" : "none"}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5048 19.5L5.291 13.0513C1.37045 9.18258 7.13333 1.75337 12.5048 7.76384C17.8763 1.75337 23.6141 9.20729 19.72 13.0513L12.5048 19.5Z"
                      stroke={isWishlist ? "red" : "#111"}
                      strokeWidth="1.42857"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Wishlist
              </button>
            </div>
            {product.description && (
              <div className="description-wrapper">
                <h4 className="text-sm font-bold mb-2 uppercase">Description</h4>
                <p className="mb-4">{product?.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ProductSliderSection />
    </div>
  );
}

export default ProductDetail;