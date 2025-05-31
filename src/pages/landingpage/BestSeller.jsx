import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { newArrivels } from "../../services/user/user";
import { useNavigate } from "react-router-dom";

export const BestSeller = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    newArrivels(3)
      .then((data) => {
        setBestSellers(data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      const selectedColor = selectedColors[product.id];
      if (selectedColor) {
        const selectedImage = product.images.find(
          (img) => img.color === selectedColor
        );
        if (selectedImage) return selectedImage.imageUrl;
      }
      return product.images[0].imageUrl;
    }
    return product.defaultImage || product.thumbnailImage;
  };

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
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
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
            <Skeleton
              variant="rectangular"
              width={120}
              height={40}
              animation="wave"
            />
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

          <div className="flex flex-wrap justify-center gap-6 my-12">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product?id=${product.id}`)}
                className="flex flex-col items-center group relative cursor-pointer md:w-[300px] w-full"
              >
                <div className="mb-3 overflow-hidden relative w-full h-[320px]">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.salesCount > 100 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Popular
                    </div>
                  )}
                </div>

                <div className="w-full px-2">
                  <h3 className="text-sm font-medium mb-1 text-left">
                    {product.name}
                  </h3>
                  <p className="text-sm font-bold mb-2 text-left">
                    ₹ {product.basePrice.toFixed(2)}
                  </p>
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
