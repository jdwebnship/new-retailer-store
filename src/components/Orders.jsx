import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import empty from "../assets/images/empty-state.svg";
import watch from "../assets/watch.png";
import {
  clearOrders,
  fetchCustomerOrders,
} from "../redux/slices/customerOrdersSlice";
import { toTitleCase } from "../utils/common";
import { openOrderPopup } from "../redux/slices/orderPopupSlice";
import { useTheme } from "../contexts/ThemeContext";

const Orders = () => {
  const dispatch = useDispatch();
  const { theme, bottomFooterTextColor } = useTheme();
  const { orders } = useSelector((state) => state.customerOrders);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCustomerOrders());
    return () => {
      dispatch(clearOrders());
    };
  }, [dispatch]);

  const handleViewOrderDetails = (order) => {
    dispatch(openOrderPopup(order)); // Dispatch action with the full order object
  };
  return (
    <div className="w-full">
      <div className="flex justify-between w-full pb-[1.5rem] items-center">
        <h3 className="text-2xl font-bold">Orders</h3>
        {/* <p className="text-sm text-[#808080]">Showing 1-10 Of 20 Results.</p> */}
      </div>
      <hr className="opacity-10" />

      {orders?.orders?.length > 0 ? (
        <>
          {orders?.orders?.map((val) => {
            const status = toTitleCase(val?.status);
            return (
              <div className="flex flex-col mt-[1.5rem] text-start">
                <div className="rounded-2xl border border-[#AAAAAA] overflow-auto">
                  <div
                    className="top-card  p-[0.938rem]"
                    style={{
                      backgroundColor: theme?.bottomFooterBackgroundColor,
                      color: bottomFooterTextColor,
                    }}
                  >
                    <div className="flex flex-wrap sm:gap-[1.5rem] gap-[1rem] justify-between">
                      <div className="flex flex-wrap sm:gap-[1.5rem] gap-[1rem]">
                        <div>
                          <span className="text-sm uppercase">Order Date:</span>
                          <p className="text-sm font-bold">{val?.order_date}</p>
                        </div>
                        <div>
                          <span className="text-sm uppercase">Total:</span>
                          <p className="text-sm font-bold">
                            ₹{val?.final_amount}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm uppercase">Status:</span>
                          <p className="text-sm font-bold">{status}</p>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm uppercase">Order Id:</span>
                        <p className="text-sm font-bold">#{val?.order_id}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bottom-card p-[0.938rem]">
                    <div className="flex flex-wrap gap-[0.938rem]">
                      <div className="w-[5rem] h-[5rem] rounded-2xl overflow-hidden">
                        <img src={watch} alt="" />
                      </div>
                      <div>
                        <h6 className="sm:text-lg font-bold">
                          {val?.product_name}
                        </h6>
                        <div className="flex flex-wrap gap-[0.938rem] items-center mt-[0.5rem]">
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/products/${val.product_slug}`);
                            }}
                            className="inline-flex text-sm gap-2 btn px-[1.5rem] py-[0.5rem] rounded-lg font-medium focus:outline-none items-center"
                          >
                            Buy it Again
                          </Link>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              handleViewOrderDetails(val);
                            }}
                            className="underline"
                          >
                            View order details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="flex flex-col justify-center mx-auto gap-[0.9375rem] mt-6">
          <img src={empty} className="w-[6.25rem] h-[6.25rem] mx-auto" alt="" />
          <p>Your order history is waiting to be filled.</p>
          <Link
            to="/shop"
            className="inline-flex text-sm sm:text-lg gap-2 btn px-16 py-4 rounded-lg w-max mx-auto focus:outline-none items-center"
          >
            Start Shopping
          </Link>
        </div>
      )}

      {/* <nav
        className="mt-[2.375rem] md:mt-[4.375rem]"
        aria-label="Page navigation"
      >
        <ul class="flex items-center justify-center -space-x-px h-8 text-sm text-[1rem]">
          <li>
            <a href="#" class="px-3 h-8">
              1
            </a>
          </li>
          <li>
            <a href="#" class="px-3 h-8">
              2
            </a>
          </li>
          <li>
            <a href="#" aria-current="page" class="px-3 h-8">
              3
            </a>
          </li>
          <li>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="3"
                viewBox="0 0 11 3"
                fill="none"
              >
                <path
                  d="M1.31475 2.176C0.77075 2.176 0.30675 1.728 0.30675 1.2C0.30675 0.656 0.77075 0.192 1.31475 0.192C1.85875 0.192 2.32275 0.656 2.32275 1.2C2.32275 1.728 1.85875 2.176 1.31475 2.176ZM5.50225 2.176C4.95825 2.176 4.49425 1.728 4.49425 1.2C4.49425 0.656 4.95825 0.192 5.50225 0.192C6.04625 0.192 6.51025 0.656 6.51025 1.2C6.51025 1.728 6.04625 2.176 5.50225 2.176ZM9.68975 2.176C9.14575 2.176 8.68175 1.728 8.68175 1.2C8.68175 0.656 9.14575 0.192 9.68975 0.192C10.2338 0.192 10.6978 0.656 10.6978 1.2C10.6978 1.728 10.2338 2.176 9.68975 2.176Z"
                  fill="#111111"
                />
              </svg>
            </span>
          </li>
          <li>
            <a href="#" class="px-3 h-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M12 24L20 16L12 8"
                  stroke="#111111"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav> */}
    </div>
  );
};

export default Orders;
