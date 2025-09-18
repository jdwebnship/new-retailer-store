import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeOrderPopup } from "../redux/slices/orderPopupSlice";
import close from "../assets/images/close.png";
import copy_icon from "../assets/images/copy_icon.png";
import { formatStatus } from "../utils/common";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import CancelOrder from "./CancelOrder";

const OrderDetailsPopup = ({ orderDetail }) => {
  const { theme, bottomFooterTextColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [openCancelModel, setOpenCancelModel] = useState(false);
  const orderPopup = useSelector((state) => state.orderPopup);
  const { orders } = useSelector((state) => state.customerOrders);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = formatStatus(orderDetail?.status);
  const shippingAddress = orders?.customerData?.[0] || {};
  const isPopupOpen = !!orderPopup?.order;

  useEffect(() => {
    if (isPopupOpen) {
      const timer = setTimeout(() => setIsOpen(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
      const timer = setTimeout(() => dispatch(closeOrderPopup()), 300);
      return () => clearTimeout(timer);
    }
  }, [isPopupOpen, dispatch]);

  const handleOverlayClick = () => {
    setIsOpen(false);
    setTimeout(() => dispatch(closeOrderPopup()), 300);
  };

  if (!isPopupOpen) return null;

  const displayCancelButton = () => {
    const allowedStatuses = [
      "order has been placed",
      "order is confirmed",
      "order has been dispatched from retailer",
      "order is processed by wholesaler",
      "order is ready for pickup",
    ];
    return allowedStatuses.includes(orderDetail?.status);
  }

  return (
    <>
      <div
        className={`overlay w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,.65)] z-99 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
          }`}
        onClick={handleOverlayClick}
      ></div>
      <div
        className={`fixed top-0 right-0 z-100 w-full max-w-[50rem] transition-transform duration-300 ease-in-out ${isOpen ? "" : "translate-x-full" // NEW: Slide from right (hidden when !isOpen)
          }`}
      >
        <div
          className="relative border border-white/20 w-full max-w-[50rem] h-dvh overflow-y-auto sm:p-7.5 p-4 mx-auto"
          style={{ backgroundColor: theme.backgroundColor }}
        >
          <div className="relative pb-6 mb-6 border-b ">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold ">Order Details</h1>
                <div className="flex items-center gap-2">
                  <span className=" font-mono text-lg">
                    #{orderPopup.order?.order_id || ""}
                  </span>
                  <img
                    className="cursor-pointer w-4 h-4"
                    src={copy_icon}
                    alt=""
                  />
                </div>
              </div>
              <img
                className="cursor-pointer w-4 h-4 mt-1.5"
                src={close}
                alt=""
                onClick={handleOverlayClick}
              />
            </div>
          </div>
          <div
            className="relative flex sm:flex-row flex-col sm:items-center justify-between gap-4 p-6  rounded-[0.625rem]"
            style={{
              backgroundColor: theme?.bottomFooterBackgroundColor,
              color: bottomFooterTextColor,
            }}
          >
            <div className="">
              <div className=" text-sm mb-1 uppercase">Order Date:</div>
              <div className=" text-sm font-bold">
                {orderPopup.order?.order_date || ""}
              </div>
            </div>
            <div className="">
              <div className=" text-sm mb-1 uppercase">TOTAL:</div>
              <div className=" text-sm font-bold">
                ₹{orderPopup.order?.final_amount || ""}
              </div>
            </div>
            <div className="">
              <div className=" text-sm mb-1 uppercase">STATUS:</div>
              <div className=" text-sm font-bold">{status || ""}</div>
            </div>
          </div>

          <div className="relative pt-6">
            <div className="border  rounded-[1.125rem] p-6">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h3 className=" font-bold text-base mb-1">SHIP TO:</h3>
                  <div className="space-y-1 ">
                    <div className="">{shippingAddress?.fullName}</div>
                    <div>{shippingAddress?.email}</div>
                    <div>{shippingAddress?.phone_number}</div>
                    <div className="leading-relaxed">
                      {shippingAddress?.shipping_address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pt-6">
            <div className="border  rounded-[1.125rem] p-6">
              <div className="flex items-start gap-3">
                <div>
                  <h3 className=" font-bold">PAYMENT:</h3>
                  <div className="">Pay on delivery</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pt-6">
            <div className="border  rounded-[1.125rem] p-6">
              <div className="flex items-start gap-3 mb-2">
                <h3 className=" font-bold">ORDER SUMMARY:</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="">Amount:</span>
                  <span className="">₹{orderPopup?.order?.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="">Subtotal:</span>
                  <span className="">₹0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="">Shipping Cost:</span>
                  <span className="">Free</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className=" font-bold">Total</span>
                  <span className=" font-bold">
                    ₹{orderPopup?.order?.final_amount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t flex flex-col sm:flex-row gap-4">
            <button
              className="flex-1 btn py-4 px-6 rounded-2xl"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
                navigate(`/products/${orderPopup?.order?.product_slug}`);
              }}
            >
              <span className="text-lg">Buy It Again</span>
            </button>
            {displayCancelButton() && (
              <button
                className="flex-1 btn py-4 px-6 rounded-2xl bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  setOpenCancelModel(true);
                }}
              >
                <span className="text-lg">Cancel Order</span>
              </button>
            )}
          </div>
        </div>
        <CancelOrder
          open={openCancelModel}
          onClose={() => {
            setOpenCancelModel(false);
            dispatch(closeOrderPopup());
          }}
          orderId={orderPopup?.order?.order_id}
        />
      </div>
    </>
  );
};

export default OrderDetailsPopup;
