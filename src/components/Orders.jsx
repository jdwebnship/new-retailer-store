import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import empty from "../assets/images/empty-state.svg";
import {
  clearOrders,
  fetchCustomerOrders,
} from "../redux/slices/customerOrdersSlice";
import { formatStatus } from "../utils/common";
import { openOrderPopup } from "../redux/slices/orderPopupSlice";
import { useTheme } from "../contexts/ThemeContext";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, bottomFooterTextColor } = useTheme();
  const { orders, loading } = useSelector((state) => state.customerOrders);

  useEffect(() => {
    dispatch(fetchCustomerOrders());
    return () => {
      dispatch(clearOrders());
    };
  }, [dispatch]);

  const handleViewOrderDetails = (order) => {
    dispatch(openOrderPopup(order));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between w-full pb-[1.5rem] items-center">
        <h3 className="text-2xl font-bold text-[#111111]">Orders</h3>
      </div>
      <hr className="opacity-10" />

      {loading ? (
        <div className="flex items-center justify-center h-[20rem] p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : orders?.orders?.length > 0 ? (
        <>
          {orders?.orders?.map((val) => {
            const status = formatStatus(val?.status);
            return (
              <div
                key={val?.order_id}
                className="flex flex-col mt-[1.5rem] text-start"
              >
                <div className="rounded-[0.625rem] border border-[#AAAAAA]/15 overflow-auto">
                  <div
                    className="top-card px-[0.938rem] py-3 !text-[#111111]"
                    style={{
                      backgroundColor: theme?.bottomFooterBackgroundColor,
                      color: bottomFooterTextColor,
                    }}
                  >
                    <div className="flex flex-wrap sm:gap-[1.5rem] gap-[1rem] justify-between !text-[#111111]">
                      <div className="flex flex-wrap sm:gap-[2rem] gap-[1rem]">
                        <div>
                          <span className="text-sm uppercase">Order Date:</span>
                          <p className="text-sm font-bold">{val?.order_date}</p>
                        </div>
                        <div>
                          <span className="text-sm uppercase">Total:</span>
                          <p className="text-sm font-bold">
                            ₹{val?.final_amount * val?.quantity}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm uppercase">Status:</span>
                          <p className="text-sm font-bold">{status}</p>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm uppercase">Order Id:</span>
                        <p className="text-sm font-bold">{val?.order_number}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bottom-card p-[0.938rem] !text-[#111111]">
                    <div className="flex flex-wrap gap-[0.938rem]">
                      <div className="w-[5rem] h-[5rem] rounded-[0.625rem] overflow-hidden">
                        {val?.image ? (
                          <img
                            src={val.image[0]}
                            alt={val?.product_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-sm">
                            No Image
                          </div>
                        )}
                      </div>
                      <div>
                        <h6 className="sm:text-lg font-bold">
                          {val?.product_name}
                        </h6>
                        <div className="flex flex-wrap gap-[0.938rem] items-center mt-[0.5rem]">
                          <Link
                            to={`/products/${val.product_slug}`}
                            className="inline-flex text-sm gap-2 btn px-[0.9375rem] py-[0.5rem] rounded-lg font-medium focus:outline-none items-center"
                          >
                            Buy it Again
                          </Link>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              handleViewOrderDetails(val);
                            }}
                            className="underline uppercase"
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
    </div>
  );
};

export default Orders;
