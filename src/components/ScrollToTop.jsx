import { useLayoutEffect, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ containerId } = {}) {
  const location = useLocation();
  const triggeredByAnchor = useRef(false);

  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest("a");
      triggeredByAnchor.current = !!target;
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useLayoutEffect(() => {
    if (!triggeredByAnchor.current) return;

    const se = document.scrollingElement || document.documentElement;
    const container = containerId ? document.getElementById(containerId) : null;

    const enableSmooth = (el) => {
      if (el && el.style) el.style.scrollBehavior = "smooth";
    };
    const disableSmooth = (el) => {
      if (el && el.style) el.style.scrollBehavior = "";
    };

    enableSmooth(se);
    if (container) enableSmooth(container);

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (container) {
      container.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    const tid = setTimeout(() => {
      disableSmooth(se);
      if (container) disableSmooth(container);
      triggeredByAnchor.current = false;
    }, 500);

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
