// src/pages/Cart.jsx
import React, { useMemo, useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { Link, useNavigate } from "react-router-dom";
import ModalComponent from "../components/modal";

function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Longines Heritage Classic Copper-Black",
      price: 79.99,
      quantity: 1,
      image: "/src/assets/images/hero.jpg",
    },
    {
      id: 2,
      name: "Lacoste Navy Blue Logo Work Premium Polo T-Shirt",
      price: 129.0,
      quantity: 2,
      image: "/src/assets/images/hero.jpg",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="max-w-[80rem] mx-auto lg:py-[6.25rem] md:py-[5rem] py-[3.5rem] text-left">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
          <div className="lg:col-span-2 space-y-7.5">
            <h1 className="text-2xl font-bold mb-6 pb-5 border-b border-[#11111126] text-left">
              Your Cart
            </h1>
            {items.length === 0 ? (
              <div className="text-center p-6 border rounded-md">
                <p>Your cart is empty.</p>
                <Link className="text-blue-600" to="/shop">
                  Continue shopping
                </Link>
              </div>
            ) : (
              items.map((it) => (
                <div
                  key={it.id}
                  className="flex md:flex-row flex-col md:gap-6 gap-4 justify-between"
                >
                  <div className="flex gap-[0.938rem] flex-1 max-w-[25.938rem]">
                    <img
                      src={it.image}
                      alt={it.name}
                      className="lg:w-[6.25rem] lg:h-[6.25rem] w-20 h-20 object-cover rounded-[1.125rem]"
                    />
                    <div>
                      <div className="sm:text-lg text-base font-bold mb-2.5 text-[#111111]">
                        {it.name}
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
                            ${it.price.toFixed(2)}
                          </span>
                          <span className="leading-none text-sm text-[#808080]">
                            ${it.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(it.id)}
                        className="text-sm underline uppercase cursor-pointer text-[#111111]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 h-12 border border-[#AAAAAA] rounded-[0.625rem] w-fit md:mx-auto md:ml-[0] ml-[6rem]">
                    <button
                      onClick={() => decreaseQty(it.id)}
                      className="text-2xl font-normal text-[#111111] focus:outline-none cursor-pointer"
                      style={{ minWidth: "2.5rem" }}
                    >
                      –
                    </button>
                    <span className="text-base font-normal text-[#111111] select-none">
                      {it.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(it.id)}
                      className="text-2xl font-normal text-[#111111] focus:outline-none cursor-pointer"
                      style={{ minWidth: "2.5rem" }}
                    >
                      +
                    </button>
                  </div>
                  <div className="md:ml-[0] ml-[6rem]">
                    <p className="text-lg font-bold">
                      ${(it.price * it.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
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
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="sm:text-lg font-medium">Taxes (7%)</span>
                <span className="sm:text-lg font-medium">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-[#11111126] pt-5 mt-4 flex justify-between font-medium">
                <span className="md:text-2xl text-lg font-medium">Total</span>
                <span className="md:text-2xl text-lg font-medium">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={items.length === 0}
              className="mt-6 w-full sm:text-lg font-normal bg-black text-white rounded-[0.625rem] sm:py-4 py-3 uppercase disabled:opacity-60 cursor-pointer"
            >
              Open Modal
            </button>
            <button
              onClick={proceedToCheckout}
              disabled={items.length === 0}
              className="mt-6 w-full sm:text-lg font-normal bg-black text-white rounded-[0.625rem] sm:py-4 py-3 uppercase disabled:opacity-60 cursor-pointer"
            >
              Checkout
            </button>
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
