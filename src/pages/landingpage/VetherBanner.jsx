import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const banners = [
  {
    title: "HZO HOODIES",
    subtitle: "Fresh for Summer",
    description: [
      "Fresh styles for the sun-soaked days ahead.",
      "Discover lightweight fabrics and vibrant designs.",
      "Stay comfortable and stylish all summer long.",
    ],
    buttonText: "Explore More",
    image: "banner/image (17).png",
  },
  {
    title: "WINTER COLLECTION",
    subtitle: "Cozy for Cold Days",
    description: [
      "Warm styles for the chilly winter days.",
      "Discover cozy fabrics and comfortable designs.",
      "Stay warm and fashionable all winter long.",
    ],
    buttonText: "Shop Now",
    image: "banner/image (17).png",
  },
  // Add more banners as needed
];

const VetherBanner = () => {
  const [sliderRef, setSliderRef] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="relative w-full py-10">
      <Slider ref={setSliderRef} {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="px-4">
            <div className="flex flex-col bg-[#dadada] md:flex-row items-center  rounded-lg overflow-hidden shadow-lg">
              <div className="md:w-1/2 h-64 md:h-96">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-fit"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 ">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {banner.title}
                </h2>
                <h3 className="text-xl md:text-2xl text-gray-600 mb-4">
                  {banner.subtitle}
                </h3>
                <div className="mb-6">
                  {banner.description.map((line, i) => (
                    <p key={i} className="text-gray-700 mb-2">
                      {line}
                    </p>
                  ))}
                </div>
                <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition">
                  {banner.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => sliderRef?.slickPrev()}
          className="bg-white border border-gray-300 rounded-full p-2 w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100"
        >
          &lt;
        </button>
        <button
          onClick={() => sliderRef?.slickNext()}
          className="bg-white border border-gray-300 shadow-lg rounded-full p-2 w-8 h-8 flex items-center justify-center  hover:bg-gray-100"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default VetherBanner;
