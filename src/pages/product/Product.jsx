import { useState, useEffect, useContext } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import Header from "../../helpers/components/Header";
import Footer from "../../helpers/components/Footer";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  addToCart,
  getProducts,
  getSingleProduct,
} from "../../services/user/user";
import "react-inner-image-zoom/lib/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { Toast, ToastToggle } from "flowbite-react";
import Cookies from "js-cookie";
import { UserContext } from "../../helpers/custom/UserContext";

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [userData, setUserData] = useState(Cookies.get("rizoUser"));
  const { setRequireLogin } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); // 3 seconds
    }
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [showToast]);
  useEffect(() => {
    if (id) {
      getSingleProduct(id)
        .then((data) => {
          setProduct(data);
          if (data.variants && data.variants.length > 0) {
            const firstColor = data.variants[0].color;
            setSelectedColor(firstColor);

            const firstSize = data.variants.find(
              (v) => v.color === firstColor
            )?.size;
            setSelectedSize(firstSize);

            // Reset quantity when initial variant is set
            setQuantity(1);
          }
          if (data.images && data.images.length > 0) {
            setSelectedImage(data.images[0].imageUrl);
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err));

      getProducts(1, "&limit=4")
        .then((data) => setRelatedProducts(data.products))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);

    const firstAvailableSize = product.variants.find(
      (v) => v.color === color
    )?.size;
    setSelectedSize(firstAvailableSize);

    const colorImage = product.images.find((img) => img.color === color);
    if (colorImage) {
      setSelectedImage(colorImage.imageUrl);
    }
  };

  const increaseQuantity = () => {
    const stock = getStock();
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    // Reset quantity when size changes
    setQuantity(1);
  };
  const getAvailableSizes = () => {
    if (!product || !product.variants) return [];
    return product.variants
      .filter((variant) => variant.color === selectedColor)
      .map((variant) => variant.size);
  };

  const getCurrentVariant = () => {
    if (!product || !product.variants) return null;
    return product.variants.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize
    );
  };

  const getPrice = () => {
    const variant = getCurrentVariant();
    if (variant && variant.discountPrice) {
      return variant.discountPrice;
    }
    return product?.basePrice || 0;
  };

  const getStock = () => {
    const variant = getCurrentVariant();
    return variant?.stock || 0;
  };
  if (isLoading || !product) {
    return (
      <div className="w-full h-full bg-white">
        <Header isLoading={isLoading} />
        <div className="max-w-6xl mx-auto px-4 py-14 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center">
              <Skeleton
                variant="rectangular"
                width={350}
                height={400}
                animation="wave"
                sx={{ bgcolor: "#f6f6f6" }}
              />
              <div className="flex gap-4 justify-center mt-6">
                {[...Array(2)].map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="rectangular"
                    width={80}
                    height={80}
                    animation="wave"
                    sx={{ bgcolor: "#f6f6f6" }}
                  />
                ))}
              </div>
            </div>

            <div className="md:w-2/3 w-full">
              <Skeleton
                variant="text"
                width={200}
                height={40}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width={100}
                height={30}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width={150}
                height={20}
                animation="wave"
                sx={{ mb: 4 }}
              />

              <div className="mb-6">
                <Skeleton
                  variant="text"
                  width={60}
                  height={20}
                  animation="wave"
                />
                <div className="flex gap-2 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="circular"
                      width={24}
                      height={24}
                      animation="wave"
                      sx={{ bgcolor: "#f6f6f6" }}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <Skeleton
                  variant="text"
                  width={60}
                  height={20}
                  animation="wave"
                />
                <div className="flex gap-2 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="rectangular"
                      width={48}
                      height={32}
                      animation="wave"
                      sx={{ bgcolor: "#f6f6f6" }}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                {[...Array(2)].map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="text"
                    width="100%"
                    height={16}
                    animation="wave"
                    sx={{ mb: 0.5 }}
                  />
                ))}
              </div>

              <div className="mb-6">
                <Skeleton
                  variant="text"
                  width={120}
                  height={20}
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={40}
                  animation="wave"
                  sx={{ bgcolor: "#f6f6f6", mt: 1 }}
                />
              </div>

              <div className="flex flex-col gap-3 mb-8">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={40}
                  animation="wave"
                  sx={{ bgcolor: "#f6f6f6" }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={40}
                  animation="wave"
                  sx={{ bgcolor: "#f6f6f6" }}
                />
              </div>

              <div>
                {[...Array(6)].map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="text"
                    width="100%"
                    height={16}
                    animation="wave"
                    sx={{ mb: 0.5 }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mb:px-20 px-5 pb-20 mt-10">
            <Skeleton
              variant="text"
              width={200}
              height={40}
              animation="wave"
              sx={{ mb: 4 }}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={160}
                    animation="wave"
                    sx={{ bgcolor: "#f6f6f6", mb: 2 }}
                  />
                  <Skeleton
                    variant="text"
                    width={120}
                    height={20}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width={60}
                    height={16}
                    animation="wave"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const addCart = async () => {
    try {
      if (!userData) {
        setRequireLogin(true);
        return null;
      }

      const variant = getCurrentVariant();
      if (!variant) {
        setToastMessage("Please select a variant");
        setToastType("error");
        setShowToast(true);
        return;
      }

      const payload = {
        quantity,
        variantId: variant._id,
        productId: id,
      };

      const response = await addToCart(payload);

      if (response.message) {
        setToastMessage(response.message);
        setToastType(response.status ? "success" : "error");
        setShowToast(true);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add to cart";
      setToastMessage(errorMessage);
      setToastType("error");
      setShowToast(true);
    }
  };
  return (
    <div className="w-full h-full bg-white">
      <Header isLoading={isLoading} />
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`flex items-center w-full max-w-xs md:px-4 px-2 md:py-2 py-1 rounded-lg shadow ${
              toastType === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
            style={{
              transform: "translateX(0)",
              animation: "0.1s ease-out 0s 1 normal forwards running slideIn",
            }}
            role="alert"
          >
           <div className="inline-flex items-center justify-center flex-shrink-0 w-4 h-4">
              {toastType === "success" ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </div>
            <div className="ml-3 text-sm font-normal">{toastMessage}</div>
          </div>
          <style>{`
      @keyframes slideIn {
        from {
          transform: translateX(100%);
        }
        to {
          transform: translateX(0);
        }
      }
    `}</style>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center">
            <div className="mb-6 flex justify-center">
              <InnerImageZoom
                src={selectedImage || product.defaultImage}
                alt={product.name}
                className="md:w-[400px] md:h-[400px] object-fill"
                zoomType="hover"
                imgClassName="w-full h-full object-fill"
              />
            </div>

            <div className="flex gap-4 justify-center">
              {product.images
                .filter((img) => img.color === selectedColor)
                .map((img, index) => (
                  <div
                    key={index}
                    className={`border p-2 w-20 h-20 cursor-pointer ${
                      selectedImage === img.imageUrl
                        ? "border-gray-100"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedImage(img.imageUrl)}
                  >
                    <img
                      src={img.imageUrl}
                      alt={`${product.name} - ${img.color}`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="md:w-2/3 w-full">
            <h1 className="text-xl font-medium mb-1">{product.name}</h1>
            <p className="text-lg font-medium mb-1">
              ₹ {getPrice().toFixed(2)}
            </p>
            {getCurrentVariant()?.discountPrice && (
              <p className="text-sm text-gray-500 line-through">
                ₹ {product.basePrice.toFixed(2)}
              </p>
            )}
            <p className="text-sm text-gray-500 mb-6">Taxes included</p>

            <div className="mb-6">
              <p className="text-sm mb-2">COLOR</p>
              <div className="flex gap-2">
                {product.images.map((img) => (
                  <button
                    key={img.color}
                    onClick={() => {
                      handleColorSelect(img.color);
                      // Set the first image of the selected color as default
                      const firstImageOfColor = product.images.find(
                        (i) => i.color === img.color
                      );
                      if (firstImageOfColor) {
                        setSelectedImage(firstImageOfColor.imageUrl);
                      }
                    }}
                    className={`w-6 h-6 rounded-full ${
                      selectedColor === img.color
                        ? "ring-2 ring-offset-2 ring-black"
                        : ""
                    } ${
                      img.color.toLowerCase() === "white"
                        ? "border border-gray-300"
                        : ""
                    }`}
                    style={{
                      backgroundColor:
                        img.color.toLowerCase() === "white"
                          ? "#FFFFFF"
                          : img.color.toLowerCase() === "black"
                          ? "#000000"
                          : img.color.toLowerCase() === "gray"
                          ? "#808080"
                          : img.color.toLowerCase() === "brown"
                          ? "#a52a2a"
                          : img.color.toLowerCase(),
                    }}
                    aria-label={`Select ${img.color} color`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm mb-2">SIZE</p>
              <div className="flex gap-2">
                {getAvailableSizes().map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)} // Use the new handler
                    className={`w-12 h-8 font-semibold flex items-center justify-center text-xs ${
                      selectedSize === size
                        ? "border-none bg-black text-white"
                        : "bg-[#f4f4f4]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider text-gray-700">
                BUY THIS AND MAKE IT YOURS IN EASY STEPS.
                <br />
                CHECK YOUR SIZE BEFORE PLACING YOUR ORDER.
              </p>
            </div>

            <div className="mb-6">
              {getStock() == 0 ? (
                <p className="text-xs text-red-400 uppercase mb-2">
                  OUT OF STOCK
                </p>
              ) : (
                <div className="flex">
                  <p className="text-xs uppercase mb-2">
                    QUANTITY IN STOCK: {getStock()}
                  </p>
                  {quantity >= getStock() && (
                    <p className="text-xs text-red-500 ml-2">
                      Max quantity reached
                    </p>
                  )}
                </div>
              )}
              <div className="flex rounded-lg h-10 border-gray-500 border-[1.5px] w-full">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 py-2 border-gray-300 flex items-center justify-center"
                  disabled={quantity <= 1}
                >
                  <BiMinus size={16} />
                </button>
                <div className="flex-1 flex items-center justify-center">
                  {quantity}
                </div>
                <button
                  onClick={increaseQuantity}
                  className="px-4 py-2 border-gray-300 flex items-center justify-center"
                  disabled={quantity >= getStock()}
                >
                  <BiPlus size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <button
                className="bg-white text-black border-[2px] text-xs h-10 border-gray-100 rounded-lg hover:bg-gray-100"
                disabled={!selectedSize || !selectedColor}
                onClick={() => {
                  addCart(product.id);
                }}
              >
                ADD TO CART
              </button>
              <button
                className="bg-black text-xs text-white h-10 rounded-lg hover:bg-black/90"
                disabled={!selectedSize || !selectedColor}
              >
                BUY IT NOW
              </button>
            </div>

            <div className="text-xs leading-5 text-gray-700">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="md:px-20  px-5 pb-20">
        <h2 className="poppins-medium md:text-3xl text-lg mb-10 text-[#484848]">
          Find your next favorite
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 ">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => {
                navigate(`/product?id=${product.id}`);
                window.scrollTo(0, 0);
              }}
            >
              <div className="mb-2 rounded-md overflow-hidden w-full aspect-square">
                <img
                  src={product.thumbnailImage || product.defaultImage}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="md:text-base  text-xs font-medium text-center px-1">
                {product.name}
              </h3>
              <p className="text-xs font-semibold">
                ₹ {product.basePrice.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer isLoading={isLoading} />
    </div>
  );
};

export default Product;
