import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Smooth + bullet-proof ScrollToTop
 * - containerId: optional id of your scroll container (e.g. "main")
 * - smoothDuration: ms to wait before clearing temporary styles (default 400)
 */
export default function ScrollToTop({
  containerId,
  smoothDuration = 400,
} = {}) {
  const location = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const se = document.scrollingElement || document.documentElement;
    const body = document.body;
    const container = containerId ? document.getElementById(containerId) : null;

    const enableSmooth = (el) => {
      try {
        if (el && el.style) el.style.scrollBehavior = "smooth";
      } catch (e) {}
    };
    const disableSmooth = (el) => {
      try {
        if (el && el.style) el.style.scrollBehavior = "";
      } catch (e) {}
    };

    // Enable smooth on window/body and custom container (if any)
    enableSmooth(se);
    enableSmooth(body);
    if (container) enableSmooth(container);

    // Trigger smooth scroll
    try {
      window.scrollTo({ top: 0, left: 0 });
    } catch (e) {}
    if (container) {
      try {
        container.scrollTo({ top: 0, left: 0 });
      } catch (e) {
        container.scrollTop = 0;
      }
    }

    // Microtask attempt (helps if other libs run right after)
    setTimeout(() => {
      try {
        window.scrollTo({ top: 0, left: 0 });
      } catch (e) {}
      if (container)
        try {
          container.scrollTo({ top: 0, left: 0 });
        } catch (e) {}
    }, 0);

    // After the animation, clear styles and enforce final positions (fallback)
    const tid = setTimeout(() => {
      disableSmooth(se);
      disableSmooth(body);
      if (container) disableSmooth(container);

      try {
        se.scrollTop = 0;
      } catch (e) {}
      try {
        body.scrollTop = 0;
      } catch (e) {}
      if (container)
        try {
          container.scrollTop = 0;
        } catch (e) {}

      // safe best-effort: reset other scrollable elements AFTER animation completes
      try {
        document.querySelectorAll("*").forEach((el) => {
          try {
            const cs = getComputedStyle(el);
            if (
              /(auto|scroll)/.test(cs.overflow + cs.overflowY + cs.overflowX)
            ) {
              el.scrollTop = 0;
            }
          } catch (e) {}
        });
      } catch (e) {}
    }, smoothDuration + 50);

    return () => clearTimeout(tid);
    // watch all location pieces (hash/search/key) and props
  }, [
    location.key,
    location.pathname,
    location.search,
    location.hash,
    containerId,
    smoothDuration,
  ]);

  return null;
}
