import React, { useState } from "react";
import { HiMiniWallet } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Payment = () => {
      const navigate = useNavigate();
      const [discountCode, setDiscountCode] = useState("");
    
  return (
    <div className="w-full md:border-l-[2px] md:hidden-border-t-[2px] md:py-0 py-4 border-gray-100">
      <div className="md:px-7 px-2">
        <div className="md:space-y-8 space-y-3">
          <div className=" ">
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-md relative">
                  <img
                    src="product/Screenshot 2025-05-01 at 10.52.27 PM 1 (1).png"
                    alt="White Adrenaline Tee"
                    fill
                    className="object-cover border  rounded-md"
                  />
                </div>
                <div className=" flex flex-col">
                  <span className="text-sm font-semibold">
                    White Adrenaline Tee
                  </span>
                  <span className="text-sm text-gray-400 font-semibold">S</span>
                </div>
              </div>
              <span className="text-base font-semibold">₹984.00</span>
            </div>
          </div>

       

          <div className="space-y-3  font-semibold  pb-4">
            <div className="flex justify-between text-sm">
              <span> Subtotal</span>
              <span>₹984.00</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span className="text-gray-500">Entered address</span>
            </div>

            <div className="flex justify-between text-xl  font-bold pt-3">
              <span className="">Total</span>
              <div className="text-right">
                <div>₹984.00</div>
                <div className="text-xs font-semibold text-gray-500">
                  Including ₹48.86 in taxes
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold  text-xl ">Payment</h2>
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
                    src="new arrivels/visa-logo-visa-icon-transparent-free-png.webp"
                    alt="Visa"
                    width={30}
                    height={20}
                  />
                  <img
                    src="logo/upi_logo_icon_169316.webp"
                    alt="Mastercard"
                    width={30}
                    height={20}
                  />
                  <img
                    src="logo/image.png"
                    alt="PayPal"
                    width={30}
                    height={20}
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50">
                <div className="h-32 w-full rounded-md">
                  <HiMiniWallet className="h-full w-full text-[#868484]" />
                </div>
                <p className="text-[9px] text-gray-500 mt-3 text-center">
                  After clicking "Pay now", you will be redirected to <br />
                  <span className="font-medium ">
                    Razorpay Payment Gateway (UPI, Cards & Netbanking)
                  </span>{" "}
                  <br />
                  to complete your purchase securely.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => navigate("/order")}
              className="w-full bg-black hover:bg-black/90 text-white py-3 rounded-md"
            >
              Pay now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
