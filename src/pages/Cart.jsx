// src/pages/Cart.jsx
import React, { useEffect, useMemo, useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { Link, useNavigate } from "react-router-dom";
import ModalComponent from "../components/modal";
import SignUpModal from "../components/SignUpModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
} from "../redux/slices/cartSlice";
import OrderList from "../components/orderList";

function Cart() {
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [isAuthenticated]);


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
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }
    navigate("/checkout", { state: { items: cartItems || [] } });
  };

  // const handleOTPSendError = (error) => {
  //   if (error?.userNotRegistered) {
  //     setPhoneNumber(error.mobile);
  //     setShowSignUpModal(true);
  //     setIsModalOpen(false);
  //   }
  // };

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
            {cartItems?.length > 0 ? (
              cartItems.map((item) => (
                <OrderList
                  key={item.cart_id}
                  item={item}
                />
              ))
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
                disabled={!cartItems?.length}
                className="mt-6 w-full sm:text-lg font-normal bg-black text-white rounded-[0.625rem] sm:py-4 py-3 uppercase disabled:opacity-60 cursor-pointer"
              >
                Checkout
              </button>
            ) : (
              <button
                onClick={proceedToCheckout}
                disabled={!cartItems?.length}
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
        // onOTPSendError={handleOTPSendError}
        setShowSignUpModal={setShowSignUpModal}
      />
      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        phoneNumber={phoneNumber}
      />
    </div>
  );
}

export default Cart;
