import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevProductIdRef = useRef();

  useEffect(() => {
    // Check if the path matches /productdetails/PRODUCTID-variantIndex
    const match = pathname.match(/^\/productdetails\/(.+)-(\d+)$/);
    if (match) {
      const productId = match[1];
      if (prevProductIdRef.current !== productId) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
        prevProductIdRef.current = productId;
      }
      // If only variant changed, do not scroll
      return;
    }
    // For all other routes, scroll to top as usual
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
    prevProductIdRef.current = undefined;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
