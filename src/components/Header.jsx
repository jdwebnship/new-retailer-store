import { Link } from "react-router-dom"; // For navigation links
import { useTheme } from "../contexts/ThemeContext";
import Settings from "./Settings";
import Search from "./Search";
import Profile from "./Profile";
import Cart from "./Cart";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreInfo } from "../redux/slices/storeInfoSlice";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import OrderDetailsPopup from "../model/OrderDetailsPopup";
import CartPopup from "./CartPopup";
import { closeCartPopup } from "../redux/slices/cartSlice";

function Header({ offsetY = 0, onHeightChange, hasShadow = false }) {
  const { theme, headerTextColor } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { storeInfo, loading } = useSelector((state) => state.storeInfo);
  const { isCartOpen, cartItems } = useSelector((state) => state.cart);
  const categories = storeInfo?.sub_category_list || [];
  const [isShopMegaMenuOpen, setIsShopMegaMenuOpen] = useState(false);
  const orderPopup = useSelector((state) => state.orderPopup);
  useEffect(() => {
    dispatch(fetchStoreInfo());
  }, [dispatch]);

  console.log("cartItems", cartItems);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      const h = ref.current?.offsetHeight || 0;
      onHeightChange && onHeightChange(h);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [onHeightChange]);

  // Animate header position smoothly with GSAP
  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: offsetY,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
  }, [offsetY]);

  return (
    <div>
      <header
        ref={ref}
        className={`fixed left-0 right-0 z-40 ${
          hasShadow ? "shadow-[0_8px_24px_rgba(0,0,0,0.08)]" : "shadow-none"
        }`}
        style={{
          top: 0,
          willChange: "transform, box-shadow",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
      >
        <nav
          className="flex items-center relative justify-between px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] h-[5rem]"
          style={{
            backgroundColor: theme?.headerBackgroundColor || "#ffffff",
            color: headerTextColor || "#ffffff",
            fontFamily:
              theme?.fontFamily || "system-ui, -apple-system, sans-serif",
          }}
        >
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Hamburger for mobile */}
            <button
              type="button"
              className="lg:hidden"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-drawer"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke={headerTextColor || "#111111"}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="left-nav hidden lg:flex items-center h-[5rem]">
              <Link
                className="text-[0.875rem] xl:text-[1rem] font-medium hover:!text-[#007BFF] uppercase transition-all duration-600 ease-in-out h-full flex items-center outline-none"
                to="/"
                style={{
                  color: headerTextColor || "#111111",
                  margin: "0 1rem 0 0",
                }}
              >
                Home
              </Link>

              {/* Categories Dropdown */}
              <div
                className="relative h-[5rem]"
                onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                onMouseLeave={() => setIsCategoryDropdownOpen(false)}
              >
                <Link
                  className="text-[0.875rem] xl:text-[1rem] font-medium hover:!text-[#007BFF] uppercase transition-all duration-300 h-full flex items-center outline-none"
                  to="/categories"
                  style={{
                    color: headerTextColor || "#111111",
                    margin: "0 1rem",
                  }}
                >
                  Category
                  <svg
                    className="ml-1 w-4 h-4 transition-transform duration-200"
                    style={{
                      transform: isCategoryDropdownOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>

                {/* Dropdown Menu */}
                {isCategoryDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                    style={{
                      backgroundColor:
                        theme?.headerBackgroundColor || "#ffffff",
                    }}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                      </div>
                    ) : categories.length > 0 ? (
                      categories.map((category) => {
                        return (
                          <Link
                            key={category.id}
                            to={`/shop?categories=${encodeURIComponent(
                              category.name
                            )}`}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                            style={{
                              color: headerTextColor || "#111111",
                              backgroundColor:
                                theme?.headerBackgroundColor || "#ffffff",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.backgroundColor =
                                "rgba(0,0,0,0.05)")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.backgroundColor =
                                theme?.headerBackgroundColor || "#ffffff")
                            }
                          >
                            {category.name}
                          </Link>
                        );
                      })
                    ) : (
                      <div className="flex items-center justify-center p-4">
                        <p className="text-sm text-gray-500">
                          No categories found
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Shop Mega Menu */}

              <div
                className="relative h-[5rem]"
                onMouseEnter={() => setIsShopMegaMenuOpen(true)}
                onMouseLeave={() => setIsShopMegaMenuOpen(false)}
              >
                <Link
                  className="text-[0.875rem] xl:text-[1rem] font-medium hover:!text-[#007BFF] uppercase transition-all duration-300 h-full flex items-center outline-none"
                  to="/shop"
                  style={{
                    color: headerTextColor || "#111111",
                    margin: "0 1rem",
                  }}
                >
                  Shop
                </Link>
                {isShopMegaMenuOpen && (
                  <div
                    className="fixed left-0 top-[100%] px-8 py-15 bg-white border border-gray-200 shadow-2xl z-50 w-[100vw]"
                    style={{
                      backgroundColor: theme?.headerBackgroundColor || "#fff",
                    }}
                  >
                    {/* Mega menu content */}
                    <div className="flex items-center justify-center min-h-[160px] w-full">
                      {loading ? (
                        <div className="flex items-center justify-center p-4 w-full">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        </div>
                      ) : categories.length > 0 ? (
                        <div className="w-full max-w-[100rem]">
                          <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={8}
                            navigation={{
                              nextEl: ".swiper-button-next-custom",
                              prevEl: ".swiper-button-prev-custom",
                            }}
                            pagination={{
                              clickable: true,
                              dynamicBullets: true,
                            }}
                            autoplay={{
                              delay: 3000,
                              disableOnInteraction: false,
                            }}
                            loop={categories.length > 8}
                            breakpoints={{
                              320: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                              },
                              640: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                              },
                              768: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                              },
                              1024: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                              },
                              1280: {
                                slidesPerView: 8,
                                spaceBetween: 20,
                              },
                            }}
                            className="categories-swiper"
                          >
                            {categories.map((category, idx) => (
                              <SwiperSlide key={category.id || idx}>
                                <div className="flex flex-col items-center group">
                                  <Link
                                    to={`/shop?categories=${encodeURIComponent(
                                      category.name
                                    )}`}
                                    className="flex flex-col items-center w-full"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <div className="w-[6rem] h-[6rem] rounded-2xl bg-[#F7F7F7] flex items-center justify-center mb-2 overflow-hidden">
                                      {category.image ? (
                                        <img
                                          src={category.image}
                                          alt={category.name}
                                          className="object-contain w-15 h-15 transition-transform duration-200 group-hover:scale-105"
                                        />
                                      ) : (
                                        <div className="w-12 h-12 bg-gray-200 rounded" />
                                      )}
                                    </div>
                                    <span className="text-sm text-center text-[#111] group-hover:text-[#007BFF] transition-colors duration-200 block w-full break-words">
                                      {category.name}
                                    </span>
                                  </Link>
                                </div>
                              </SwiperSlide>
                            ))}

                            {/* Custom Navigation Buttons */}
                            <div className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-[#F7F7F7] rounded-full shadow-sm flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                              <svg
                                width="25"
                                height="25"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#007BFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m15 18-6-6 6-6" />
                              </svg>
                            </div>
                            <div className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-[#F7F7F7] rounded-full shadow-sm flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                              <svg
                                width="25"
                                height="25"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#007BFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m9 18 6-6-6-6" />
                              </svg>
                            </div>
                          </Swiper>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center p-4 w-full">
                          <p className="text-sm text-gray-500">
                            No categories found
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Link
            className="center-nav flex-1 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            to="/"
          >
            {storeInfo?.storeinfo?.logo?.trim() ? (
              <img
                src={storeInfo.storeinfo.logo}
                alt={storeInfo?.storeinfo?.store_name || "Store logo"}
                className="sm:w-16 sm:h-16 w-14 h-14"
              />
            ) : (
              <h1
                className="uppercase text-[1.125rem] sm:text-[20px] lg:text-[1.5rem] xl:text-[2rem] font-medium text-center"
                style={{ color: headerTextColor || "#111111" }}
              >
                {storeInfo?.storeinfo?.store_name || "Store name"}
              </h1>
            )}
          </Link>
          <div className="right-nav flex items-center gap-3 sm:gap-4 h-[5rem]">
            <div className="hidden lg:flex items-center h-[5rem]">
              <Link
                className="text-[0.875rem] xl:text-[1rem] font-medium hover:!text-[#007BFF] uppercase transition-all duration-300 py-3 h-full flex items-center outline-none"
                to="/about"
                style={{
                  color: headerTextColor || "#111111",
                  margin: "0 1rem",
                }}
              >
                About Us
              </Link>
              <Link
                className="text-[0.875rem] xl:text-[1rem] font-medium hover:!text-[#007BFF] uppercase transition-all duration-300 py-3 h-full flex items-center outline-none"
                to="/contact"
                style={{
                  color: headerTextColor || "#111111",
                  margin: "0 1rem",
                }}
              >
                Contact Us
              </Link>
            </div>
            <Search />
            <Profile />
            <Cart />
            {/* <Settings /> */}
          </div>
          {/* Add more links as needed */}
        </nav>

        {/* Overlay */}
        {isMenuOpen && (
          <button
            type="button"
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Drawer */}
        {/* <div className="overlay w-full h-dvh fixed top-0 left-0 bg-[rgba(0,0,0,.65)] z-99"></div> */}
        <aside
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          className={`fixed top-0 left-0 h-[100vh] w-72 max-w-[80%] z-100 lg:hidden transform transition-transform duration-300 ease-out border-r border-black/10`}
          style={{
            backgroundColor: theme?.headerBackgroundColor || "#ffffff",
            color: headerTextColor || "#111111",
            fontFamily:
              theme?.fontFamily || "system-ui, -apple-system, sans-serif",
            transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
            <span className="uppercase font-semibold">
              {storeInfo?.storeinfo?.store_name ?? "Store name"}
            </span>
            <button
              type="button"
              className="inline-flex items-center justify-center w-10 h-10"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
              autoFocus
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke={headerTextColor || "#111111"}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col p-4 gap-2 items-start h-dvh bg-white overflow-y-auto">
            <Link
              to="/"
              className="px-3 py-2 rounded hover:bg-black/10 transition uppercase text-sm"
              style={{ color: headerTextColor || "#111111" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Categories Dropdown */}
            <div className="w-full">
              <button
                className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-black/10 transition uppercase text-sm"
                style={{ color: headerTextColor || "#111111" }}
                onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
              >
                Category
                <svg
                  className="w-4 h-4 transition-transform duration-200"
                  style={{
                    transform: isMobileCategoryOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Mobile Categories List */}
              {isMobileCategoryOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {loading ? (
                    <div className="flex items-center justify-center p-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                  ) : categories.length > 0 ? (
                    categories.map((category, index) => (
                      <Link
                        key={index}
                        to={`/shop?categories=${encodeURIComponent(
                          category.name
                        )}`}
                        className="block px-3 py-2 rounded hover:bg-black/10 transition text-sm"
                        style={{ color: headerTextColor || "#111111" }}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsMobileCategoryOpen(false);
                        }}
                      >
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <div className="flex items-center justify-center p-4">
                      <p className="text-sm text-gray-500">
                        No categories found
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link
              to="/shop"
              className="px-3 py-2 rounded hover:bg-black/10 transition uppercase text-sm"
              style={{ color: headerTextColor || "#111111" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded hover:bg-black/10 transition uppercase text-sm"
              style={{ color: headerTextColor || "#111111" }}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded hover:bg-black/10 transition uppercase text-sm"
              style={{ color: headerTextColor || "#111111" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </nav>
        </aside>
      </header>
      {/* Cart POP up */}
      {isCartOpen && (
        <CartPopup
          items={cartItems}
          onClose={() => dispatch(closeCartPopup())}
        />
      )}

      {orderPopup?.open && <OrderDetailsPopup />}
    </div>
  );
}

export default Header;
