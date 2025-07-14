import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { newArrivels } from "../../services/user/user";

export const NewArrivals = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [newArriverls, setNewArrivels] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    newArrivels(8)
      .then((data) => {
        setNewArrivels(data.products);
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



  if (isLoading) {
    return (
      <div className="w-full md:py-16 bg-white border-none animate-pulse">
        {/* Header section skeleton */}
        <div className="text-center mb-8">
          <Skeleton
            variant="text"
            width={200}
            height={50}
            animation="wave"
            sx={{ mx: "auto" }}
          />
          <div className="flex w-full justify-center items-center">
            <Skeleton
              variant="text"
              width="33%"
              height={30}
              animation="wave"
              sx={{ mx: "auto", my: 2 }}
            />
          </div>

          {/* Button group skeleton */}
          <div className="flex justify-center gap-4 mb-12">
            <Skeleton
              variant="rounded"
              width={120}
              height={40}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              width={120}
              height={40}
              animation="wave"
            />
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
                sx={{ borderRadius: "6px", mb: 2 }}
              />
              <Skeleton width="80%" animation="wave" />
              <Skeleton width="60%" animation="wave" />
            </div>
          ))}
        </div>

        {/* See more button skeleton */}
        <div className="flex justify-center mt-12">
          <Skeleton
            variant="rounded"
            width={120}
            height={40}
            animation="wave"
          />
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
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 w-full max-w-6xl mx-auto px-4">
        {newArriverls.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product?id=${product.id}`)}
            className="flex flex-col items-center group relative cursor-pointer"
          >
            <div className="mb-3  overflow-hidden relative w-full">
              <img
                src={getProductImage(product)}
                alt={product.name}
                className="object-cover w-full h-64 md:h-80 transition-transform duration-300 group-hover:scale-105"
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

              {product.availableColors && product.availableColors.length > 1 && (
                <div className="flex flex-wrap  gap-2 mb-2">
                  {product.availableColors.map((colorObj, index) => (
                    <button
                      key={`${product.id}-${colorObj.color}-${index}`}
                      className={`w-5 h-5 rounded-full  border ${
                        selectedColors[product.id] === colorObj.color
                          ? "ring-2 ring-offset-1 ring-gray-400"
                          : ""
                      }`}
                      style={{
                        backgroundColor: colorObj.colorCode,
                      }}
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   handleColorSelect(product.id, colorObj.color);
                      // }}
                      title={colorObj.color}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/shop")}
          className="bg-black text-white shadow-xl hover:bg-black/90 rounded-lg px-7 py-2.5 text-xs font-medium"
        >
          SHOP NOW
        </button>
      </div>
    </div>
  );
};