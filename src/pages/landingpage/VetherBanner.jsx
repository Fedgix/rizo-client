import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { getBanner } from "../../services/user/user";
import { useNavigate } from "react-router-dom";

const VetherBanner = () => {
  const [sliderRef, setSliderRef] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [banners, setBanner] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getBanner("?location=season")
      .then((data) => {
        setBanner(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const settings = {
    infinite: banners.length > 1,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: banners.length > 1,
    autoplaySpeed: 3000,
    arrows: false,
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    fade: true,
    waitForAnimate: true,
    initialSlide: 0,
    swipe: true,
    touchThreshold: 10,
    edgeFriction: 0.35,
    appendDots: (dots) => (
      <div style={{ position: "absolute", bottom: "10px", width: "100%" }}>
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="dot"></div>,
  };

  if (isLoading) {
    return (
      <div className="relative w-full py-10 animate-pulse">
        <div className="px-4">
          <div className="flex flex-col bg-[#f6f6f6] md:flex-row items-center rounded-lg overflow-hidden shadow-lg">
            <div className="md:w-1/2 h-64 md:h-96">
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            </div>

            <div className="md:w-1/2 p-8 md:p-12">
              <Skeleton
                variant="text"
                width="60%"
                height={40}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width="40%"
                height={30}
                animation="wave"
                sx={{ mt: 1 }}
              />

              <div className="mb-6">
                {[...Array(3)].map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="text"
                    width="100%"
                    height={20}
                    animation="wave"
                    sx={{ mt: 1 }}
                  />
                ))}
              </div>

              <Skeleton
                variant="rectangular"
                width={120}
                height={40}
                animation="wave"
                sx={{ borderRadius: "4px" }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          <Skeleton
            variant="circular"
            width={32}
            height={32}
            animation="wave"
          />
          <Skeleton
            variant="circular"
            width={32}
            height={32}
            animation="wave"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full py-10">
      <Slider ref={setSliderRef} {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="px-4">
            <div className="flex flex-col w-full bg-[#dadada] md:flex-row items-center rounded-lg overflow-hidden shadow-lg">
              <div className="md:w-1/2 slick-slide h-64 md:h-96">
                <img
                  src={banner.imageUrl}
                  alt={banner.subtitle}
                  className="w-full object-fit transition-all duration-500 md:h-[400px] h-[300px]"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-base md:text-4xl font-bold mb-2">
                  {banner.title}
                </h2>
                <h3 className="text-sm md:text-base text-gray-600 mb-4">
                  {banner.subtitle}
                </h3>
                <div className="mb-6">
                  <p className="text-gray-700 mb-2 md:text-sm text-xs">
                    {banner.description}
                  </p>
                </div>
                <button
                  onClick={() => navigate(banner.ctaLink)}
                  className="bg-black text-white py-2 px-6  text-xs rounded-md hover:bg-gray-800 transition"
                >
                  SHOP NOW
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
          className="bg-white border border-gray-300 shadow-lg rounded-full p-2 w-8 h-8 flex items-center justify-center hover:bg-gray-100"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default VetherBanner;
