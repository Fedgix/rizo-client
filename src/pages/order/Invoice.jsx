import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const HTMLToPDF = ({ order }) => {
  const pdfRef = useRef();

  const downloadPDF = async () => {
    const input = pdfRef.current;
    input.classList.remove("hidden");
    input.classList.add("block");

    await html2canvas(input, {
      scale: 3,
      logging: false,
      useCORS: true,
      backgroundColor: "#ffffff",
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`invoice_${order.orderNumber}.pdf`);
      input.classList.remove("block");
      input.classList.add("hidden");
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return "₹" + (amount / 100).toFixed(2);
  };

  return (
    <div>
      <div
        ref={pdfRef}
        className="hidden font-sans text-[4px] leading-[1.5] p-1.5 w-full"
      >
        <div className="flex justify-between mb-1 border-b border-gray-300 pb-1">
          <div>
            <div className="text-[5px] font-bold tracking-wide">INVOICE</div>
            <div className="text-[4px] text-gray-600">
              #{order.orderNumber} | {formatDate(order.createdAt)}
            </div>
          </div>
          <div
            className={`${
              order.paymentStatus === "paid"
                ? " text-green-700"
                : " text-red-700"
            } px-2 py-1 rounded-md text-[4px] font-semibold`}
          >
            {order.paymentStatus.toUpperCase()}
          </div>
        </div>

        {/* From / To */}
        <div className="flex justify-between mb-1 text-[4px]">
          <div className="">
            <div className="font-semibold text-black">From:</div>
            <div className="text-gray-700">Rizo</div>
            <div className="text-gray-500">Thrissur</div>
          </div>
          <div className=" text-right">
            <div className="font-semibold text-black">Bill To:</div>
            <div className="text-gray-700">
              {order.shippingAddress.fullName}
            </div>
            <div className="text-gray-500">
              {order.shippingAddress.addressLine1}
            </div>
            <div className="text-gray-500">
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </div>
            <div className="text-gray-500">
              Ph: {order.shippingAddress.phoneNumber}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 text-[4px] w-full flex justify-center text-gray-700 px-2  rounded-sm mb-1 h-3">
          <span className="font-semibold">Payment Method:</span>{" "}
          {order.paymentMethod.toUpperCase()}
        </div>

        <table className="w-full border-collapse text-[4px] mb-1">
          <thead>
            <tr className="bg-gray-100 text-gray-700 h-3  items-center w-full">
              <th className="p-1 text-left font-semibold">Item</th>
              <th className="p-1 text-center font-semibold">Price</th>
              <th className="p-1 text-center font-semibold">Qty</th>
              <th className="p-1 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-1.5 align-top">
                  <div className="font-medium">{item.productName}</div>
                  <div className="text-gray-500 text-[5px]">
                    {item.color}/{item.size} | {item.sku}
                  </div>
                </td>
                <td className="p-1.5 text-center">
                  {formatCurrency(item.price)}
                </td>
                <td className="p-1.5 text-center">{item.quantity}</td>
                <td className="p-1.5 text-right font-medium">
                  {formatCurrency(item.itemTotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-2">
          <div className="w-1/2 text-[4px] text-gray-800">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(order.totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{formatCurrency(order.totals.shippingFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>{formatCurrency(order.totals.tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span className="text-red-500">
                -{formatCurrency(order.totals.discount)}
              </span>
            </div>
            <div className="flex justify-between mt-1 border-t border-gray-300 font-semibold text-black">
              <span>Total:</span>
              <span>{formatCurrency(order.totals.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[4px] text-gray-500 border-t border-gray-300 ">
          Thank you for your order • support@rizo.com
        </div>
      </div>

      <button
        onClick={downloadPDF}
        className="bg-black hover:bg-black/90 text-white md:px-10 px-4 text-xs py-2 rounded-md mt-4"
      >
        Get Invoice
      </button>
    </div>
  );
};

export default HTMLToPDF;
