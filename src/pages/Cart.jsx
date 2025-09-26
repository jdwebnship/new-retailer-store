import React, { useEffect, useMemo, useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { Link, useNavigate } from "react-router-dom";
import ModalComponent from "../components/modal";
import SignUpModal from "../components/SignUpModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/slices/cartSlice";
import OrderList from "../components/orderList";
import { openCheckoutModal } from "../redux/slices/uiSlice";
import LoadingButton from "../components/LoadingButton";
import { useTheme } from "../contexts/ThemeContext";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isCheckoutModalOpen } = useSelector((state) => state.ui);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const { subtotal, total, itemCount } = useMemo(() => {
    if (!cartItems?.length) {
      return { subtotal: 0, total: 0, itemCount: 0 };
    }

    const sub = cartItems.reduce((sum, item) => {
      return sum + parseFloat(item.final_price) * item.quantity;
    }, 0);

    return {
      subtotal: sub,
      total: sub,
      itemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
    };
  }, [cartItems]);

  const proceedToCheckout = () => {
    if (!isAuthenticated) {
      dispatch(openCheckoutModal());
      return;
    }
    navigate("/checkout");
  };

  return (
    <div>
      <CommonHeader />
      <div className="max-w-[80rem] mx-auto lg:py-[6.25rem] md:py-[5rem] py-[3.5rem] text-left px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] 2xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
          <div className="lg:col-span-2 space-y-7.5">
            <h1 className="text-2xl font-bold mb-6 pb-5 border-b border-[#11111126] text-left">
              Your Cart{" "}
              {itemCount > 0 &&
                `(${itemCount} ${itemCount === 1 ? "item" : "items"})`}
            </h1>
            {cartItems?.length > 0 ? (
              cartItems.map((item) => (
                <OrderList key={item.cart_id} item={item} />
              ))
            ) : (
              <div className="text-center p-6 border rounded-md">
                <p className="mb-4">Your cart is empty.</p>
                <Link
                  className="inline-flex text-sm sm:text-lg gap-2 btn px-16 py-4 rounded-lg w-max mx-auto focus:outline-none items-center"
                  to="/shop"
                >
                  Continue shopping
                </Link>
              </div>
            )}
          </div>
          <aside
            className="bg-[#FFF7F2] rounded-[2.125rem] p-[1.875rem] h-fit lg:mt-10"
            style={{
              backgroundColor: theme.bottomFooterBackgroundColor,
              height: "fit-content",
            }}
          >
            <h2 className="md:text-2xl text-lg font-semibold mb-6">
              Order Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between  ">
                <span className="sm:text-lg font-medium">Subtotal</span>
                <span className="sm:text-lg font-medium">
                  ₹
                  {subtotal.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="sm:text-lg font-medium">Shipping Cost</span>
                <span className="sm:text-lg font-medium">Free</span>
              </div>
              <div className="border-t border-[#11111126] pt-5 my-4 flex justify-between font-medium">
                <span className="md:text-2xl text-lg font-medium">Total</span>
                <span className="md:text-2xl text-lg font-medium">
                  ₹{total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <LoadingButton
              onClick={() => {
                if (!isAuthenticated) {
                  dispatch(openCheckoutModal());
                } else {
                  proceedToCheckout();
                }
              }}
              text="Checkout"
              disabled={!cartItems?.length}
            />
            <div className="text-center mt-6">
              <Link
                className="sm:text-lg uppercase font-normal underline   hover:text-[#007BFF] transition-all duration-300"
                to="/shop"
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
      <ModalComponent
        isModalOpen={isCheckoutModalOpen}
        setShowSignUpModal={setShowSignUpModal}
      />
      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
      />
    </div>
  );
}

export default Cart;
