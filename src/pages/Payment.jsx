import React, { useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const items = location.state?.items || [];
  const [method, setMethod] = useState("card");

  const placeOrder = (e) => {
    e.preventDefault();
    // Simulate success/failure randomly for now
    const isSuccess = true; // keep success path by default
    if (isSuccess) {
      navigate("/order-success", {
        state: { orderId: Math.floor(100000 + Math.random() * 900000) },
      });
    } else {
      navigate("/order-failure");
    }
  };

  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] py-10">
        <h1 className="text-2xl font-semibold mb-6">Payment</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={placeOrder} className="lg:col-span-2 space-y-6">
            <section className="border rounded-md p-4">
              <h2 className="text-lg font-semibold mb-4">
                Select payment method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="method"
                    value="card"
                    checked={method === "card"}
                    onChange={() => setMethod("card")}
                  />
                  <span>Credit / Debit Card</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="method"
                    value="upi"
                    checked={method === "upi"}
                    onChange={() => setMethod("upi")}
                  />
                  <span>UPI / Wallet</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="method"
                    value="cod"
                    checked={method === "cod"}
                    onChange={() => setMethod("cod")}
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>
              </div>
            </section>

            <section className="border rounded-md p-4">
              <h2 className="text-lg font-semibold mb-4">
                Payment details (dummy)
              </h2>
              {method === "card" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    className="border rounded-md px-3 py-2"
                    placeholder="Card number"
                  />
                  <input
                    className="border rounded-md px-3 py-2"
                    placeholder="Name on card"
                  />
                  <input
                    className="border rounded-md px-3 py-2"
                    placeholder="MM/YY"
                  />
                  <input
                    className="border rounded-md px-3 py-2"
                    placeholder="CVC"
                  />
                </div>
              )}
              {method === "upi" && (
                <div className="grid grid-cols-1 gap-4">
                  <input
                    className="border rounded-md px-3 py-2"
                    placeholder="UPI ID (name@bank)"
                  />
                </div>
              )}
              {method === "cod" && (
                <p className="text-sm text-gray-600">
                  Pay cash to the courier upon delivery.
                </p>
              )}
            </section>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-black text-white rounded-md py-2 px-6"
              >
                Place Order
              </button>
            </div>
          </form>

          <aside className="border rounded-md p-4 h-fit">
            <h2 className="text-lg font-semibold mb-4">Order summary</h2>
            <div className="space-y-2 text-sm">
              {items.map((it) => (
                <div key={it.id} className="flex justify-between">
                  <span>
                    {it.name} × {it.quantity}
                  </span>
                  <span>${(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Payment;
