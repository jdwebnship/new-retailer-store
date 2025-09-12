import { useEffect, useLayoutEffect, useState } from "react";
import TopHeader from "./components/TopHeader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BottomFooter from "./components/BottomFooter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger
import ScrollSmoother from "./gsap-bonus/ScrollSmoother"; // Local file import
import AppRoutes from "./Routes/routes";
import "./App.css";

// Register plugins once at the module level
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const [showTopHeader, setShowTopHeader] = useState(true);
  const [topHeaderHeight, setTopHeaderHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentPaddingTop, setContentPaddingTop] = useState(0);
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const threshold = 12; // pixels to avoid flicker

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      lastY = currentY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentY <= 0) {
            setShowTopHeader(true);
            setHasShadow(false);
          } else if (delta > threshold) {
            setShowTopHeader(false);
            setHasShadow(true);
          } else if (delta < -threshold) {
            setShowTopHeader(true);
            setHasShadow(true);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const total = (showTopHeader ? topHeaderHeight : 0) + headerHeight;
    setContentPaddingTop(total);
  }, [showTopHeader, topHeaderHeight, headerHeight]);
  useLayoutEffect(() => {
    // Verify elements exist
    const wrapper = document.querySelector("#smooth-wrapper");
    const content = document.querySelector("#smooth-content");

    if (wrapper && content) {
      // Initialize ScrollSmoother
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5, // Smoothing duration (seconds)
        effects: true, // Enable data-speed/data-lag effects
        normalizeScroll: true, // Improves touch device scrolling
      });

      // Cleanup on unmount
      return () => {
        smoother && smoother.kill();
      };
    } else {
      console.warn("ScrollSmoother: Wrapper or content element not found.");
    }
  }, []); // Empty dependency array: run once after mount

  return (
    <div id="smooth-wrapper">
      <TopHeader visible={showTopHeader} onHeightChange={setTopHeaderHeight} />
      <Header
        offsetY={showTopHeader ? topHeaderHeight : 0}
        onHeightChange={setHeaderHeight}
        hasShadow={hasShadow}
      />
      <div id="smooth-content">
        <div className="App">
          <main
            className="main-content"
            style={{ paddingTop: contentPaddingTop }}
          >
            <AppRoutes />
          </main>
          <BottomFooter />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
