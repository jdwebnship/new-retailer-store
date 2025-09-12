export const getCategoryUrl = (slug) => {
  if (!slug || typeof slug !== "string") {
    console.warn("Invalid slug provided to getCategoryUrl:", slug);
    return "/shop";
  }

  const cleanSlug = slug.trim();
  return `/shop?categories=${cleanSlug}`;
};

export const getProductUrl = (product) => {
  if (!product) {
    return "/shop";
  }

  const variant = product?.selectedVariant?.product_variation;

  const cleanSlug = product?.slug || product?.product_slug
    ?.trim()
    ?.toLowerCase()
    ?.replace(/\s+/g, "-")
    ?.replace(/[^a-z0-9-]/g, "");
  return `/products/${cleanSlug}${variant ? `?variant=${variant}` : ""}`;
};

export const getProductImage = (product) => {
  if (!product) {
    return "/placeholder.png";
  }

  const image = product.product_images && product.product_images.split(",").length
    ? product.product_images.split(",")[0]
    : "/placeholder.png";
  return image;
};

// Provided getErrorMessages function
export function getErrorMessages(errors) {
  if (!errors || typeof errors !== "object") return [];

  // Handle case where errors is an array (e.g., [])
  if (Array.isArray(errors)) return [];

  // Handle case where errors is an object with field-specific messages
  return Object.values(errors)
    .flat() // Flatten arrays of messages (e.g., ["The email field is required."])
    .filter((msg) => typeof msg === "string"); // Ensure only valid string messages
}

// Function to process the response data
export function processResponseData(response) {
  // Extract errors and message from response
  const { errors, message, success, status, ...rest } = response;
  if (success || status) {
    return response;
  }
  // Get flattened error messages
  const errorMessages = getErrorMessages(errors);

  // If errors exist, use the flattened error messages as the new message
  const newMessage = errorMessages.length > 0 ? errorMessages : [message];

  // Return the modified response data
  return {
    ...rest,
    message: newMessage,
  };
}

export const formatStatus = (status) => {
  if (!status) return "";
  return status
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getWhatsappLink = (e, product, phone_number) => {
  e.preventDefault();
  e.stopPropagation();
  const productName = product?.name;
  if (productName && phone_number) {
    const cleanPhoneNumber = phone_number.replace(/[^\d+]/g, "");
    const encodedProductName = encodeURIComponent(productName);
    const url = `https://api.whatsapp.com/send?phone=${cleanPhoneNumber}&text=${encodedProductName}`;
    window.open(url, "_blank");
    return true;
  } else {
    console.error("Missing product name or phone number");
    return null;
  }
};

 export const isInWishlist = (product_id, wishlistData) => {
  if (!wishlistData || !Array.isArray(wishlistData)) {
    return false;
  }
  return wishlistData.some((item) => item.product_id == product_id || item.retailer_product_id == product_id);
};

