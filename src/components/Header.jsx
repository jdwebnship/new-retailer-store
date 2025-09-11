import { Link } from "react-router-dom"; // For navigation links
import { useTheme } from "../contexts/ThemeContext";
import Settings from "./Settings";
import Search from "./Search";
import Profile from "./Profile";
import Cart from "./Cart";
import { useState, useEffect, useRef } from "react";

const categories = ["Men's Watch", "T-shirts", "Jeans", "Shirts"];

function Header({ offsetY = 0, onHeightChange }) {
  const { theme, headerTextColor } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const ref = useRef(null);

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

  return (
    <header
      ref={ref}
      className="fixed left-0 right-0 z-40 transition-transform duration-300 ease-out"
      style={{ top: offsetY }}
    >
      <nav
        className="flex items-center relative justify-between px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] py-[0.75] lg:py-[1.5rem]"
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

          <div className="left-nav hidden lg:flex items-center">
            <Link
              className="text-[0.875rem] xl:text-[1rem] font-medium uppercase hover:underline transition-all duration-300"
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
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <Link
                className="text-[0.875rem] xl:text-[1rem] font-medium uppercase hover:underline transition-all duration-300 flex items-center"
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
                  className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                  style={{
                    backgroundColor: theme?.headerBackgroundColor || "#ffffff",
                  }}
                >
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/categories/${category
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                      style={{
                        color: headerTextColor || "#111111",
                        backgroundColor:
                          theme?.headerBackgroundColor || "#ffffff",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "rgba(0,0,0,0.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor =
                          theme?.headerBackgroundColor || "#ffffff")
                      }
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              className="text-[0.875rem] xl:text-[1rem] font-medium uppercase hover:underline transition-all duration-300"
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
          <h1
            className="uppercase text-[1.125rem] sm:text-[20px] lg:text-[1.5rem] xl:text-[2rem] font-medium text-center"
            style={{ color: headerTextColor || "#111111" }}
          >
            Store name
          </h1>
        </Link>
        <div className="right-nav flex items-center gap-3 sm:gap-4">
          <div className="hidden lg:flex items-center">
            <Link
              className="text-[0.875rem] xl:text-[1rem] font-medium uppercase hover:underline transition-all duration-300"
              to="/about"
              style={{
                color: headerTextColor || "#111111",
                margin: "0 1rem",
              }}
            >
              About Us
            </Link>
            <Link
              className="text-[0.875rem] xl:text-[1rem] font-medium uppercase hover:underline transition-all duration-300"
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
          <span className="uppercase font-semibold">Store name</span>
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
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/categories/${category
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="block px-3 py-2 rounded hover:bg-black/10 transition text-sm"
                    style={{ color: headerTextColor || "#111111" }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMobileCategoryOpen(false);
                    }}
                  >
                    {category}
                  </Link>
                ))}
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
  );
}

export default Header;
