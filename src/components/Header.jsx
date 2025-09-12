import { Link } from "react-router-dom"; // For navigation links
import { useTheme } from "../contexts/ThemeContext";
import Settings from "./Settings";
import Search from "./Search";
import Profile from "./Profile";
import Cart from "./Cart";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreInfo } from "../redux/slices/storeInfoSlice";
import s05 from "../assets/images/s-05.jpg";
import close from "../assets/images/close.png";
import copy_icon from "../assets/images/copy_icon.png";
import { gsap } from "gsap";

function Header({ offsetY = 0, onHeightChange, hasShadow = false }) {
  const { theme, headerTextColor } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { storeInfo, loading } = useSelector((state) => state.storeInfo);
  const categories = storeInfo?.sub_category_list || [];

  useEffect(() => {
    dispatch(fetchStoreInfo());
  }, [dispatch]);

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
          className="flex items-center relative justify-between px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] h-[5rem] shadow-sm"
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
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md bg-black/10 hover:bg-black/15 transition"
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
                className="text-[0.875rem] xl:text-[1rem] font-medium hover:!text-[#007BFF] uppercase transition-all duration-600 ease-in-out h-full flex items-center"
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
                  className="text-[0.875rem] xl:text-[1rem] font-medium hover:!text-[#007BFF] uppercase transition-all duration-300 h-full flex items-center"
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

              <Link
                className="text-[0.875rem] xl:text-[1rem] font-medium hover:!text-[#007BFF] uppercase transition-all duration-300 h-full flex items-center"
                to="/shop"
                style={{
                  color: headerTextColor || "#111111",
                  margin: "0 1rem",
                }}
              >
                Shop
              </Link>
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
                className="w-12 h-12"
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
          <div className="right-nav flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:flex items-center">
              <Link
                className="text-[0.875rem] xl:text-[1rem] font-medium hover:!text-[#007BFF] uppercase transition-all duration-300 py-3"
                to="/about"
                style={{
                  color: headerTextColor || "#111111",
                  margin: "0 1rem",
                }}
              >
                About Us
              </Link>
              <Link
                className="text-[0.875rem] xl:text-[1rem] font-medium hover:!text-[#007BFF] uppercase transition-all duration-300 py-3"
                to="/about"
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
            <Settings />
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
        <aside
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          className={`fixed top-0 left-0 h-full w-72 max-w-[80%] z-50 lg:hidden transform transition-transform duration-300 ease-out border-r border-black/10`}
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
              className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-black/10 hover:bg-black/15 transition"
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
          <nav className="flex flex-col p-4 gap-2 items-start">
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
      {/* Cart POP up Start*/}
      {/* <div className="overlay w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,.65)] z-99"></div>
      <div className="cart-popup flex flex-col justify-between fixed right-0 top-0 z-100 w-full max-w-[31.25rem] h-dvh bg-white shadow-lg p-7.5 overflow-y-auto">
        <div>
          <div className="flex justify-between items-center border-b border-[#11111126] pb-5 mb-6">
            <h2 className="text-2xl font-bold">Cart(3)</h2>
            <img src={close} alt="" />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <img
                src={s05}
                alt=""
                className="sm:w-25 sm:h-25 w-20 h-20 rounded-[1.125rem] object-cover"
              />
              <div className="flex-1 flex flex-col justify-between gap-2">
                <div className="flex justify-between">
                  <p className="text-base font-bold">
                    Longine_s Heritage Classic...
                  </p>
                  <p className="text-base font-bold">₹3,298</p>
                </div>
                <div className="text-left">
                  <span className="leading-none inline-block text-base text-[#AAAAAA]">
                    Size:
                    <strong className="font-bold text-[#111111] ml-2">L</strong>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center border border-[#AAAAAA] rounded-lg w-fit">
                    <button
                      className="px-2.5 py-1 cursor-pointer"
                      style={{ minWidth: "1.2rem" }}
                    >
                      -
                    </button>
                    <span className="px-3">2</span>
                    <button
                      className="px-2.5 py-1 cursor-pointer"
                      style={{ minWidth: "1.2rem" }}
                    >
                      +
                    </button>
                  </div>
                  <button className="text-sm text-[#111111] underline cursor-pointer hover:text-[#007BFF] transition-all duration-300">
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <img
                src={s05}
                alt=""
                className="sm:w-25 sm:h-25 w-20 h-20 rounded-[1.125rem] object-cover"
              />
              <div className="flex-1 flex flex-col justify-between gap-2">
                <div className="flex justify-between">
                  <p className="text-base font-bold">
                    Longine_s Heritage Classic...
                  </p>
                  <p className="text-base font-bold">₹3,298</p>
                </div>
                <div className="text-left">
                  <span className="leading-none inline-block text-base text-[#AAAAAA]">
                    Size:
                    <strong className="font-bold text-[#111111] ml-2">L</strong>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center border border-[#AAAAAA] rounded-lg w-fit">
                    <button
                      className="px-2.5 py-1 cursor-pointer"
                      style={{ minWidth: "1.2rem" }}
                    >
                      -
                    </button>
                    <span className="px-3">2</span>
                    <button
                      className="px-2.5 py-1 cursor-pointer"
                      style={{ minWidth: "1.2rem" }}
                    >
                      +
                    </button>
                  </div>
                  <button className="text-sm text-[#111111] underline cursor-pointer hover:text-[#007BFF] transition-all duration-300">
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <img
                src={s05}
                alt=""
                className="sm:w-25 sm:h-25 w-20 h-20 rounded-[1.125rem] object-cover"
              />
              <div className="flex-1 flex flex-col justify-between gap-2">
                <div className="flex justify-between">
                  <p className="text-base font-bold">
                    Longine_s Heritage Classic...
                  </p>
                  <p className="text-base font-bold">₹3,298</p>
                </div>
                <div className="text-left">
                  <span className="leading-none inline-block text-base text-[#AAAAAA]">
                    Size:
                    <strong className="font-bold text-[#111111] ml-2">L</strong>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center border border-[#AAAAAA] rounded-lg w-fit">
                    <button
                      className="px-2.5 py-1 cursor-pointer"
                      style={{ minWidth: "1.2rem" }}
                    >
                      -
                    </button>
                    <span className="px-3">2</span>
                    <button
                      className="px-2.5 py-1 cursor-pointer"
                      style={{ minWidth: "1.2rem" }}
                    >
                      +
                    </button>
                  </div>
                  <button className="text-sm text-[#111111] underline cursor-pointer hover:text-[#007BFF] transition-all duration-300">
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 border-t border-[#11111126] pt-6">
          <button className="btn py-4 rounded-md cursor-pointer">
            CHECKOUT
          </button>
          <button className="border border-black hover:bg-black hover:text-white transition-all duration-300 py-4 rounded-md cursor-pointer uppercase">
            View Cart
          </button>
          <a className="text-[#111111] text-lg underline hover:text-[#007BFF] cursor-pointer transition-all duration-300 text-center">
            CONTINUE SHOPPING
          </a>
        </div>
      </div> */}
      {/* Cart POP up End*/}

      {/* Order POP up Start*/}
      {/* <div className="overlay w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,.65)] z-99"></div>
      <div className="fixed top-0 right-0 z-100 w-full max-w-[50rem]">
        <div className="relative bg-white border border-white/20 w-full max-w-[50rem] h-dvh overflow-y-auto sm:p-7.5 p-4 mx-auto">

          <div className="relative pb-6 mb-6 border-b border-[#11111126]">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#111111]">
                  Order Details
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-[#111111] font-mono text-lg">
                    #80879571220
                  </span>
                  <img className="cursor-pointer w-4 h-4" src={copy_icon} alt="" />
                </div>                
              </div>
                <img className="cursor-pointer w-4 h-4 mt-1.5" src={close} alt="" />
            </div>
          </div>

          <div className="relative flex sm:flex-row flex-col sm:items-center justify-between gap-4 p-6 bg-[#FFF7F2] rounded-[0.625rem]">
            <div className="">
              <div className="text-[#000000] text-sm mb-1 uppercase">Order Date:</div>
              <div className="text-[#000000] text-sm font-bold">08 September 2025</div>
            </div>
            <div className="">
              <div className="text-[#000000] text-sm mb-1 uppercase">TOTAL:</div>
              <div className="text-[#000000] text-sm font-bold">08 Sep, 2025</div>
            </div>
            <div className="">
              <div className="text-[#000000] text-sm mb-1 uppercase">STATUS:</div>
              <div className="text-[#000000] text-sm font-bold">
                Order Placed
              </div>
            </div>
          </div>

          <div className="relative pt-6">
            <div className="border border-[#00000026] rounded-[1.125rem] p-6">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h3 className="text-[#000000] font-bold text-base mb-1">
                    SHIP TO:
                  </h3>
                  <div className="space-y-1 text-[#000000]">
                    <div className="text-[#000000]">John Doe</div>
                    <div>john.doe@example.com</div>
                    <div>9510207888</div>
                    <div className="leading-relaxed">
                      123 Main Street, City, Los Angeles, California, 395023
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pt-6">
            <div className="border border-[#00000026] rounded-[1.125rem] p-6">
              <div className="flex items-start gap-3">
                <div>
                  <h3 className="text-[#000000] font-bold">
                    PAYMENT:
                  </h3>
                  <div className="text-[#000000]">Pay on delivery</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pt-6">
            <div className="border border-[#00000026] rounded-[1.125rem] p-6">
              <div className="flex items-start gap-3 mb-2">
                <h3 className="text-[#000000] font-bold">
                  ORDER SUMMARY:
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#000000]">Amount:</span>
                  <span className="text-[#000000]">₹29,682</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#000000]">Subtotal:</span>
                  <span className="text-[#000000]">₹29,682</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#000000]">Shipping Cost:</span>
                  <span className="text-[#000000]">Free</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-[#000000] font-bold">Total</span>
                  <span className="text-[#000000] font-bold">₹29,682</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pt-6 mt-6 border-t border-[#11111126]">
            <button className="w-full btn py-4 px-6 rounded-2xl">
              <span className="text-lg">BUY IT AGAIN</span>
            </button>
          </div>
        </div>
      </div> */}
      {/* Order POP up End*/}
    </div>
  );
}

export default Header;
