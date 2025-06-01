import React from "react";

const ProductGrid = React.memo(
  ({ products, selectedColors, navigate, handleColorSelect, isLoading }) => {
    const getProductImage = (product) => {
      if (selectedColors[product.id] && product.images) {
        const selectedImage = product.images.find(
          (img) => img.color === selectedColors[product.id]
        );
        if (selectedImage) return selectedImage.imageUrl;
      }
      return product.defaultImage || product.thumbnailImage;
    };
    if (isLoading) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 w-full max-w-6xl">
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
      );
    }
    return (
      <>
        {products.length == 0 ? (
          <div className="flex w-full justify-center text-center">
            <h1 className="text-4xl font-bold text-gray-200">No Products</h1>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 w-full max-w-6xl">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product?id=${product.id}`)}
                className="flex flex-col items-center group relative cursor-pointer"
              >
                <div className="mb-3 rounded-md overflow-hidden relative w-full">
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

                  {product.images && product.images.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {product.images.map((image, index) => (
                        <button
                          key={`${product.id}-${image.color}-${index}`}
                          className={`w-5 h-5 rounded-full border ${
                            selectedColors[product.id] === image.color
                              ? "ring-2 ring-offset-1 ring-gray-400"
                              : ""
                          }`}
                          style={{
                            backgroundColor:
                              image.color.toLowerCase() === "white"
                                ? "#ffffff"
                                : image.color.toLowerCase() === "black"
                                ? "#000000"
                                : image.color.toLowerCase() === "gray"
                                ? "#808080"
                                : image.color.toLowerCase() === "brown"
                                ? "#a52a2a"
                                : image.color.toLowerCase(),
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleColorSelect(product.id, image.color);
                          }}
                          title={image.color}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  }
);

export default ProductGrid;
