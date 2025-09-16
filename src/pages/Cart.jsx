// src/pages/Cart.jsx
import React, { useEffect, useMemo, useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { Link, useNavigate } from "react-router-dom";
import ModalComponent from "../components/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
} from "../redux/slices/cartSlice";

function Cart() {
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await dispatch(
        updateCartItem({ itemId, quantity: newQuantity })
      ).unwrap();
      // Refresh cart after successful update
      dispatch(fetchCart());
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const increaseQty = (item) => {
    console.log("item", item);

    const newQuantity = (item.quantity || 1) + 1;
    console.log("newQuantity", newQuantity);
    handleUpdateQuantity(item.cart_id, newQuantity);
  };

  const decreaseQty = (item) => {
    const newQuantity = Math.max(1, (item.quantity || 1) - 1);
    if (newQuantity !== item.quantity) {
      handleUpdateQuantity(item.cart_id, newQuantity);
    }
  };

  const removeItem = async (itemId) => {
    if (
      window.confirm(
        "Are you sure you want to remove this item from your cart?"
      )
    ) {
      try {
        await dispatch(removeFromCart(itemId)).unwrap();
        // Refresh cart after successful removal
        dispatch(fetchCart());
      } catch (error) {
        console.error("Failed to remove item:", error);
      }
    }
  };

  const { subtotal, tax, total, itemCount } = useMemo(() => {
    if (!cartItems?.length) {
      return { subtotal: 0, tax: 0, total: 0, itemCount: 0 };
    }

    const sub = cartItems.reduce((sum, item) => {
      return sum + parseFloat(item.final_price) * item.quantity;
    }, 0);

    const t = sub * 0.07; // 7% tax
    return {
      subtotal: sub,
      tax: t,
      total: sub + t,
      itemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
    };
  }, [cartItems]);

  const proceedToCheckout = () => {
    navigate("/checkout", { state: { items: cartItems || [] } });
  };

  return (
    <div>
      <CommonHeader />
      <div className="max-w-[80rem] mx-auto lg:py-[6.25rem] md:py-[5rem] py-[3.5rem] text-left">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
          <div className="lg:col-span-2 space-y-7.5">
            <h1 className="text-2xl font-bold mb-6 pb-5 border-b border-[#11111126] text-left">
              Your Cart{" "}
              {itemCount > 0 &&
                `(${itemCount} ${itemCount === 1 ? "item" : "items"})`}
            </h1>
            {loading ? (
              <div className="text-center p-6">Loading cart...</div>
            ) : cartItems?.length > 0 ? (
              cartItems?.map((item) => {
                const firstImage = item.product_images?.split(",")[0];
                return (
                  <div
                    key={item.cart_id}
                    className="flex md:flex-row flex-col md:gap-6 gap-4 justify-between"
                  >
                    <div className="flex gap-[0.938rem] flex-1 max-w-[25.938rem]">
                      <img
                        src={firstImage}
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
                            <strong className="font-bold text-[#111111] ml-2">
                              L
                            </strong>
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="leading-none text-base font-bold text-[#111111]">
                              ₹{item.final_price?.toLocaleString("en-IN")}
                            </span>
                            {/* <span className="leading-none text-sm text-[#808080]">
                              ${it.price.toFixed(2)}
                            </span> */}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.cart_id)}
                          className="text-sm underline uppercase cursor-pointer text-[#111111]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 h-12 border border-[#AAAAAA] rounded-[0.625rem] w-fit md:mx-auto md:ml-[0] ml-[6rem]">
                      <button
                        onClick={() => decreaseQty(item)}
                        className="text-2xl font-normal text-[#111111] focus:outline-none cursor-pointer"
                        style={{ minWidth: "2.5rem" }}
                      >
                        –
                      </button>
                      <span className="text-base font-normal text-[#111111] select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item)}
                        className="text-2xl font-normal text-[#111111] focus:outline-none cursor-pointer"
                        style={{ minWidth: "2.5rem" }}
                      >
                        +
                      </button>
                    </div>
                    <div className="md:ml-[0] ml-[6rem]">
                      <p className="text-lg font-bold">
                        ₹
                        {(item.final_price * item.quantity).toLocaleString(
                          "en-IN",
                          { maximumFractionDigits: 2 }
                        )}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center p-6 border rounded-md">
                <p className="mb-4">Your cart is empty.</p>
                <Link
                  className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  to="/shop"
                >
                  Continue shopping
                </Link>
              </div>
            )}
          </div>
          <aside className="bg-[#FFF7F2] rounded-[2.125rem] p-[1.875rem] h-fit lg:mt-12">
            <h2 className="md:text-2xl text-lg font-semibold mb-6">
              Order Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="sm:text-lg font-medium">Subtotal</span>
                <span className="sm:text-lg font-medium">
                  ₹
                  {subtotal.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="sm:text-lg font-medium">Taxes (7%)</span>
                <span className="sm:text-lg font-medium">
                  ₹{tax.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="border-t border-[#11111126] pt-5 mt-4 flex justify-between font-medium">
                <span className="md:text-2xl text-lg font-medium">Total</span>
                <span className="md:text-2xl text-lg font-medium">
                  ₹{total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            {!isAuthenticated ? (
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  document.body.style.overflow = "hidden";
                }}
                disabled={!cartItems?.length || loading}
                className="mt-6 w-full sm:text-lg font-normal bg-black text-white rounded-[0.625rem] sm:py-4 py-3 uppercase disabled:opacity-60 cursor-pointer"
              >
                Checkout
              </button>
            ) : (
              <button
                onClick={proceedToCheckout}
                disabled={!cartItems?.length || loading}
                className="mt-6 w-full sm:text-lg font-normal bg-black text-white rounded-[0.625rem] sm:py-4 py-3 uppercase disabled:opacity-60 cursor-pointer"
              >
                Checkout
              </button>
            )}
            <div className="text-center mt-6">
              <Link
                className="sm:text-lg uppercase font-normal underline hover:text-[#007BFF] transition-all duration-300"
                to="/shop"
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
      <ModalComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default Cart;
