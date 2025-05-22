import React, { useEffect, useState } from "react";
import Header from "../../helpers/components/Header";
import Footer from "../../helpers/components/Footer";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const AllProducts = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  return (
    <div className="h-full w-full">
      {isLoading ? (
        // Skeleton layout when loading
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <Box sx={{ width: "100%", height: 80, bgcolor: "#f6f6f6" }} />

          {/* Spacer Skeleton */}
          <Box sx={{ width: "100%", height: 20, bgcolor: "#f6f6f6", my: 2 }} />

          {/* Title Skeleton */}
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <Skeleton variant="text" width={300} height={40} animation="wave" />
          </Box>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {[...Array(8)].map((_, index) => (
              <Box key={index} sx={{ p: 2 }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  animation="wave"
                />
                <Skeleton width="80%" animation="wave" sx={{ mt: 2 }} />
                <Skeleton width="60%" animation="wave" />
              </Box>
            ))}
          </div>

          {/* Footer Spacer Skeleton */}
          <Box
            sx={{
              width: "15%",
              height: 56,
              bgcolor: "#f6f6f6",
              mx: "auto",
              my: 4,
            }}
          />

          {/* Footer Skeleton */}
          <Box sx={{ width: "100%", height: 200, bgcolor: "#f6f6f6" }} />
        </div>
      ) : (
        // Actual content when loaded
        <>
          <Header />
          <div className="h-20 w-full bg-[#f6f6f6]"></div>
          <div className="flex flex-col items-center text-center py-10 pb-20">
            <h2 className="text-3xl font-medium mb-2 poppins-medium text-[#484848]">
              All Products in T-Shirts
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <div key={product.id} className="flex flex-col items-center">
                  <div className="mb-3 rounded-md">
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
            <div className="h-14 w-[15%] bg-[#f6f6f6]"></div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default AllProducts;
