import React from "react";
import CommonHeader from "../components/CommonHeader";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const items = location.state?.items || [];

  const handleContinue = (e) => {
    e.preventDefault();
    navigate("/payment", { state: { items } });
  };

  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] py-10">
        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form className="lg:col-span-2 space-y-8" onSubmit={handleContinue}>
            <section className="border rounded-md p-4">
              <h2 className="text-lg font-semibold mb-4">Billing details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1" htmlFor="b_name">
                    Full name
                  </label>
                  <input
                    id="b_name"
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1" htmlFor="b_email">
                    Email
                  </label>
                  <input
                    id="b_email"
                    type="email"
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm mb-1" htmlFor="b_address">
                    Address
                  </label>
                  <input
                    id="b_address"
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1" htmlFor="b_phone">
                    Phone
                  </label>
                  <input
                    id="b_phone"
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </section>

            <section className="border rounded-md p-4">
              <h2 className="text-lg font-semibold mb-4">Shipping details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1" htmlFor="s_name">
                    Full name
                  </label>
                  <input
                    id="s_name"
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1" htmlFor="s_email">
                    Email
                  </label>
                  <input
                    id="s_email"
                    type="email"
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm mb-1" htmlFor="s_address">
                    Address
                  </label>
                  <input
                    id="s_address"
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="456 Market St"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1" htmlFor="s_phone">
                    Phone
                  </label>
                  <input
                    id="s_phone"
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="(555) 987-6543"
                  />
                </div>
              </div>
            </section>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-black text-white rounded-md py-2 px-6"
              >
                Continue to Payment
              </button>
            </div>
          </form>

          <aside className="border rounded-md p-4 h-fit">
            <h2 className="text-lg font-semibold mb-4">Order summary</h2>
            <div className="space-y-3 text-sm">
              {items.length === 0 ? (
                <div>No items in order.</div>
              ) : (
                items.map((it) => (
                  <div key={it.id} className="flex justify-between">
                    <span>
                      {it.name} × {it.quantity}
                    </span>
                    <span>${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))
              )}
              <div className="flex justify-between pt-2 border-t">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
