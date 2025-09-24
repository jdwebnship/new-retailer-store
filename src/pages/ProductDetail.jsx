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
import {
  fetchProducts,
  fetchProductsDetails,
} from "../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { getWhatsappLink, isInWishlist } from "../utils/common";
import {
  addtowishList,
  removeFromwishList,
} from "../redux/slices/WishListSlice";
import useVariantQuery from "../hooks/useVariantQuery";
import { toast } from "react-toastify";
import { addToCart, openCartPopup } from "../redux/slices/cartSlice";
import useCartQuantity from "../hooks/useCartQuantity";
import LoadingButton from "../components/LoadingButton";
import placeholderImage from "../assets/images/placeholder.png";
import Loader from "../components/Loader";

function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const [productVariations, setProductVariations] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [variant, setVariant] = useVariantQuery(productVariations);

  const { productDetails, loading: productLoading } = useSelector(
    (state) => state.products
  );
  const { wishlist } = useSelector((state) => state.wishlist);
  const { storeInfo } = useSelector((state) => state.storeInfo);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems, addLoading } = useSelector((state) => state.cart);

  const phone_number = storeInfo?.storeinfo?.retailer?.phone_number;
  const product = productDetails?.product;
  const wishlistData = wishlist?.data?.wishlist;
  const productImg = React.useMemo(
    () => (product?.product_images ? product.product_images.split(",") : []),
    [product?.product_images]
  );

  const productVideo = product?.product_video;
  const galleryItems = React.useMemo(() => {
    const items = [...(productImg || [])];
    if (productVideo) items.push(productVideo);
    return items;
  }, [productImg, productVideo]);

  const isWishlist =
    (isAuthenticated && isInWishlist(product?.id, wishlistData)) || false;

  const [thumbHeight, setThumbHeight] = useState("515px");
  const [mainHeight, setMainHeight] = useState("400px");
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

    if (productDetails?.product?.sub_category_id) {
      dispatch(
        fetchProducts({
          sub_category: productDetails?.product?.sub_category_id,
          page: 1,
        })
      );
    }
  }, [slug, dispatch, navigate]);

  useEffect(() => {
    if (product?.productVariations?.length) {
      setProductVariations(product.productVariations);

      // // If there's only one variant, select it by default
      if (product.productVariations.length === 1) {
        setVariant(product.productVariations[0].product_variation);
      }
    } else {
      setProductVariations([]);
    }
  }, [product?.productVariations]);

  const handleVariantSelect = (selectedVariant) => {
    setVariant(selectedVariant);
    // setQuantity(1); // Reset quantity when variant changes
  };

  const discount =
    product?.old_price && product?.final_price
      ? (
          ((product?.old_price - product?.final_price) / product?.old_price) *
          100
        ).toFixed(0)
      : 0;

  const selectedVariant = productVariations.find(
    (v) => v.product_variation === variant
  );

  const cartQuantity = cartItems
    ?.filter(
      (item) =>
        item.product_id === product?.id &&
        (!selectedVariant || item.selected_variant?.id === selectedVariant.id)
    )
    .reduce((sum, item) => sum + item.quantity, 0);

  const availableStock = selectedVariant?.stock ?? product?.quantity ?? 0;
  const { quantity, increase, decrease, canIncrease, canDecrease } =
    useCartQuantity(1, 5, availableStock, cartQuantity, selectedVariant?.id);

  const handleAddToCart = () => {
    // e.stopPropagation();
    if (availableStock === 0) {
      toast.warning("Product is not avaliable");
    } else if (cartQuantity + quantity > availableStock) {
      toast.warning("Cannot add more than available stock");
    } else if (productVariations?.length) {
      if (selectedVariant) {
        dispatch(
          addToCart({
            item: {
              ...product,
              selectedVariant: {
                id: selectedVariant.id,
                product_variation: selectedVariant.product_variation,
                final_price: selectedVariant.final_price,
                stock: selectedVariant.stock,
              },
            },
            quantity,
          })
        );
      } else {
        toast.warning("Please select a size");
      }
    } else {
      dispatch(
        addToCart({
          item: {
            ...product,
          },
          quantity,
        })
      );
    }
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
          thumbImg &&
          thumbImg.complete &&
          thumbImg.naturalWidth > 0 &&
          thumbImg.naturalHeight > 0
            ? thumbImg.naturalWidth / thumbImg.naturalHeight
            : 1.5;
        const singleThumbHeight = containerWidth / aspectRatio;
        const totalThumbHeight =
          singleThumbHeight * slidesPerView +
          spaceBetween * (slidesPerView - 1);
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

  return (
    <div className="mr-auto ml-auto">
      {productLoading ? "" : <CommonHeader />}
      {productLoading ? (
        <Loader />
      ) : (
        <div className="pt-[3.125rem] lg:pt-[100px]">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12.5 2xl:gap-25 justify-center md:px-4 sm:px-6 lg:px-10 xl:px-[3.75rem]">
            {/* Image Column */}
            <div className="w-full lg:max-w-[calc((((100vw-5rem)+2rem)/12)*7-2rem)] xl:max-w-[calc(((100vw-7.5rem)+3.125rem)/12*7-3.125rem)] 2xl:max-w-[calc(((100vw-7.5rem)+6.25rem)/12*7-6.25rem)] gap-6 flex justify-center items-start px-3.5 pr-0">
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
                    breakpoints={{
                      0: {
                        direction: "horizontal",
                        slidesPerView: 3,
                      },
                      768: {
                        slidesPerView: 4,
                        direction: "vertical",
                      },
                      1440: {
                        slidesPerView: 4,
                        direction: "vertical",
                      },
                    }}
                    modules={[Navigation, Thumbs]}
                    navigation={{
                      nextEl: ".thumb__next",
                      prevEl: ".thumb__prev",
                    }}
                    className="w-[calc(100%-64px)] mx-4 md:w-full"
                    ref={thumbContainerRef}
                  >
                    {galleryItems.length > 0
                      ? galleryItems.map((item, index) => (
                          <SwiperSlide key={index}>
                            <div
                              className={`slider__image w-full h-full rounded-[10px] overflow-hidden transition duration-250 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 swiper-slide-thumb-active:grayscale-0 swiper-slide-thumb-active:opacity-100 relative before:content-[''] before:block before:float-left before:pt-[100%] after:content-[''] after:table after:clear-both ${
                                activeIndex === index
                                  ? "grayscale-0 opacity-100"
                                  : "grayscale opacity-50"
                              }`}
                            >
                              {item && item.endsWith(".mp4") ? (
                                <video
                                  src={item}
                                  controls
                                  className="absolute top-0 left-0 object-contain w-full h-full block"
                                />
                              ) : item ? (
                                <img
                                  src={item}
                                  alt={product?.name}
                                  className="absolute top-0 left-0 object-contain w-full h-full block"
                                />
                              ) : (
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-500">
                                  <img
                                    src={placeholderImage}
                                    alt="No image"
                                    className="w-1/2 h-1/2 object-contain"
                                  />
                                </div>
                              )}
                            </div>
                          </SwiperSlide>
                        ))
                      : ""}
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
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
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
                  onImagesReady={(swiper) => {
                    if (mainContainerRef.current) {
                      const mainImg =
                        mainContainerRef.current.querySelector("img");
                      if (mainImg && mainImg.complete) {
                        const containerWidth =
                          mainContainerRef.current.offsetWidth;
                        const aspectRatio =
                          mainImg.naturalWidth > 0 && mainImg.naturalHeight > 0
                            ? mainImg.naturalWidth / mainImg.naturalHeight
                            : 1.5;
                        const calculatedHeight = containerWidth / aspectRatio;
                        setMainHeight(`${calculatedHeight}px`);
                      }
                    }
                  }}
                  className="w-full md:max-w-full flex-1"
                  ref={mainContainerRef}
                >
                  {galleryItems.length > 0 ? (
                    galleryItems.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className="slider__image w-full h-full rounded-[10px] overflow-hidden relative before:content-[''] before:block before:float-left before:pt-[100%] 2xl:before:pt-[100%] after:content-[''] after:table after:clear-both bg-[#f2f2f2]">
                          {item && item.endsWith(".mp4") ? (
                            <video
                              src={item}
                              controls={false}
                              className="absolute top-0 left-0 object-contain w-full h-full block"
                              onClick={(e) => (e.currentTarget.controls = true)}
                              onPlay={(e) => {
                                // Hide controls after 2s, so swipe works again
                                // setTimeout(() => {
                                e.currentTarget.controls = false;
                                // }, 2000);
                              }}
                            />
                          ) : item ? (
                            <img
                              src={item}
                              alt={product?.name}
                              onClick={() => setLightboxImage(item)}
                              className="absolute top-0 left-0 object-contain w-full h-full block transition-transform duration-3000 group-hover:scale-110"
                            />
                          ) : (
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#f2f2f2] text-gray-500">
                              <img
                                src={placeholderImage}
                                alt="No image"
                                className="w-1/2 h-1/2 object-contain"
                              />
                            </div>
                          )}
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <div className="slider__image w-full h-full rounded-[10px] overflow-hidden relative before:content-[''] before:block before:float-left before:pt-[100%] 2xl:before:pt-[100%] after:content-[''] after:table after:clear-both bg-[#f2f2f2] flex items-center justify-center text-gray-500">
                        <img
                          src={placeholderImage}
                          alt="No image"
                          className="w-1/2 h-1/2 object-contain"
                        />
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>
                {lightboxImage !== null && (
                  <div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 bg-opacity-80"
                    onClick={() => setLightboxImage(null)}
                  >
                    <div className="w-full max-w-[600px] h-[80vh] rounded-lg p-6 overflow-auto">
                      <Swiper
                        direction="horizontal"
                        slidesPerView={1}
                        height="auto"
                        spaceBetween={24}
                        grabCursor={true}
                        thumbs={{
                          swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed
                              ? thumbsSwiper
                              : null,
                        }}
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
                        onImagesReady={(swiper) => {
                          if (mainContainerRef.current) {
                            const mainImg =
                              mainContainerRef.current.querySelector("img");
                            if (mainImg && mainImg.complete) {
                              const containerWidth =
                                mainContainerRef.current.offsetWidth;
                              const aspectRatio =
                                mainImg.naturalWidth > 0 &&
                                mainImg.naturalHeight > 0
                                  ? mainImg.naturalWidth / mainImg.naturalHeight
                                  : 1.5;
                              const calculatedHeight =
                                containerWidth / aspectRatio;
                              setMainHeight(`${calculatedHeight}px`);
                            }
                          }
                        }}
                        className="w-full md:max-w-full flex-1 h-full"
                        ref={mainContainerRef}
                      >
                        {galleryItems.length > 0 ? (
                          galleryItems.map((item, index) => (
                            <SwiperSlide key={index}>
                              <div className="slider__image w-full h-full rounded-[10px] overflow-hidden relative before:content-[''] before:block before:float-left before:pt-[100%] 2xl:before:pt-[100%] after:content-[''] after:table after:clear-both backdrop-blur-sm p-6">
                                {item && item.endsWith(".mp4") ? (
                                  <video
                                    src={item}
                                    controls={false}
                                    className="absolute top-0 left-0 object-contain w-full h-full block"
                                    onClick={(e) =>
                                      (e.currentTarget.controls = true)
                                    }
                                    onPlay={(e) => {
                                      // Hide controls after 2s, so swipe works again
                                      // setTimeout(() => {
                                      e.currentTarget.controls = false;
                                      // }, 2000);
                                    }}
                                  />
                                ) : item ? (
                                  <img
                                    src="https://images.pexels.com/photos/1822845/pexels-photo-1822845.jpeg"
                                    alt={item}
                                    className="absolute top-0 left-0 object-cover w-full h-full block transition-transform duration-3000 group-hover:scale-110"
                                  />
                                ) : (
                                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-500">
                                    <img
                                      src={placeholderImage}
                                      alt="No image"
                                      className="w-1/2 h-1/2 object-contain"
                                    />
                                  </div>
                                )}
                              </div>
                            </SwiperSlide>
                          ))
                        ) : (
                          <SwiperSlide>
                            <div className="slider__image w-full h-full rounded-[10px] overflow-hidden relative before:content-[''] before:block before:float-left before:pt-[100%] 2xl:before:pt-[100%] after:content-[''] after:table after:clear-both flex items-center justify-center text-gray-500">
                              <img
                                src={placeholderImage}
                                alt="No image"
                                className="w-1/2 h-1/2 object-contain"
                              />
                            </div>
                          </SwiperSlide>
                        )}
                      </Swiper>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Details Column */}
            <div className="w-full lg:max-w-[calc((((100vw-5rem)+2rem)/12)*5-2rem)] xl:max-w-[calc((((100vw-7.5rem)+3.125rem)/12)*5-3.125rem)] 2xl:max-w-[calc((((100vw-7.5rem)+6.25rem)/12)*5-6.25rem)] text-left px-3.5">
              <h3 className="text-[1.5rem] lg:text-[2rem] font-bold mb-3.5 text-[#111111]">
                {product?.name}
              </h3>
              <div className="text-xl mb-3.5 price-wrapper inline-flex items-center border border-gray-300 rounded-[0.625rem] p-4 w-auto flex-auto">
                <span className="text-[1.5rem] font-bold text-[#111111]">
                  ₹{product?.final_price}
                </span>
                {product?.old_price > 0 && (
                  <>
                    <span className="mx-3 line-through text-[1rem] text-[#808080]">
                      ₹{product?.old_price}
                    </span>

                    <span className="mr-1 text-[0.875rem] discount bg-[#111111] px-[0.375rem] text-[#FFFFFF] rounded-sm">
                      {discount}%
                    </span>
                    <span className="mr-1 text-[0.75rem] text-[#808080] uppercase">
                      off
                    </span>
                  </>
                )}
              </div>
              <div className="item-stock-status mb-6  border-b border-[#111111]/15 pb-6">
                <p className="text-2xl flex items-center">
                  <span className="indicator rounded-[0.625rem] inline-block h-[0.625rem] w-[0.625rem] bg-[#25D366] mr-2"></span>
                  {product?.quantity > 0 ? "In stock" : "Out of stock"}
                </p>
              </div>
              {/* Available Sizes */}
              {(product?.variations?.length > 0 ||
                product?.productVariations?.length > 0) && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold mb-2 uppercase">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {productVariations?.map((item) => (
                      <button
                        key={item.id}
                        disabled={!item?.stock}
                        onClick={() =>
                          handleVariantSelect(item?.product_variation)
                        }
                        className={`px-5 disabled:opacity-50 relative overflow-hidden py-3 text-[#111111] cursor-pointer text-[16px] font-medium border border-[#E6E7E8] rounded-[0.625rem] ${
                          variant === item?.product_variation
                            ? "!border-[#111111]"
                            : ""
                        }`}
                      >
                        {item?.product_variation}
                        {item?.stock <= 0 && (
                          <span className="absolute top-0 left-0 w-full h-full bg-white/70"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-4 mb-3.5">
                <div className="quantity-wrapper">
                  <div className="inline-flex items-center border border-gray-300 rounded-[0.625rem] py-2 h-full">
                    <button
                      onClick={decrease}
                      className="w-10 h-full text-gray-800 rounded-[0.625rem] flex items-center justify-center cursor-pointer transition"
                      disabled={!canDecrease}
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
                    <span className="w-12 text-center text-lg font-medium text-[#111111]">
                      {quantity}
                    </span>
                    <button
                      onClick={increase}
                      className="w-10 h-full text-gray-800 rounded-[0.625rem] flex items-center justify-center cursor-pointer transition disabled:cursor-not-allowed"
                      disabled={!canIncrease}
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
                <LoadingButton
                  loading={addLoading}
                  // loading={false}
                  onClick={() => {
                    if (!canIncrease) {
                      dispatch(openCartPopup());
                    } else {
                      handleAddToCart();
                    }
                  }}
                  text={!canIncrease ? "Go to Cart" : "Add to Cart"}
                />
              </div>
              <div className="text-xl mb-6 price-wrapper flex flex-wrap rounded-[0.625rem] w-auto flex-auto gap-3.5">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    getWhatsappLink(e, product, phone_number);
                  }}
                  className="flex-1 !text-[#25D366] !border-[#25D366] btn btn-outline sm:px-[1.5rem] px-[0.9rem] py-[0.9375rem] rounded-[0.625rem] text-base focus:outline-none flex items-center justify-center"
                >
                  <span className="max-w-[1.5rem] mr-2">
                    <img
                      className="w-full h-auto"
                      src={whatsapp}
                      alt="WhatsApp"
                    />
                  </span>
                  Enquiry on whatsapp
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToWishList();
                  }}
                  className="flex-[100%] text-[#111111] sm:flex-1 lg:flex-[100%] 2xl:flex-1 btn btn-outline sm:px-[1.5rem] px-[0.9rem] py-[0.9375rem] rounded-[0.625rem] text-base focus:outline-none flex items-center justify-center"
                >
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
              {product?.description && (
                <div className="description-wrapper border-t border-[#111111]/15 pt-6">
                  <h4 className="text-sm font-bold mb-4 text-[#111111] lg:text-2xl">
                    Product Summary
                  </h4>
                  <div
                    className="mb-4 text-[#111111] text-lg"
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <ProductSliderSection />
    </div>
  );
}

export default ProductDetail;
