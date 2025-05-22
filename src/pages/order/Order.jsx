import Footer from "../../helpers/components/Footer";
import Header from "../../helpers/components/Header";

const Order = () => {
  // This would typically come from an API or state management
  const orderItems = [
    {
      id: "1",
      name: "White Adrenaline Tee",
      price: 984.0,
      size: "S",
      image: "product/Screenshot 2025-05-01 at 10.52.27 PM 1 (1).png",
      status: "Dispatched",
    },
  ];

  const handleTrackOrder = (orderId) => {
    // Implement order tracking functionality
    console.log(`Tracking order: ${orderId}`);
    // This would typically open a modal or navigate to a tracking page
  };

  return (
    <div className=" w-full  flex flex-col justify-between">
      <Header />
      <div className=" py-20 h-screen">

        <div className="border-b-[2px] border-gray-100 rounded-md overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-2 px-20  border-b">
            <div className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase">
              Product
            </div>
            <div className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase">
              Status
            </div>
          </div>

          {/* Order Items */}
          {orderItems.map((item) => (
            <div
              key={item.id}
              className="grid px-20 grid-cols-2 border-b-[2px] border-gray-100 last:border-b-0"
            >
              <div className="py-7 flex items-center gap-4">
                <div className="w-16 h-16 border  relative bg-gray-100 rounded-md">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-xs">{item.name}</h3>
                  <p className="text-gray-600 text-xs mt-1">
                    ₹ {item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-xs mt-1">Size: {item.size}</p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className=" font-medium text-xs">{item.status}</span>
                <button
                  onClick={() => handleTrackOrder(item.id)}
                  className="bg-black hover:bg-black/90 text-white  px-10 text-[10px] py-3 shadow-xl rounded-md"
                >
                  Track Your Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {orderItems.length === 0 && (
          <div className="text-center py-12 border rounded-md">
            <h2 className="text-xl font-medium mb-2">No orders found</h2>
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Order;
