"use client";

import { useState } from "react";
import Header from "../../helpers/components/Header";
import Footer from "../../helpers/components/Footer";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "White Adrenaline Tee",
      price: 984.0,
      size: "S",
      quantity: 1,
      image: "product/Screenshot 2025-05-01 at 10.52.27 PM 1 (1).png",
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const calculateTotal = (item) => {
    return item.price * item.quantity;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1  w-full  md:py-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className=" md:text-3xl text-2xl poppins-medium px-32  font-bold">
            Your cart
          </h1>
          <abbr
            href="/shop"
            className="md:text-xs text-[10px]  px-32 font-medium text-gray-600 underline"
          >
            Continue shopping
          </abbr>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col relative">
            <div className="border-b px-32 pb-2 mb-4 grid grid-cols-12 gap-4">
              <div className="col-span-6 font-medium text-xs uppercase text-gray-500">
                Product
              </div>
              <div className="col-span-3 font-medium text-xs uppercase text-gray-500 text-center">
                Quantity
              </div>
              <div className="col-span-3 font-medium text-xs uppercase text-gray-500 text-right">
                Total
              </div>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12  px-32 gap-4 py-3 border-b"
              >
                <div className="col-span-6 flex justify-start items-center gap-4">
                  <div className="md:w-20 md:h-20 w-16 h-16 relative flex justify-center items-center  rounded">
                    <img
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className=" font-semibold text-black md:text-xs text-[10px]">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 md:text-xs text-[10px] font-semibold mt-1">
                      ₹ {item.price.toFixed(2)}
                    </p>
                    <p className="text-gray-600 mt-1 md:text-xs text-[10px] font-semibold">
                      Size: {item.size}
                    </p>
                  </div>
                </div>

                <div className="col-span-3 flex items-center justify-center ">
                  <div className="flex items-center border-[1.5px] border-[font-semibold]   rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="md:px-3  py-1 "
                      aria-label="Decrease quantity"
                    >
                      <BiMinus className="h-3 w-3 " />
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) => {
                        const val = Number.parseInt(e.target.value);
                        if (!isNaN(val)) updateQuantity(item.id, val);
                      }}
                      className="w-10 text-center  md:text-xs text-[10px] py-1"
                      aria-label="Quantity"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="md:px-3 py-1 hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <BiPlus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-2  hover:text-red-600"
                    aria-label="Remove item"
                  >
                    <FaRegTrashCan className="h-3 w-3" />
                  </button>
                </div>

                <div className="col-span-3 flex items-center justify-end font-semibold md:text-xs text-[10px]">
                  ₹ {calculateTotal(item).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="mt-20 flex justify-end px-32   w-full items-end">
              <div className=" md:w-1/3">
                <div className="flex justify-between py-2">
                  <span className="font-bold text-sm">Estimated total </span>
                  <span className="font-bold text-sm">
                    ₹{" "}
                    {cartItems
                      .reduce((total, item) => total + calculateTotal(item), 0)
                      .toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mb-4">
                  Taxes included. Discounts and shipping calculated at checkout.
                </p>
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-3 text-sm bg-black text-white rounded-md"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button asChild>
              <a href="/shop">Continue Shopping</a>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
