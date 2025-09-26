import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCartApi, updateCartItem } from "../redux/slices/cartSlice";
import { getProductImage } from "../utils/common";
import useCartQuantity from "../hooks/useCartQuantity";
import minus from "../assets/minus.svg";
import plus from "../assets/plus.svg";
import { Link } from "react-router-dom";

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
          dispatch(removeFromCartApi(item));
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
      <div className="flex gap-[0.938rem] flex-1 max-w-[25.938rem]">
        <Link to={item?.product_slug ? `/products/${item.product_slug}` : "#"}>
          <img
            src={getProductImage(item)}
            alt={item?.product_name || "No product name"}
            className="lg:w-[6.25rem] lg:h-[6.25rem] w-20 h-20 object-cover rounded-[1.125rem]"
          />
        </Link>
        <div>
          <Link
            to={item?.product_slug ? `/products/${item.product_slug}` : "#"}
          >
            <div
              className="sm:text-lg text-base font-bold mb-2.5   
                 transition-colors duration-300 hover:text-[#007BFF] cursor-pointer"
            >
              {item?.product_name || "Unnamed Product"}
            </div>
          </Link>
          <div className="flex mb-2">
            {item?.selected_variant?.product_variation && (
              <span className="leading-none inline-block font-bold text-base text-[#AAAAAA] border-r border-[#AAAAAA] pr-2 mr-2">
                Size:
                <strong className="font-bold   ml-2">
                  {item?.selected_variant?.product_variation}
                </strong>
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="leading-none text-base font-bold  ">
                ₹
                {item?.final_price
                  ? Number(item.final_price).toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })
                  : 0}
              </span>
            </div>
          </div>
          <button
            onClick={() => dispatch(removeFromCartApi(item))}
            className="text-sm underline uppercase cursor-pointer  "
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex items-center gap-7.5 h-12 border border-[#AAAAAA] rounded-[0.625rem] w-fit md:mx-auto md:ml-[0] ml-[6rem]">
        <button
          onClick={decrease}
          className="text-2xl font-normal   focus:outline-none cursor-pointer flex justify-center"
          style={{ minWidth: "2.5rem" }}
          disabled={!canDecrease}
        >
          <img src={minus} alt="" />
        </button>
        <span className="text-base font-normal   select-none ">{quantity}</span>
        <button
          onClick={increase}
          disabled={!canIncrease}
          className="text-2xl font-normal   focus:outline-none cursor-pointer flex justify-center disabled:cursor-not-allowed"
          style={{ minWidth: "2.5rem" }}
        >
          <img src={plus} alt="" />
        </button>
      </div>

      <div className="md:ml-[0] ml-[6rem]">
        <p className="text-lg font-bold  ">
          ₹
          {item?.final_price && item?.quantity
            ? (item.final_price * item.quantity).toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })
            : 0}
        </p>
      </div>
    </div>
  );
}
