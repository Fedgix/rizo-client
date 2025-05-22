import Footer from "../../helpers/components/Footer";
import Header from "../../helpers/components/Header";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

const Order = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="w-full flex flex-col justify-between">
      <Header isLoading={isLoading} />
      {isLoading ? (
        <div className="py-20 h-screen animate-pulse">
          {/* Header Skeleton */}
          <div className="border-b-[2px] border-gray-100 w-full rounded-md overflow-hidden">
            <div className="grid grid-cols-2 md:px-20 px-4 border-b">
              <Box sx={{ py: 3, md: { px: 4 }, px: 4 }}>
                <Skeleton variant="text" width={80} height={20} animation="wave" />
              </Box>
              <Box sx={{ py: 3, md: { px: 4 }, px: 10 }}>
                <Skeleton variant="text" width={80} height={20} animation="wave" />
              </Box>
            </div>

            {/* Order Item Skeleton */}
            <div className="grid md:px-20 px-5 grid-cols-2 border-b-[2px] border-gray-100">
              <div className="py-7 flex items-center gap-2">
                <Box sx={{ width: 64, height: 64, bgcolor: '#f6f6f6', borderRadius: 1 }} />
                <div className="w-full">
                  <Skeleton variant="text" width="60%" height={20} animation="wave" />
                  <Skeleton variant="text" width="40%" height={16} animation="wave" sx={{ mt: 1 }} />
                  <Skeleton variant="text" width="30%" height={16} animation="wave" sx={{ mt: 1 }} />
                </div>
              </div>
              <div className="md:p-4 flex md:justify-between justify-end gap-2 items-center">
                <Skeleton variant="text" width={80} height={20} animation="wave" />
                <Skeleton 
                  variant="rectangular" 
                  width={120} 
                  height={36} 
                  animation="wave" 
                  sx={{ borderRadius: 1 }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="py-20 h-screen">
            <div className="border-b-[2px] border-gray-100 w-full rounded-md overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-2 md:px-20 px-4 border-b">
                <div className="py-3 md:px-4 text-xs font-semibold text-gray-400 uppercase">
                  Product
                </div>
                <div className="py-3 md:px-4 px-10 text-xs font-semibold text-gray-400 uppercase">
                  Status
                </div>
              </div>

              {/* Order Items */}
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="grid md:px-20 px-5 grid-cols-2 border-b-[2px] border-gray-100 last:border-b-0"
                >
                  <div className="py-7 flex items-center gap-2">
                    <div className="w-16 md:w-20 md:h-20 h-16 border relative bg-gray-100 rounded-md">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium md:text-xs text-[10px]">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 md:text-xs text-[10px] mt-1">
                        ₹ {item.price.toFixed(2)}
                      </p>
                      <p className="text-gray-600 md:text-xs text-[10px] mt-1">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>
                  <div className="md:p-4 flex md:justify-between justify-end gap-2 items-center">
                    <span className="font-medium md:text-xs text-[8px]">
                      {item.status}
                    </span>
                    <button
                      onClick={() => handleTrackOrder(item.id)}
                      className="bg-black hover:bg-black/90 text-white md:px-10 px-2 md:text-xs text-[7px] py-3 shadow-xl rounded-md"
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
        </>
      )}
    </div>
  );
};

export default Order;