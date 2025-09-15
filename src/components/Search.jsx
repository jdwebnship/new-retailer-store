import { useState, useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

function Search() {
  const { theme, headerTextColor } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to shop page with search query
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      // Close search box and clear query
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Handle escape key to close search
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Handle search icon click
  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
    }
  };

  return (
    <div className="relative h-[5rem]" ref={searchContainerRef}>
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

      {/* Search Box */}
      {isSearchOpen && (
        <div
          className={`
            absolute top-full z-50 search-box
            w-[90vw] max-w-[28.125rem]
            left-1/2 sm:left-auto sm:right-0
             sm:translate-x-0
          `}
        >
          <div
            className="bg-white border border-gray-200 rounded-lg shadow-xl p-4 sm:p-6"
            style={{
              backgroundColor: theme?.headerBackgroundColor || "#ffffff",
              borderColor: theme?.borderColor || "#e5e7eb",
            }}
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search products..."
                  className="search-input flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-base transition-all duration-200"
                  style={{
                    color: headerTextColor || "#111111",
                    backgroundColor: theme?.inputBackgroundColor || "#ffffff",
                    borderColor: theme?.borderColor || "#d1d5db",
                  }}
                />
                <div className="flex flex-row gap-2 sm:gap-3 mt-2 sm:mt-0">
                  <button
                    type="submit"
                    className="search-button px-6 py-3 bg-[#111111] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed outline-none cursor-pointer w-full sm:w-auto"
                    disabled={!searchQuery.trim()}
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="p-3 border border-[#AAAAAA] hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
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
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
