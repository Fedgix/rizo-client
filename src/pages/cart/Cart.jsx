"use client";

import { useState, useEffect } from "react";
import Header from "../../helpers/components/Header";
import Footer from "../../helpers/components/Footer";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import Cookies from "js-cookie";

import {
  deleteProduct,
  getCart,
  updateQuantity,
} from "../../services/user/user";

export default function Cart() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  useEffect(() => {
    getCart()
      .then((data) => {
        setCartItems(data.items);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item._id));
    }
  };

  const increase = async (id, quantity, stock) => {
    if (quantity >= stock) {
      setShowToast(true);
      setToastMessage("Maximum Quantity Reached");
      setToastType("error");
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    try {
      const payload = { quantity: quantity + 1 };
      await updateQuantity(`/${id}/increment`, payload);
    } catch (error) {
      console.log(error);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
      setToastMessage("Failed to update quantity");
      setToastType("error");
      setShowToast(true);
    }
  };

  const decrement = async (id, quantity) => {
    const newQuantity = Math.max(1, quantity);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      const payload = { quantity: newQuantity };
      await updateQuantity(`/${id}/decrement`, payload);
    } catch (error) {
      console.log(error);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  const removeItem = async (id) => {
    try {
      setCartItems((items) => items.filter((item) => item._id !== id));
      setSelectedItems((items) => items.filter((itemId) => itemId !== id));
      await deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotal = (item) => {
    const unitPrice =
      item.variantId?.discountPrice || item.variantId?.price || 0;
    return unitPrice * item.quantity;
  };

  return (
    <div className="flex flex-col w-full h-full">
      {showToast && (
        <div className="fixed top-20 right-2 z-50 overflow-hidden">
          <div
            className={`flex items-center w-full max-w-xs md:px-4 px-2 md:py-2 py-1 rounded-lg shadow ${
              toastType === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
            style={{
              transform: "translateX(0)",
              animation: "0.1s ease-out 0s 1 normal forwards running slideIn",
            }}
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-4 h-4">
              {toastType === "success" ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </div>
            <div className="md:text-sm text-xs font-normal">{toastMessage}</div>
          </div>
          <style>{`
            @keyframes slideIn {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(0);
              }
            }
          `}</style>
        </div>
      )}
      {isLoading ? (
        <div className="animate-pulse">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            animation="wave"
          />

          <div className="flex flex-col w-full py-10 h-screen px-4 md:px-32">
            <div className="flex justify-between items-center mb-8">
              <Skeleton
                variant="text"
                width={150}
                height={40}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width={120}
                height={20}
                animation="wave"
              />
            </div>

            <div className="grid grid-cols-12 gap-4 pb-2 mb-4 border-b">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={i === 0 ? "col-span-6" : "col-span-3"}>
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={20}
                    animation="wave"
                  />
                </div>
              ))}
            </div>

            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 py-3 border-b"
              >
                <div className="col-span-6 flex gap-4">
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={80}
                    animation="wave"
                  />
                  <div className="flex flex-col justify-center">
                    <Skeleton
                      variant="text"
                      width={120}
                      height={20}
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      width={80}
                      height={16}
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      width={60}
                      height={16}
                      animation="wave"
                    />
                  </div>
                </div>

                <div className="col-span-3 flex items-center justify-center">
                  <Skeleton
                    variant="rectangular"
                    width={100}
                    height={30}
                    animation="wave"
                  />
                </div>

                <div className="col-span-3 flex items-center justify-end">
                  <Skeleton
                    variant="text"
                    width={60}
                    height={20}
                    animation="wave"
                  />
                </div>
              </div>
            ))}

            <div className="mt-20 flex justify-end w-full">
              <div className="md:w-1/3 w-full">
                <Skeleton
                  variant="text"
                  width="100%"
                  height={30}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={30}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  animation="wave"
                  sx={{ mb: 2 }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={45}
                  animation="wave"
                />
              </div>
            </div>
          </div>

          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            animation="wave"
          />
        </div>
      ) : (
        <>
          <Header />
          <main className="flex flex-col w-full py-10 min-h-screen h-auto">
            <div className="flex justify-between items-center w-full md:px-0 px-4 mb-8">
              <h1 className="md:text-3xl text-2xl poppins-medium md:px-32 font-bold">
                Your cart
              </h1>
              <abbr
                href="/shop"
                className="md:text-xs text-[10px] md:px-32 font-medium text-gray-600 underline"
              >
                Continue shopping
              </abbr>
            </div>

            {cartItems.length > 0 ? (
              <div className="flex flex-col relative py-10">
                <div className="border-b md:px-32 px-2 pb-2 mb-4 grid grid-cols-12 gap-4">
                  <div className="col-span-1 font-medium text-xs uppercase text-gray-500">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                  </div>
                  <div className="col-span-5 font-medium text-xs uppercase text-gray-500">
                    Product
                  </div>
                  <div className="col-span-3 font-medium text-xs uppercase text-gray-500 text-center">
                    Quantity
                  </div>
                  <div className="col-span-3 font-medium text-xs uppercase text-gray-500 text-right">
                    Total
                  </div>
                </div>

                {cartItems.map((item) => {
                  const product = item.productId;
                  const variant = item.variantId;
                  const imageSrc =
                    product?.thumbnailImage || product?.defaultImage;
                  const unitPrice =
                    variant?.discountPrice || variant?.price || 0;

                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 md:px-32 px-2 gap-4 py-3 border-b"
                    >
                      <div className="col-span-1 flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item._id)}
                          onChange={() => toggleItemSelection(item._id)}
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                      </div>
                      <div className="col-span-5 flex justify-start items-center gap-4">
                        <div className="md:w-20 md:h-20 w-16 h-16 relative flex justify-center items-center rounded overflow-hidden">
                          <img
                            src={imageSrc}
                            alt={product?.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-black md:text-xs text-[10px]">
                            {product?.name}
                          </h3>
                          <p className="text-gray-600 md:text-xs text-[10px] font-semibold mt-1">
                            ₹ {unitPrice}
                          </p>
                          <p className="text-gray-600 mt-1 md:text-xs text-[10px] font-semibold">
                            Size: {variant?.size}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-gray-600 md:text-xs text-[10px] font-semibold">
                              Color: {variant?.color}
                            </span>
                            <span
                              className="inline-block w-3 h-3 rounded-full border border-gray-300"
                              style={{ backgroundColor: variant?.colorCode }}
                            ></span>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-3 flex items-center justify-center">
                        <div className="flex items-center border-[1.5px] border-gray-300 rounded-md">
                          <button
                            onClick={() =>
                              decrement(item._id, item.quantity - 1)
                            }
                            className="md:px-3 py-1"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <BiMinus className="h-3 w-3" />
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = Number.parseInt(e.target.value);
                              if (!isNaN(val)) updateQuantity(item.id, val);
                            }}
                            className="w-10 text-center md:text-xs text-[10px] py-1"
                            aria-label="Quantity"
                          />
                          <button
                            onClick={() =>
                              increase(
                                item._id,
                                item.quantity,
                                item.variantId?.stock
                              )
                            }
                            className="md:px-3 py-1 hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <BiPlus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="ml-2 hover:text-red-600"
                          aria-label="Remove item"
                        >
                          <FaRegTrashCan className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="col-span-3 flex items-center justify-end font-semibold md:text-xs text-[10px]">
                        ₹ {(unitPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}

                <div className="mt-20 flex justify-end md:px-32 px-2 w-full items-end">
                  <div className="md:w-1/3">
                    <div className="flex justify-between py-2">
                      <span className="font-bold text-sm">Estimated total</span>
                      <span className="font-bold text-sm">
                        ₹{" "}
                        {cartItems
                          .filter(item => selectedItems.includes(item._id))
                          .reduce(
                            (total, item) => total + calculateTotal(item),
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mb-4">
                      Taxes included. Discounts and shipping calculated at
                      checkout.
                    </p>
                    <button
                      onClick={() => {
                        if (selectedItems.length === 0) {
                          setShowToast(true);
                          setToastMessage("Please select at least one item");
                          setToastType("error");
                          return;
                        }
                        navigate("/checkout", { state: { selectedItems } });
                      }}
                      className="w-full py-3 text-sm bg-black text-white rounded-md"
                    >
                      Checkout ({selectedItems.length})
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
          <Footer isLoading={isLoading} />
        </>
      )}
    </div>
  );
}