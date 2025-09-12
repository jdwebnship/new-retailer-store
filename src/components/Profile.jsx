import { useTheme } from "../contexts/ThemeContext";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { logoutUser } from "../redux/slices/authSlice";

function Profile() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { headerTextColor, headerBackgroundColor } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dropdownRef = useRef(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon */}
      <div
        onClick={() => {
          if (!isAuthenticated) {
            navigate("/signin");
          } else {
            setIsProfileDropdownOpen((prev) => !prev);
          }
        }}
        className="cursor-pointer"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-[1.625rem] md:h-[1.625rem]"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 22.75C18.3848 22.75 22.75 18.3848 22.75 13C22.75 7.61529 18.3848 3.25 13 3.25C7.61529 3.25 3.25 7.61529 3.25 13C3.25 18.3848 7.61529 22.75 13 22.75Z"
            stroke={headerTextColor || "#111111"}
            strokeWidth="1.625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 16.25C15.2437 16.25 17.0625 14.4312 17.0625 12.1875C17.0625 9.94378 15.2437 8.125 13 8.125C10.7563 8.125 8.9375 9.94378 8.9375 12.1875C8.9375 14.4312 10.7563 16.25 13 16.25Z"
            stroke={headerTextColor || "#111111"}
            strokeWidth="1.625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.47961 20.2516C6.93685 19.351 7.57568 18.5549 8.35583 17.9135C9.13598 17.2721 10.0405 16.7992 11.0125 16.5247C11.9845 16.2502 13.0028 16.18 14.0032 16.3185C15.0036 16.4571 15.9645 16.8014 16.8253 17.3297C17.9762 18.0361 18.9089 19.0475 19.5202 20.2516"
            stroke={headerTextColor || "#111111"}
            strokeWidth="1.625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isProfileDropdownOpen && isAuthenticated && (
        <div
          className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
          style={{
            backgroundColor: headerBackgroundColor || "#ffffff",
          }}
        >
          <Link
            to="/my-account"
            className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
            style={{
              color: headerTextColor || "#111111",
            }}
          >
            My Orders
          </Link>

          <button
            onClick={() => {
              dispatch(logoutUser({ navigate }));
              setIsProfileDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
            style={{
              color: headerTextColor || "#111111",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
