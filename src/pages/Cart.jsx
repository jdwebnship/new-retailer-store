import React, { useMemo, useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 79.99,
      quantity: 1,
      image: "/src/assets/images/hero.jpg",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 129.0,
      quantity: 2,
      image: "/src/assets/images/hero.jpg",
    },
  ]);

  const increaseQty = (id) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: it.quantity + 1 } : it
      )
    );
  };

  const decreaseQty = (id) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: Math.max(1, it.quantity - 1) } : it
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const { subtotal, tax, total } = useMemo(() => {
    const sub = items.reduce((s, it) => s + it.price * it.quantity, 0);
    const t = sub * 0.07;
    return { subtotal: sub, tax: t, total: sub + t };
  }, [items]);

  const proceedToCheckout = () => {
    navigate("/checkout", { state: { items } });
  };

  return (
    <div>
      <CommonHeader />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] py-10">
        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="text-center p-6 border rounded-md">
                <p>Your cart is empty.</p>
                <Link className="text-blue-600 hover:underline" to="/shop">
                  Continue shopping
                </Link>
              </div>
            ) : (
              items.map((it) => (
                <div key={it.id} className="flex gap-4 p-4 border rounded-md">
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-600">
                      ${it.price.toFixed(2)}
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => decreaseQty(it.id)}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{it.quantity}</span>
                      <button
                        onClick={() => increaseQty(it.id)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(it.id)}
                        className="ml-auto text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <aside className="border rounded-md p-4 h-fit">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={proceedToCheckout}
              disabled={items.length === 0}
              className="mt-4 w-full bg-black text-white rounded-md py-2 disabled:opacity-60"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Cart;
