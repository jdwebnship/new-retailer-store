import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartGuest,
  addToCartUser,
  removeFromCartapi,
} from "../redux/slices/cartSlice";
import { getProductImage } from "../utils/common";
import useCartQuantity from "../hooks/useCartQuantity";

const CartPopup = ({ items = [], onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      <div
        className="overlay w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,.65)] z-[99]"
        onClick={onClose}
      ></div>

      {/* Cart Popup */}
      <div className="cart-popup flex flex-col justify-between fixed right-0 top-0 z-[100] w-full h-dvh max-w-[31.25rem] bg-white shadow-lg p-7.5 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#11111126] pb-5 mb-6">
            <h2 className="text-2xl font-bold">Cart({items.length})</h2>
            <button onClick={onClose}>
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

          {/* Cart Items */}
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <CartItem
                key={`${item.id}-${item?.selected_variant?.id || "na"}`}
                item={item}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col gap-3 border-t border-[#11111126] pt-6">
          <button className="btn py-4 rounded-md cursor-pointer">
            CHECKOUT
          </button>
          <button
            onClick={() => {
              navigate("/cart");
              onClose();
            }}
            className="border border-black hover:bg-black hover:text-white transition-all duration-300 py-4 rounded-md cursor-pointer uppercase"
          >
            View Cart
          </button>
          <a className="text-[#111111] text-lg underline hover:text-[#007BFF] cursor-pointer transition-all duration-300 text-center">
            CONTINUE SHOPPING
          </a>
        </div>
      </div>
    </>
  );
};

export default CartPopup;

// CartItem Component
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const cartQuantity = item.quantity;
  const availableStock =
    item?.selected_variant?.stock ?? item?.product_stock ?? 0;

  const { quantity, increase, decrease, canIncrease, canDecrease } =
    useCartQuantity({
      initial: item.quantity,
      maxLimit: 5,
      availableStock,
      cartQuantity,
      resetKey: item.id, // reset if product changes
      onChange: (newQty, action) => {
        if (isAuthenticated) {
          dispatch(
            addToCartUser({ ...item, quantity: action === "increase" ? 1 : -1 })
          );
        } else {
          dispatch(
            addToCartGuest({
              ...item,
              quantity: action === "increase" ? 1 : -1,
            })
          );
        }
      },
    });

  return (
    <div className="flex gap-4">
      <img
        src={getProductImage(item)}
        alt={item.product_name}
        className="sm:w-25 sm:h-25 w-20 h-20 rounded-[1.125rem] object-cover"
      />
      <div className="flex-1 flex flex-col justify-between gap-2">
        <div className="flex justify-between">
          <p className="text-base font-bold">{item.product_name}</p>
          <p className="text-base font-bold">₹{item.final_price * quantity}</p>
        </div>
        {item?.selected_variant?.product_variation && (
          <div className="text-left">
            <span className="leading-none inline-block text-base text-[#AAAAAA]">
              Size:
              <strong className="font-bold text-[#111111] ml-2">
                {item?.selected_variant?.product_variation}
              </strong>
            </span>
          </div>
        )}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center border border-[#AAAAAA] rounded-lg w-fit">
            <button
              className="px-2.5 py-1 cursor-pointer disabled:cursor-not-allowed"
              style={{ minWidth: "1.2rem" }}
              onClick={decrease}
              disabled={!canDecrease}
            >
              -
            </button>
            <span className="px-3">{quantity}</span>
            <button
              className="px-2.5 py-1 cursor-pointer disabled:cursor-not-allowed"
              style={{ minWidth: "1.2rem" }}
              onClick={increase}
              disabled={!canIncrease}
            >
              +
            </button>
          </div>
          <button
            className="text-sm text-[#111111] underline cursor-pointer hover:text-[#007BFF] transition-all duration-300"
            onClick={() => dispatch(removeFromCartapi(item))}
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
};
