import { useLayoutEffect, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ containerId } = {}) {
  const location = useLocation();
  const triggeredByAnchor = useRef(false);

  // Detect last click target
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest("a"); // only anchors
      triggeredByAnchor.current = !!target;
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useLayoutEffect(() => {
    if (!triggeredByAnchor.current) return;

    const se = document.scrollingElement || document.documentElement;
    const container = containerId ? document.getElementById(containerId) : null;

    // enable smooth temporarily
    const enableSmooth = (el) => {
      if (el && el.style) el.style.scrollBehavior = "smooth";
    };
    const disableSmooth = (el) => {
      if (el && el.style) el.style.scrollBehavior = "";
    };

    enableSmooth(se);
    if (container) enableSmooth(container);

    // Smooth scroll
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (container) {
      container.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    // After animation, remove smooth style
    const tid = setTimeout(() => {
      disableSmooth(se);
      if (container) disableSmooth(container);
      triggeredByAnchor.current = false; // reset for next navigation
    }, 500); // duration ~0.5s

    return () => clearTimeout(tid);
  }, [
    location.key,
    location.pathname,
    location.search,
    location.hash,
    containerId,
  ]);

  return null;
}
