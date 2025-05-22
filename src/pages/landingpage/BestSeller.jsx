import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export const BestSeller = () => {
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
      image: "new arrivels/Screenshot 2025-05-01 at 5.50.02 PM 5.png",
      alt: "new arrivels",
    },
    {
      id: 2,
      image: "new arrivels/Screenshot 2025-05-01 at 5.50.02 PM 8.png",
      alt: "new arrivels",
    },
    {
      id: 3,
      image: "new arrivels/Screenshot 2025-05-01 at 5.50.02 PM 6.png",
      alt: "White t-shirt with abstract design",
    },
  ];

  return (
    <div className="flex-col justify-center w-full mt-10 bg-white px-4 py-7 md:py-12">
      {isLoading ? (
        // Skeleton layout when loading
        <div className="animate-pulse">
          {/* Title Skeleton */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Skeleton variant="text" width={200} height={40} animation="wave" />
          </Box>
          
          {/* Description Skeleton */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
            <Skeleton variant="text" width="60%" height={20} animation="wave" />
          </Box>
          
          {/* Products Grid Skeleton */}
          <div className="flex justify-center md:gap-8 my-12">
            {[...Array(3)].map((_, index) => (
              <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height={200}
                  animation="wave"
                  sx={{ mb: 2 }}
                />
              </Box>
            ))}
          </div>
          
          {/* Button Skeleton */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Skeleton variant="rectangular" width={120} height={40} animation="wave" />
          </Box>
        </div>
      ) : (
        // Actual content when loaded
        <>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-medium mb-2 poppins-medium text-[#484848]">
              Best Sellers
            </h2>
            <div className="flex w-full justify-center items-center">
              <p className="text-sm text-gray-400 mb-6 md:px-0 px-2 md:w-1/3 ">
                Shop our fan-favorite things that define the season. These have
                proven to hold the, just saying!
              </p>
            </div>
          </div>

          <div className="flex justify-center md:gap-8 my-12">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col items-center">
                <div className="mb-3 ">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="object-contain "
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button className="bg-black text-white hover:bg-black/90 rounded-lg px-7 py-2.5 text-xs font-medium">
              VIEW MORE
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BestSeller;