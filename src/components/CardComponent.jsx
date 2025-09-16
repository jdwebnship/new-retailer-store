import { useTheme } from "../contexts/ThemeContext";
import whatsapp from "../assets/Whatsapp.svg";
import { useNavigate } from "react-router-dom";
import {
  formatStatus,
  getProductImage,
  getWhatsappLink,
  isInWishlist,
} from "../utils/common";
import { useDispatch, useSelector } from "react-redux";
import {
  addtowishList,
  removeFromwishList,
} from "../redux/slices/WishListSlice";

const CardComponent = ({ product, isWishlistKey = false }) => {
  const productData = isWishlistKey
    ? {
        name: product.product_name,
        slug: product.product_slug,
        new_price: product.price,
        final_price: product.final_price,
        images: product.product_images,
        id: product.retailer_product_id || product.product_id,
        product_id: product.product_id,
        retailer_product_id: product.retailer_product_id,
        retailer_id: product.retailer_id,
        wholesaler_id: product.wholesaler_id,
      }
    : product;
  const { textColor } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { storeInfo } = useSelector((state) => state.storeInfo);
  // const { wishlist } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const phone_number = storeInfo?.storeinfo?.retailer?.phone_number;
  // const wishlistData = productData?.data?.wishlist;
  const isWishlist =
    (isAuthenticated && isInWishlist(productData?.id, productData)) || false;

  const addToWishList = () => {
    if (isAuthenticated) {
      if (isWishlist) {
        const payload = {
          product_id: !productData?.retailer_id ? productData?.id : null,
          retailer_product_id: productData?.retailer_id
            ? productData?.id
            : null,
        };
        dispatch(removeFromwishList(payload, dispatch));
      } else {
        const payload = {
          product_id: productData?.id,
          retailer_id: productData?.wholesaler_id
            ? null
            : productData?.retailer_id,
          wholesaler_id: productData?.retailer_id
            ? null
            : productData?.wholesaler_id,
        };
        dispatch(addtowishList(payload, dispatch));
      }
    } else {
      navigate("/signin");
    }
  };

  const removeDataFromWishlist = ({
    product_id,
    retailer_id,
    retailer_product_id,
  }) => {
    console.log("0fopds", { product_id, retailer_id, retailer_product_id });
    const payload = {
      retailer_product_id: retailer_product_id ? retailer_product_id : "",
      product_id: !retailer_product_id ? product_id : "",
    };
    dispatch(removeFromwishList(payload));
  };

  return (
    <>
      <div
        className="text-start relative card-element cursor-pointer"
        onClick={() =>
          !isWishlistKey
            ? navigate(`/products/${productData?.slug}`)
            : navigate(`/my-account`)
        }
        style={{
          height: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {getProductImage(productData) && (
          <div
            className="relative before:content-[''] before:block before:float-left before:pt-[125%] after:content-[''] after:table after:clear-both bg-[#f2f2f2] rounded-[1.125rem] flex flex-col align-items-center justify-center"
            style={{
              height: "100%",
              borderRadius: "1.125rem",
              overflow: "hidden",
            }}
          >
            {/* <img
          src={imageSrc}
          alt={productName}
          style={{
            height: "29.125rem",
            borderRadius: "1.125rem",
            overflow: "hidden",
          }}
        > */}

            <img
              className="absolute top-0 left-0"
              src={getProductImage(productData)}
              alt={productData?.name || "Product Image"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transform: "rotate(0deg)",
                opacity: 1,
              }}
            />
          </div>
        )}

        <div className="hover-content absolute left-0 right-0 h-100">
          <div className="flex justify-between h-100">
            {product?.stock_status === "out_of_stock" && (
              <span className="bg-[#1111116b] uppercase text-[0.875rem] px-[0.9375rem] py-[8px] rounded-[8px] absolute top-[0.9375rem] left-[8px] font-bold text-white backdrop-blur-md transition-all duration-150 ease-in-out">
                {formatStatus(productData?.stock_status)}
              </span>
            )}

            {isWishlistKey ? (
              ""
            ) : (
              <div className="social-icon absolute top-[0.9375rem] flex flex-col gap-2 right-[0.9375rem]">
                {storeInfo?.storeinfo?.enquiry_whatsapp === 1 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      getWhatsappLink(e, productData, phone_number);
                    }}
                    className="bg-[#25D366] p-[9px] w-[2.625rem] h-[2.625rem] inline-block rounded-[8px] cursor-pointer"
                  >
                    <img src={whatsapp} alt="WhatsApp" />
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToWishList();
                  }}
                  className="bg-[#1111116b] w-[2.625rem] h-[2.625rem] rounded-[8px] flex items-center justify-center cursor-pointer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                    fill={isWishlist ? "red" : "none"}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5048 19.5L5.291 13.0513C1.37045 9.18258 7.13333 1.75337 12.5048 7.76384C17.8763 1.75337 23.6141 9.20729 19.72 13.0513L12.5048 19.5Z"
                      stroke={isWishlist ? "red" : "#ffffff"}
                      strokeWidth="1.42857"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[0.1875rem] text-start">
          {productData?.name && (
            <h3
              className="line-clamp-1 mb-[0.375rem]"
              style={{ margin: 0, fontSize: "1.125rem" }}
            >
              {productData?.name}
            </h3>
          )}

          {productData?.final_price && (
            <div className="flex gap-2">
              <p
                className="font-bold"
                style={{ margin: 0, fontSize: "1.125rem", color: textColor }}
              >
                ₹{productData?.final_price}
              </p>
              {product?.old_price !== 0 && (
                <p
                  className="font-regular line-through"
                  style={{ margin: 0, fontSize: "1.125rem", color: "#555" }}
                >
                  ₹{productData?.old_price}
                </p>
              )}
            </div>
          )}

          {isWishlistKey && (
            <button
              onClick={() =>
                removeDataFromWishlist({
                  product_id: productData.product_id,
                  retailer_id: productData.retailer_id,
                  retailer_product_id: productData.retailer_product_id,
                })
              }
              className="text-sm uppercase underline text-start cursor-pointer"
            >
              Remove From Wishlist
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CardComponent;
