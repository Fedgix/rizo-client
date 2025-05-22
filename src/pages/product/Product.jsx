import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import Header from "../../helpers/components/Header";
import Footer from "../../helpers/components/Footer";

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("M");

  const images = [
    "product/Screenshot 2025-05-01 at 10.52.27 PM 1 (1).png",
    "product/Screenshot 2025-05-01 at 11.02.22 PM 1.png",
  ];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const colors = [
    { name: "white", hex: "#FFFFFF", border: true },
    { name: "blue", hex: "#3B82F6" },
    { name: "purple", hex: "#8B5CF6" },
    { name: "pink", hex: "#EC4899" },
    { name: "black", hex: "#000000" },
  ];

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
    ];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="w-full h-full bg-white">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
          {/* Image Section */}
          <div className="flex flex-col items-center  ">
            <div className="mb-6 flex justify-center ">
              <img
                src={selectedImage}
                alt="Selected Adrenaline Tee"
                width={350}
                height={400}
                className="object-fit"
              />
            </div>
            <div className="flex gap-4 justify-center">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`border p-2 w-20 h-20 cursor-pointer ${
                    selectedImage === img
                      ? "border-gray-100"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-2/3 w-full">
            <h1 className="text-xl font-medium mb-1">White Adrenaline Tee</h1>
            <p className="text-lg font-medium mb-1">₹ 984.00</p>
            <p className="text-sm text-gray-500 mb-6">Taxes included</p>

            {/* Color Selection */}
            <div className="mb-6">
              <p className="text-sm mb-2">COLOR</p>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-6 h-6 rounded-full ${
                      selectedColor === color.name
                        ? "ring-2 ring-offset-2 ring-black"
                        : ""
                    } ${color.border ? "border border-gray-300" : ""}`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-8 font-semibold flex items-center justify-center text-xs  ${
                      selectedSize === size
                        ? "border-none bg-black text-white"
                        : " bg-[#f4f4f4] "
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider text-gray-700">
                BUY THIS AND MAKE IT YOURS IN EASY STEPS.
                <br />
                CHECK YOUR SIZE BEFORE PLACING YOUR ORDER.
              </p>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-xs uppercase mb-2">QUANTITY IN STOCK</p>
              <div className="flex  rounded-lg h-10 border-gray-500 border-[1.5px] w-full">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 py-2 border-gray-300  flex items-center justify-center"
                >
                  <BiMinus size={16} />
                </button>
                <div className="flex-1 flex items-center justify-center">
                  {quantity}
                </div>
                <button
                  onClick={increaseQuantity}
                  className="px-4 py-2  border-gray-300 flex items-center justify-center"
                >
                  <BiPlus size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <button className="bg-white text-black border-[2px] text-xs h-10 border-gray-100 rounded-lg hover:bg-gray-100 ">
                ADD TO CART
              </button>
              <button className="bg-black text-xs text-white h-10 rounded-lg hover:bg-black/90 ">
                BUY IT NOW
              </button>
            </div>

            <div className="text-xs leading-5 text-gray-700">
              <p>
                EVERY INCH IS A BATTLE OF MIND VERSUS BODY, ADRENALINE, THE
                CHEMICAL OF COURAGE THAT FLOWS THROUGH YOUR VEINS, HEIGHTENING
                YOUR SENSES, SHARPENING YOUR MIND, STRENGTHENING YOUR MUSCLES,
                FLOODING THE BODY WITH POWER TO PUSH BEYOND BOUNDARIES.
                ADRENALINE DOESN'T JUST FUEL PHYSICAL ACTIVITY; IT FUELS
                PASSION, AMBITION, AND EVERY MOMENT OF LIFE LIVED ON THE EDGE.
                THIS TEE IS DESIGNED TO CAPTURE THAT RUSH, THAT SURGE OF ENERGY
                THAT PROPELS YOU BEYOND THE FINISH LINE.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb:px-20 px-5  pb-20">
        <h2 className="poppins-medium md:text-3xl text-lg mb-10 text-[#484848] ">Find your next favorite </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <div className="mb-3   rounded-md">
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
      </div>
      <Footer/>
    </div>
  );
};

export default Product;
