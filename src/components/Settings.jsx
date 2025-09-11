import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

function Settings() {
  const {
    theme,
    setFontFamily,
    setBackgroundColor,
    setButtonBackgroundColor,
    setTopHeaderBackgroundColor,
    setHeaderBackgroundColor,
    setFooterBackgroundColor,
    setBottomFooterBackgroundColor,
    setBannerType, // <-- add this
    setCategoryLayout,
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  const closeSettings = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Settings Button */}
      <button
        onClick={toggleSettings}
        className="flex items-center gap-2 px-3 py-2 bg-[#111111] bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200 text-white"
        aria-label="Open settings"
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {/* <span className="text-sm font-medium">Settings</span> */}
      </button>

      {/* Settings Popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={closeSettings}></div>

          {/* Settings Panel */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto settings-popup p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Theme Settings
              </h3>
              <button
                onClick={closeSettings}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close settings"
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

            <div className="space-y-6">
              {/* Font Family */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Family
                </label>
                <select
                  value={
                    theme?.fontFamily || "system-ui, -apple-system, sans-serif"
                  }
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="system-ui, -apple-system, sans-serif">
                    System UI
                  </option>
                  <option value='"Roboto", system-ui, -apple-system, sans-serif'>
                    Roboto
                  </option>
                  <option value='"Inter", system-ui, -apple-system, sans-serif'>
                    Inter
                  </option>
                  <option value='"Satoshi", system-ui, -apple-system, sans-serif'>
                    Satoshi
                  </option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="Courier New, monospace">Courier New</option>
                </select>
              </div>

              {/* Background Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme?.backgroundColor || "#ffffff"}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    aria-label="Select background color"
                  />
                  <span className="text-sm text-gray-600 font-mono">
                    {theme?.backgroundColor || "#ffffff"}
                  </span>
                </div>
              </div>

              {/* Button Background Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme?.buttonBackgroundColor || "#007bff"}
                    onChange={(e) => setButtonBackgroundColor(e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    aria-label="Select button background color"
                  />
                  <span className="text-sm text-gray-600 font-mono">
                    {theme?.buttonBackgroundColor || "#007bff"}
                  </span>
                </div>
              </div>

              {/* Top Header Background Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top Header Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme?.topHeaderBackgroundColor || "#f8f9fa"}
                    onChange={(e) =>
                      setTopHeaderBackgroundColor(e.target.value)
                    }
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    aria-label="Select top header background color"
                  />
                  <span className="text-sm text-gray-600 font-mono">
                    {theme?.topHeaderBackgroundColor || "#f8f9fa"}
                  </span>
                </div>
              </div>

              {/* Header Background Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Header Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme?.headerBackgroundColor || "#3b82f6"}
                    onChange={(e) => setHeaderBackgroundColor(e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    aria-label="Select header background color"
                  />
                  <span className="text-sm text-gray-600 font-mono">
                    {theme?.headerBackgroundColor || "#3b82f6"}
                  </span>
                </div>
              </div>

              {/* Footer Background Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Footer Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme?.footerBackgroundColor || "#1f2937"}
                    onChange={(e) => setFooterBackgroundColor(e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    aria-label="Select footer background color"
                  />
                  <span className="text-sm text-gray-600 font-mono">
                    {theme?.footerBackgroundColor || "#1f2937"}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Header / Footer
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme?.bottomFooterBackgroundColor || "#1f2937"}
                    onChange={(e) =>
                      setBottomFooterBackgroundColor(e.target.value)
                    }
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    aria-label="Select footer background color"
                  />
                  <span className="text-sm text-gray-600 font-mono">
                    {theme?.bottomFooterBackgroundColor || "#1f2937"}
                  </span>
                </div>
              </div>

              {/* Banner Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Type
                </label>
                <select
                  value={theme?.bannerType || "slider"}
                  onChange={(e) => setBannerType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="slider">Slider</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

              {/* Category Layout */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Layout
                </label>
                <select
                  value={theme?.categoryLayout || "swiper"}
                  onChange={(e) => setCategoryLayout(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="swiper">Swiper</option>
                  <option value="list">List</option>
                </select>
              </div>

              {/* Preview Section */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Preview
                </h4>
                <div className="space-y-2">
                  <div
                    className="p-3 rounded text-sm"
                    style={{
                      backgroundColor: theme?.backgroundColor || "#ffffff",
                      color: theme?.textColor || "#333",
                      fontFamily:
                        theme?.fontFamily ||
                        "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    Sample text with current theme
                  </div>
                  <button
                    className="px-4 py-2 rounded text-sm font-medium"
                    style={{
                      backgroundColor:
                        theme?.buttonBackgroundColor || "#007bff",
                      color: theme?.buttonTextColor || "#ffffff",
                      fontFamily:
                        theme?.fontFamily ||
                        "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    Sample Button
                  </button>
                  <div className="flex gap-2">
                    <div
                      className="p-2 rounded text-xs flex-1"
                      style={{
                        backgroundColor:
                          theme?.topHeaderBackgroundColor || "#f8f9fa",
                        color: theme?.topHeaderTextColor || "#333",
                        fontFamily:
                          theme?.fontFamily ||
                          "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      Top Header
                    </div>
                    <div
                      className="p-2 rounded text-xs flex-1"
                      style={{
                        backgroundColor:
                          theme?.headerBackgroundColor || "#3b82f6",
                        color: theme?.headerTextColor || "#ffffff",
                        fontFamily:
                          theme?.fontFamily ||
                          "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      Header
                    </div>
                    <div
                      className="p-2 rounded text-xs flex-1"
                      style={{
                        backgroundColor:
                          theme?.footerBackgroundColor || "#1f2937",
                        color: theme?.footerTextColor || "#ffffff",
                        fontFamily:
                          theme?.fontFamily ||
                          "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      Footer
                    </div>
                    <div
                      className="p-2 rounded text-xs flex-1"
                      style={{
                        backgroundColor:
                          theme?.bottomFooterBackgroundColor || "#1f2937",
                        color: theme?.bottomFooterTextColor || "#ffffff",
                        fontFamily:
                          theme?.fontFamily ||
                          "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      Section Header / Footer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Settings;
