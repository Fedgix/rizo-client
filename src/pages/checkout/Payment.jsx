import React, { useEffect, useState } from "react";
import { HiMiniWallet } from "react-icons/hi2";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  
  initializeBuyNow,
  selectedShippingAddress,
  updateCheckoutQuantity,
} from "../../services/user/user";
import { BiMinus, BiPlus } from "react-icons/bi";

const Payment = ({ selectedAddressId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  useEffect(() => {
    const encodedPayload = searchParams.get("payload");
    if (encodedPayload) {
      try {
        const decoded = JSON.parse(decodeURIComponent(encodedPayload));
        initializeBuyNow(decoded)
          .then((data) => {
            setProducts(data.items);
            setPrices(data.totals);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.error("Failed to parse payload", error);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    selectedShippingAddress(selectedAddressId)
      .then((data) => {
        console.log(data, "🪙");
      })
      .catch((err) => {
        console.log(err);
        setShowToast(true);
        setToastMessage(err);
        setToastType("Fail");
        if (err === "Checkout session not found") {
          navigate("/cart");
        }
      });
  }, [selectedAddressId]);

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);
  const updateQuantity = async (id, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.variantId === id ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      const payload = {
        quantity: newQuantity,
        variantId: id,
      };
      const response = await updateCheckoutQuantity(payload);
      if (response.totals) {
        setPrices(response.totals);
      }
    } catch (error) {
      console.log(error);
      setShowToast(true);
      setToastMessage(error);
      setToastType("Fail");
      setProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.variantId === id ? { ...item, quantity: item.quantity } : item
        )
      );
    }
  };

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const calculateTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  console.log(prices, "❌");
  return (
    <div className="w-full md:border-l-[2px] h-full flex flex-col">
      {showToast && (
        <div className="fixed  top-20 right-2 z-50 overflow-hidden">
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
      <div className="md:px-7 px-2 flex-grow overflow-y-auto h-full">
        <div className="space-y-3  h-full custom-scrollbar ">
          {products.map((item) => (
            <div key={item.variantId} className="h-full ">
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-md relative">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="object-cover border rounded-md w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                      Name: {item.productName}
                    </span>
                    <span className="text-sm text-gray-400 font-semibold">
                      Size: {item.size}
                    </span>
                    <span className="text-sm text-gray-400 font-semibold">
                      Quantity: {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base items-center flex justify-center font-semibold">
                    ₹{calculateTotal(item.price, item.quantity)}
                  </span>
                  <div className="flex items-center border-[1.5px] border-gray-300 rounded-md">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.variantId, item.quantity, -1)
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
                      readOnly
                      className="w-10 text-center md:text-xs text-[10px] py-1"
                      aria-label="Quantity"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.variantId, item.quantity, 1)
                      }
                      className="md:px-3 py-1 hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <BiPlus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Payment Section at Bottom */}
      <div className=" pt-4 px-2 md:px-7 bg-white    bottom-0">
        <div className="space-y-2">
          <div className="font-semibold">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{prices.subtotal || "0.00"}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span className="text-gray-500">
                {prices.shippingFee
                  ? `₹${prices.shippingFee}`
                  : "Entered address"}
              </span>
            </div>
            {!selectedAddressId && (
              <div className="px-4 py-2 bg-yellow-50 border-b">
                <p className="text-sm text-yellow-600">
                  Please select a shipping address
                </p>
              </div>
            )}

            <div className="flex justify-between text-xl font-bold pt-3">
              <span>Total</span>
              <div className="text-right">
                <div>₹{prices.totalAmount || "0.00"}</div>
                <div className="text-xs font-semibold text-gray-500">
                  {prices.tax ? `Including ₹${prices.tax} in taxes` : ""}
                </div>
              </div>
            </div>
          </div>

          <h2 className="font-semibold text-xl">Payment</h2>
          <p className="text-xs text-gray-500">
            All transactions are secure and encrypted.
          </p>

          <div className="border rounded-md">
            <div className="p-4 flex justify-between items-center border border-black rounded-md">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-black"></div>
                </div>
                <span className="md:text-xs text-[10px] md:w-full w-[90%]">
                  Razorpay Payment Gateway (UPI, Cards & Netbanking)
                </span>
              </div>
              <div className="flex md:gap-1 px-2">
                <img
                  src="logo/upi_logo_icon_169316.webp"
                  alt="Mastercard"
                  width={30}
                  height={20}
                />
                <img src="logo/image.png" alt="PayPal" width={30} height={20} />
              </div>
            </div>

            <div className="p-4 bg-gray-50">
              <div className="h-32 w-full rounded-md">
                <HiMiniWallet className="h-full w-full text-[#868484]" />
              </div>
              <p className="text-[9px] text-gray-500 mt-3 text-center">
                After clicking "Pay now", you will be redirected to <br />
                <span className="font-medium">
                  Razorpay Payment Gateway (UPI, Cards & Netbanking)
                </span>{" "}
                <br />
                to complete your purchase securely.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/order")}
            className="w-full bg-black hover:bg-black/90 text-white py-3 rounded-md"
          >
            Pay now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
