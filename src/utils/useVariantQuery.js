import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useVariantQuery = (variantList = []) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const validVariants = variantList.map((variant) => variant.product_variation);

  // Initialize state from URL query string, validate against variantList and stock
  const getInitialVariant = () => {
    const urlVariant = searchParams.get("variant");
    const variantObj = variantList.find(
      (v) => v.product_variation === urlVariant
    );
    return urlVariant &&
      validVariants.includes(urlVariant) &&
      variantObj?.stock > 0
      ? urlVariant
      : "";
  };

  const [variant, setVariant] = useState(getInitialVariant);

  // Update the URL whenever the variant changes
  useEffect(() => {
    if (variant && validVariants.includes(variant)) {
      const variantObj = variantList.find(
        (v) => v.product_variation === variant
      );
      if (variantObj?.stock > 0) {
        setSearchParams((prev) => {
          const updated = new URLSearchParams(prev);
          if (updated.get("variant") !== variant) {
            updated.set("variant", variant);
          }
          return updated;
        }, { replace: true });
      } else {
        setSearchParams((prev) => {
          const updated = new URLSearchParams(prev);
          if (updated.has("variant")) {
            updated.delete("variant");
          }
          return updated;
        }, { replace: true });
      }
    } else {
      setSearchParams((prev) => {
        const updated = new URLSearchParams(prev);
        if (updated.has("variant")) {
          updated.delete("variant");
        }
        return updated;
      }, { replace: true });
    }
  }, [variant, validVariants.join(",")]);

  // Sync state when URL changes (e.g., back/forward)
  useEffect(() => {
    const urlVariant = searchParams.get("variant");
    if (urlVariant && validVariants.includes(urlVariant)) {
      const variantObj = variantList.find(
        (v) => v.product_variation === urlVariant
      );
      if (variantObj?.stock > 0 && urlVariant !== variant) {
        setVariant(urlVariant);
      } else if (!variantObj?.stock || variantObj.stock <= 0) {
        setVariant("");
      }
    }
  }, [searchParams.toString(), validVariants.join(",")]);

  return [variant, setVariant];
};

export default useVariantQuery;
