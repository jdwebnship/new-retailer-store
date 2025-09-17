import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCartapi, updateCartItem } from "../redux/slices/cartSlice";
import { getProductImage } from "../utils/common";
import useCartQuantity from "../hooks/useCartQuantity";
import minus from "../assets/minus.svg";
import plus from "../assets/plus.svg";

export default function OrderList({ item }) {
  const dispatch = useDispatch();

  const cartQuantity = item.quantity;
  const availableStock =
    item?.selected_variant?.stock ?? item?.product_stock ?? 0;

  const { quantity, increase, decrease, canIncrease, canDecrease } =
    useCartQuantity({
      initial: item.quantity,
      maxLimit: 5,
      availableStock,
      cartQuantity,
      resetKey: item.id,
      onChange: (newQty, action) => {
        if (action === "decrease" && quantity === 1) {
          dispatch(removeFromCartapi(item));
          return;
        }
        const quantityChange = action === "increase" ? 1 : -1;
        dispatch(updateCartItem({ item, qty: quantityChange }));
      },
    });

  return (
    <div
      key={item.cart_id}
      className="flex md:flex-row flex-col md:gap-6 gap-4 justify-between"
    >
      {/* Product Image + Info */}
      <div className="flex gap-[0.938rem] flex-1 max-w-[25.938rem]">
        <img
          src={getProductImage(item)}
          alt={item.product_name}
          className="lg:w-[6.25rem] lg:h-[6.25rem] w-20 h-20 object-cover rounded-[1.125rem]"
        />
        <div>
          <div className="sm:text-lg text-base font-bold mb-2.5 text-[#111111]">
            {item.product_name}
          </div>
          <div className="flex mb-2">
            <span className="leading-none inline-block font-bold text-base text-[#AAAAAA] border-r border-[#AAAAAA] pr-2 mr-2">
              Size:
              <strong className="font-bold text-[#111111] ml-2">L</strong>
            </span>
            <div className="flex items-center gap-2">
              <span className="leading-none text-base font-bold text-[#111111]">
                ₹{item.final_price?.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
          <button
            onClick={() => dispatch(removeFromCartapi(item))}
            className="text-sm underline uppercase cursor-pointer text-[#111111]"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-8 h-12 border border-[#AAAAAA] rounded-[0.625rem] w-fit md:mx-auto md:ml-[0] ml-[6rem]">
        <button
          onClick={decrease}
          className="text-2xl font-normal text-[#111111] focus:outline-none cursor-pointer flex justify-center"
          style={{ minWidth: "2.5rem" }}
        >
          <img src={minus} alt="" />
        </button>
        <span className="text-base font-normal text-[#111111] select-none">
          {quantity}
        </span>
        <button
          onClick={increase}
          disabled={!canIncrease}
          className="text-2xl font-normal text-[#111111] focus:outline-none cursor-pointer flex justify-center disabled:cursor-not-allowed"
          style={{ minWidth: "2.5rem" }}
        >
          <img src={plus} alt="" />
        </button>
      </div>

      {/* Total Price */}
      <div className="md:ml-[0] ml-[6rem]">
        <p className="text-lg font-bold">
          ₹
          {(item.final_price * item.quantity).toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  );
}
