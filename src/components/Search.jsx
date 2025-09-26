import { useState, useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSearchProducts } from "../redux/slices/productSlice";

function Search() {
  const { headerTextColor } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle escape key to close search
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    const handleClickOutside = (event) => {
      if (
        isSearchOpen &&
        !event.target.closest(".search-dropdown") &&
        !event.target.closest('button[aria-label="Search"]')
      ) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    if (isSearchOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      try {
        await dispatch(fetchSearchProducts({ search: trimmedQuery })).unwrap();
        // Navigate to shop page with search query
        navigate(`/shop?search=${encodeURIComponent(trimmedQuery)}`);
        // Close search box and clear query
        setIsSearchOpen(false);
        setSearchQuery("");
      } catch (error) {
        console.error("Search failed:", error);
        // Optionally show error to user
      }
    }
  };

  // const performSearch = async (query) => {
  //   const trimmed = (query || "").trim();
  //   if (!trimmed) return;
  //   try {
  //     await dispatch(fetchSearchProducts({ search: trimmed })).unwrap();
  //     navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
  //     setIsSearchOpen(false);
  //     setSearchQuery("");
  //   } catch (error) {
  //     console.error("Search failed:", error);
  //   }
  // };

  const handleSuggestionClick = (text) => {
    setSearchQuery(text);
    // focus back the input so user can continue typing or press Enter
    requestAnimationFrame(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        // place cursor at end
        const value = searchInputRef.current.value;
        searchInputRef.current.setSelectionRange(value.length, value.length);
      }
    });
  };

  // Handle search icon click
  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setSearchQuery("");
  };

  // Handle close search with animation
  const handleCloseSearch = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsSearchOpen(false);
      setIsClosing(false);
      setSearchQuery("");
    }, 400);
  };

  return (
    <div className="relative">
      {/* Search Icon Button */}
      <button
        onClick={handleSearchClick}
        className="h-full flex items-center cursor-pointer"
        aria-label="Search"
        type="button"
      >
        <svg
          className="w-6 h-6 md:w-[1.625rem] md:h-[1.625rem]"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.8141 17.8141L22.75 22.75M11.7813 20.3125C16.4929 20.3125 20.3125 16.4929 20.3125 11.7813C20.3125 7.06956 16.4929 3.25 11.7813 3.25C7.06956 3.25 3.25 7.06956 3.25 11.7813C3.25 16.4929 7.06956 20.3125 11.7813 20.3125Z"
            stroke={headerTextColor || "#111111"}
            strokeWidth="1.625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Search Dropdown */}
      {isSearchOpen && (
        <>
          {/* Dropdown */}
          <div
            className={`fixed top-full left-1/2  rounded-xl w-full max-w-[19.375rem] sm:max-w-[37.5rem] bg-white shadow-2xl z-50 search-dropdown ${
              isClosing ? "search-dropdown-closing" : ""
            }`}
          >
            <form onSubmit={handleSearch}>
              {/* Search Input Row */}
              <div className="flex items-center px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100">
                <div className="flex-1 relative flex items-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="search"
                    autoComplete="off"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSearch(e);
                      }
                    }}
                    placeholder="Search for products, brands, categories..."
                    className="w-full py-2 sm:py-3 text-base sm:text-lg border-none focus:outline-none bg-transparent"
                    style={{
                      color: headerTextColor || "#111111",
                    }}
                  />
                </div>
                <button
                  onClick={handleCloseSearch}
                  type="button"
                  className="ml-3 p-1 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                  aria-label="Close search"
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
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Suggested Search Terms */}
              <div className="px-4 py-4 sm:px-6 sm:py-6">
                <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                  Suggested Search Terms
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-2 sm:gap-3">
                  {[
                    "T-Shirts",
                    "Shirts",
                    "Denims",
                    "Men's - Watch",
                    "Women's - Watch",
                    "Handbags",
                    "Men's Shoes",
                    "Wallet",
                    "Caps",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="cursor-pointer text-left text-sm text-gray-600 hover:text-gray-900 rounded transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
