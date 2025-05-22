import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export const NewArrivals = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const products = [
    {
      id: 1,
      name: "WHITE ADIDAS/NIKE TEE",
      price: "₹ 549/-",
      image: "new arrivels/Screenshot 2025-05-01 at 5.50.02 PM 5.png",
    },
    {
      id: 2,
      name: "BLACK ADIDAS/NIKE TEE",
      price: "₹ 549/-",
      image: "new arrivels/Screenshot 2025-05-01 at 5.50.02 PM 8.png",
    },
    {
      id: 3,
      name: "BLACK ADIDAS/NIKE TEE",
      price: "₹ 549/-",
      image: "new arrivels/Screenshot 2025-05-01 at 5.50.02 PM 9.png",
    },
    {
      id: 4,
      name: "WHITE ADIDAS/NIKE TEE",
      price: "₹ 549/-",
      image: "new arrivels/Screenshot 2025-05-01 at 5.50.02 PM 6.png",
    },
    {
      id: 5,
      name: "BLACK ADIDAS/NIKE TEE",
      price: "₹ 549/-",
      image: "new arrivels/Screenshot 2025-05-01 at 5.50.02 PM 10.png",
    },
    {
      id: 6,
      name: "WHITE ADIDAS/NIKE TEE",
      price: "₹ 549/-",
      image: "new arrivels/Screenshot 2025-05-01 at 5.50.02 PM 7.png",
    },
    {
      id: 7,
      name: "BLACK ADIDAS/NIKE TEE",
      price: "₹ 549/-",
      image: "new arrivels/Screenshot 2025-05-01 at 5.50.02 PM 8.png",
    },
    {
      id: 8,
      name: "WHITE ADIDAS/NIKE TEE",
      price: "₹ 549/-",
      image: "new arrivels/Screenshot 2025-05-01 at 5.50.02 PM 12.png",
    },
  ];

  if (isLoading) {
    return (
      <div className="w-full md:py-16 bg-white border-none animate-pulse">
        {/* Header section skeleton */}
        <div className="text-center mb-8">
          <Skeleton variant="text" width={200} height={50} animation="wave" sx={{ mx: 'auto' }} />
          <div className="flex w-full justify-center items-center">
            <Skeleton 
              variant="text" 
              width="33%" 
              height={30} 
              animation="wave" 
              sx={{ mx: 'auto', my: 2 }}
            />
          </div>
          
          {/* Button group skeleton */}
          <div className="flex justify-center gap-4 mb-12">
            <Skeleton variant="rounded" width={120} height={40} animation="wave" />
            <Skeleton variant="rounded" width={120} height={40} animation="wave" />
          </div>
        </div>

        {/* Products grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 px-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                animation="wave"
                sx={{ borderRadius: '6px', mb: 2 }}
              />
              <Skeleton width="80%" animation="wave" />
              <Skeleton width="60%" animation="wave" />
            </div>
          ))}
        </div>

        {/* See more button skeleton */}
        <div className="flex justify-center mt-12">
          <Skeleton variant="rounded" width={120} height={40} animation="wave" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:py-16 bg-white border-none">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-medium mb-2 poppins-medium text-[#484848]">
          New Arrivals
        </h2>
        <div className="flex w-full justify-center items-center">
          <p className="md:text-sm text-xs text-gray-400 mb-6 md:w-1/3 md:px-0 px-4">
            Step into the latest drops that define the season. From bold basics
            to fresh fits—just landed.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button className="bg-black text-white hover:bg-black/90 rounded-lg px-7 py-2.5 text-xs font-medium">
            SHOP NOW
          </button>
          <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 border-0 rounded-lg px-7 py-2.5 text-xs font-medium">
            VIEW MORE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col items-center">
            <div
              className="mb-3 rounded-md"
              onClick={() => navigate("/product")}
            >
              <img
                src={product.image}
                alt={product.name}
                className="object-contain w-68 h-68"
              />
            </div>
            <h3 className="text-xs font-medium">{product.name}</h3>
            <p className="text-xs">{product.price}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button 
          onClick={() => navigate("/products")}
          className="bg-black text-white shadow-xl hover:bg-black/90 rounded-lg px-7 py-2.5 text-xs font-medium"
        >
          SEE MORE
        </button>
      </div>
    </div>
  );
};