// src/contexts/ThemeContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { getContrastingColor } from "../utils/colorUtils";

const ThemeContext = createContext();

export function ThemeProvider({ children, theme = {} }) {
  const [currentTheme, setCurrentTheme] = useState({
    fontFamily: "Satoshi, -apple-system, sans-serif",
    backgroundColor: "#ffffff",
    buttonBackgroundColor: "#111111",
    topHeaderBackgroundColor: "#111111",
    headerBackgroundColor: "#FFFFFF",
    footerBackgroundColor: "#111111",
    bottomFooterBackgroundColor: "#FFF7F2",
    // Add bannerType default
    bannerType: "slider",
    // Category layout: 'swiper' | 'list'
    categoryLayout: "swiper",
    ...theme,
  });

  // Get store info from Redux store
  const storeInfo = useSelector(
    (state) => state.storeInfo?.storeInfo?.storeinfo || {}
  );

  // Update theme when store info changes
  useEffect(() => {
    if (storeInfo) {
      setCurrentTheme((prevTheme) => ({
        ...prevTheme,
        fontFamily: storeInfo.fontFamily || prevTheme.fontFamily,
        backgroundColor: storeInfo.backgroundColor || prevTheme.backgroundColor,
        buttonBackgroundColor:
          storeInfo.buttonBackgroundColor || prevTheme.buttonBackgroundColor,
        topHeaderBackgroundColor:
          storeInfo.topHeaderBackgroundColor ||
          prevTheme.topHeaderBackgroundColor,
        headerBackgroundColor:
          storeInfo.headerBackgroundColor || prevTheme.headerBackgroundColor,
        footerBackgroundColor:
          storeInfo.footerBackgroundColor || prevTheme.footerBackgroundColor,
        bottomFooterBackgroundColor:
          storeInfo.bottomFooterBackgroundColor ||
          prevTheme.bottomFooterBackgroundColor,
        bannerType: storeInfo.bannerType || prevTheme.bannerType,
        categoryLayout: storeInfo.categoryLayout || prevTheme.categoryLayout,
      }));
    }
  }, [storeInfo]);

  const textColor = useMemo(
    () => getContrastingColor(currentTheme.backgroundColor),
    [currentTheme.backgroundColor]
  );
  const buttonTextColor = useMemo(
    () => getContrastingColor(currentTheme.buttonBackgroundColor),
    [currentTheme.buttonBackgroundColor]
  );
  const topHeaderTextColor = useMemo(
    () => getContrastingColor(currentTheme.topHeaderBackgroundColor),
    [currentTheme.topHeaderBackgroundColor]
  );
  const headerTextColor = useMemo(
    () => getContrastingColor(currentTheme.headerBackgroundColor),
    [currentTheme.headerBackgroundColor]
  );
  const footerTextColor = useMemo(
    () => getContrastingColor(currentTheme.footerBackgroundColor),
    [currentTheme.footerBackgroundColor]
  );
  const bottomFooterTextColor = useMemo(
    () => getContrastingColor(currentTheme.bottomFooterBackgroundColor),
    [currentTheme.bottomFooterBackgroundColor]
  );

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--font-family", currentTheme.fontFamily);
    root.style.setProperty("--bg-color", currentTheme.backgroundColor);
    root.style.setProperty("--text-color", textColor);
    root.style.setProperty("--button-bg", currentTheme.buttonBackgroundColor);
    root.style.setProperty("--button-text-color", buttonTextColor);
    root.style.setProperty(
      "--top-header-bg",
      currentTheme.topHeaderBackgroundColor
    );
    root.style.setProperty("--top-header-text-color", topHeaderTextColor);
    root.style.setProperty("--header-bg", currentTheme.headerBackgroundColor);
    root.style.setProperty("--header-text-color", headerTextColor);
    root.style.setProperty("--footer-bg", currentTheme.footerBackgroundColor);
    root.style.setProperty("--footer-text-color", footerTextColor);
    root.style.setProperty(
      "--bottom-footer-bg",
      currentTheme.bottomFooterBackgroundColor
    );
    root.style.setProperty("--bottom-footer-text-color", bottomFooterTextColor);
  }, [
    currentTheme,
    textColor,
    buttonTextColor,
    topHeaderTextColor,
    headerTextColor,
    footerTextColor,
    bottomFooterTextColor,
  ]);

  const value = useMemo(
    () => ({
      theme: currentTheme,
      textColor,
      buttonTextColor,
      topHeaderTextColor,
      headerTextColor,
      footerTextColor,
      bottomFooterTextColor,
      setTheme: setCurrentTheme,
      setFontFamily: (fontFamily) =>
        setCurrentTheme((prev) => ({ ...prev, fontFamily })),
      setBackgroundColor: (backgroundColor) =>
        setCurrentTheme((prev) => ({ ...prev, backgroundColor })),
      setButtonBackgroundColor: (buttonBackgroundColor) =>
        setCurrentTheme((prev) => ({ ...prev, buttonBackgroundColor })),
      setTopHeaderBackgroundColor: (topHeaderBackgroundColor) =>
        setCurrentTheme((prev) => ({ ...prev, topHeaderBackgroundColor })),
      setHeaderBackgroundColor: (headerBackgroundColor) =>
        setCurrentTheme((prev) => ({ ...prev, headerBackgroundColor })),
      setFooterBackgroundColor: (footerBackgroundColor) =>
        setCurrentTheme((prev) => ({ ...prev, footerBackgroundColor })),
      setBottomFooterBackgroundColor: (bottomFooterBackgroundColor) =>
        setCurrentTheme((prev) => ({ ...prev, bottomFooterBackgroundColor })),
      // Add setBannerType
      setBannerType: (bannerType) =>
        setCurrentTheme((prev) => ({ ...prev, bannerType })),
      // Add category layout setter
      setCategoryLayout: (categoryLayout) =>
        setCurrentTheme((prev) => ({ ...prev, categoryLayout })),
    }),
    [
      currentTheme,
      textColor,
      buttonTextColor,
      topHeaderTextColor,
      headerTextColor,
      footerTextColor,
      bottomFooterTextColor,
    ]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
