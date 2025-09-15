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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="relative h-[5rem]" ref={dropdownRef}>
      {/* Profile Icon Button */}
      <button
        onClick={() => {
          if (!isAuthenticated) {
            navigate("/signin");
          } else {
            setIsProfileDropdownOpen((prev) => !prev);
          }
        }}
        className="h-full flex items-center cursor-pointer"
        aria-label="Profile"
        type="button"
      >
        <svg
          className="w-6 h-6 md:w-[1.625rem] md:h-[1.625rem]"
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
      </button>

      {/* Profile Dropdown Menu */}
      {isProfileDropdownOpen && isAuthenticated && (
        <div
          className="absolute top-full w-80 z-50 profile-dropdown
            left-1/2 sm:left-auto sm:right-0
             sm:translate-x-0"
        >
          <div
            className="bg-white border border-gray-200 rounded-lg shadow-xl p-6"
            style={{
              backgroundColor: headerBackgroundColor || "#ffffff",
              borderColor: headerBackgroundColor || "#e5e7eb",
            }}
          >
            <div className="space-y-3">
              {/* User Info Section */}
              <div className="pb-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="font-semibold text-gray-900"
                      style={{ color: headerTextColor || "#111111" }}
                    >
                      My Account
                    </p>
                    <p className="text-sm text-gray-500">Manage your profile</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                <Link
                  to="/my-account"
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="profile-menu-item flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                  style={{ color: headerTextColor || "#111111" }}
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                    />
                  </svg>
                  <span className="font-medium">My Orders</span>
                </Link>

                <div className="pt-2 border-t border-gray-200">
                  <button
                    onClick={() => {
                      dispatch(logoutUser({ navigate }));
                      setIsProfileDropdownOpen(false);
                    }}
                    className="profile-menu-item w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-50 transition-all duration-200 group text-left cursor-pointer"
                    style={{ color: headerTextColor || "#111111" }}
                  >
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="font-medium text-red-600 group-hover:text-red-700">
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
