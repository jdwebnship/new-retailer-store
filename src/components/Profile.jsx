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
    <div className="relative h-full" ref={dropdownRef}>
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

              <div className="space-y-2">
                <Link
                  to="/my-account"
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="profile-menu-item flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                  style={{ color: headerTextColor || "#111111" }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    <path
                      d="M16.5 19.5H7.35C7.17998 19.5 7.01501 19.4422 6.88215 19.3361C6.74929 19.23 6.65641 19.0819 6.61875 18.9161L5.14012 12.4174C5.06472 12.0858 4.87888 11.7897 4.61308 11.5776C4.34728 11.3655 4.0173 11.25 3.67725 11.25H1.5C1.30109 11.25 1.11032 11.329 0.96967 11.4697C0.829018 11.6103 0.75 11.8011 0.75 12C0.75 12.1989 0.829018 12.3897 0.96967 12.5303C1.11032 12.671 1.30109 12.75 1.5 12.75H3.15C3.31997 12.75 3.4849 12.8078 3.61775 12.9138C3.75061 13.0198 3.84352 13.1678 3.88125 13.3335L5.358 19.8323C5.43339 20.1642 5.61942 20.4606 5.88553 20.6728C6.15164 20.885 6.48201 21.0004 6.82238 21H16.5C16.6989 21 16.8897 20.921 17.0303 20.7803C17.171 20.6397 17.25 20.4489 17.25 20.25C17.25 20.0511 17.171 19.8603 17.0303 19.7197C16.8897 19.579 16.6989 19.5 16.5 19.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M9 23.2504C9.62132 23.2504 10.125 22.7467 10.125 22.1254C10.125 21.5041 9.62132 21.0004 9 21.0004C8.37868 21.0004 7.875 21.5041 7.875 22.1254C7.875 22.7467 8.37868 23.2504 9 23.2504Z"
                      fill="currentColor"
                    />
                    <path
                      d="M15 23.2504C15.6213 23.2504 16.125 22.7467 16.125 22.1254C16.125 21.5041 15.6213 21.0004 15 21.0004C14.3787 21.0004 13.875 21.5041 13.875 22.1254C13.875 22.7467 14.3787 23.2504 15 23.2504Z"
                      fill="currentColor"
                    />
                    <path
                      d="M7.21387 13.1254L7.61588 15.0004H9.31763L9.0495 13.1254H7.21387ZM14.1926 13.1254H12.375V15.0004H13.9245L14.1926 13.1254ZM15.75 1.125H19.5V1.875H15.75V1.125ZM11.625 15.0004V13.1254H9.80737L10.0755 15.0004H11.625ZM13.8176 15.7504H12.375V17.6254H13.5495L13.8176 15.7504ZM8.17838 17.6254H9.69263L9.4245 15.7504H7.77637L8.17838 17.6254ZM11.625 17.6254V15.7504H10.1824L10.4505 17.6254H11.625Z"
                      fill="currentColor"
                    />
                    <path
                      d="M20.25 1.875V2.25C20.25 2.34946 20.2105 2.44484 20.1402 2.51517C20.0698 2.58549 19.9745 2.625 19.875 2.625H15.375C15.2755 2.625 15.1802 2.58549 15.1098 2.51517C15.0395 2.44484 15 2.34946 15 2.25V1.875H12.375V12.375H17.25C17.3059 12.375 17.3612 12.3875 17.4117 12.4116C17.4621 12.4357 17.5066 12.4708 17.5418 12.5143C17.5769 12.5578 17.6019 12.6086 17.6149 12.663C17.6279 12.7174 17.6285 12.7741 17.6168 12.8288L16.7498 16.875H22.875V1.875H20.25ZM13.875 3.75H20.625V4.5H13.875V3.75ZM22.125 10.5H13.125V9.75H22.125V10.5ZM22.125 9H13.125V8.25H22.125V9ZM22.125 7.5H13.125V6.75H22.125V7.5ZM22.125 6H13.125V5.25H22.125V6ZM22.125 4.5H21.375V3.75H22.125V4.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M16.7861 13.1254H14.9505L14.6824 15.0004H16.3841L16.7861 13.1254ZM14.3074 17.6254H15.8216L16.2236 15.7504H14.5755L14.3074 17.6254ZM5.625 8.25C6.36668 8.25 7.0917 8.03007 7.70839 7.61801C8.32507 7.20596 8.80572 6.62029 9.08955 5.93506C9.37338 5.24984 9.44764 4.49584 9.30295 3.76841C9.15825 3.04098 8.8011 2.3728 8.27665 1.84835C7.7522 1.3239 7.08402 0.966751 6.35659 0.822057C5.62916 0.677362 4.87516 0.751625 4.18994 1.03545C3.50471 1.31928 2.91904 1.79993 2.50699 2.41661C2.09493 3.0333 1.875 3.75832 1.875 4.5C1.875 5.49456 2.27009 6.44839 2.97335 7.15165C3.67661 7.85491 4.63044 8.25 5.625 8.25ZM4.125 4.125L4.875 4.875L7.125 2.625L7.875 3.375L4.875 6.375L3.375 4.875L4.125 4.125Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="font-medium">My Orders</span>
                </Link>

                <div className="pt-2 border-t border-gray-200">
                  <button
                    onClick={() => {
                      dispatch(logoutUser());
                      setIsProfileDropdownOpen(false);
                    }}
                    className="profile-menu-item w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-50 transition-all duration-200 group text-left cursor-pointer"
                    style={{ color: headerTextColor || "#111111" }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors duration-200"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.0016 22.2403C9.53336 22.2403 7.21198 21.2812 5.46663 19.5358C3.72129 17.7905 2.76221 15.4691 2.76221 13.0009C2.76221 9.93929 4.27427 7.07934 6.81165 5.35703C7.00174 5.22742 7.22063 5.1583 7.45103 5.1583C7.82833 5.1583 8.18258 5.34551 8.39571 5.65656C8.74709 6.17786 8.61172 6.88637 8.0933 7.24062C6.1809 8.53956 5.04038 10.6939 5.04038 13.0009C5.04038 16.84 8.16242 19.9621 12.0016 19.9621C15.8379 19.9621 18.96 16.84 18.96 13.0009C18.96 10.6939 17.8194 8.53956 15.9071 7.24062C15.3886 6.88637 15.2533 6.17786 15.6075 5.65656C15.8178 5.34551 16.172 5.1583 16.5522 5.1583C16.7797 5.1583 17.0015 5.22742 17.1887 5.35703C19.7261 7.07934 21.241 9.93929 21.241 13.0009C21.241 15.4691 20.2791 17.7905 18.5337 19.5358C16.7884 21.2812 14.4699 22.2403 12.0016 22.2403Z"
                        fill="currentColor"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.0016 13.4905C11.3709 13.4905 10.8611 12.9778 10.8611 12.3499V2.90029C10.8611 2.27243 11.3709 1.75977 12.0016 1.75977C12.6295 1.75977 13.1393 2.27243 13.1393 2.90029V12.3499C13.1393 12.9778 12.6295 13.4905 12.0016 13.4905Z"
                        fill="currentColor"
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
