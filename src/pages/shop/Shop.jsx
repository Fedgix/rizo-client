import React from "react";
import Header from "../../helpers/components/Header";
import Footer from "../../helpers/components/Footer";

const Shop = () => {
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
    <div className="h-full w-full ">
      <Header />
      <div className="h-20 w-full bg-[#f6f6f6]"></div>
      <div className="flex flex-col items-center text-center py-10 pb-20">
        <h2 className="text-3xl font-medium mb-2 poppins-medium text-[#484848]">
          Shop
        </h2>
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
        <div className="h-14 w-[15%] bg-[#f6f6f6]"></div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
