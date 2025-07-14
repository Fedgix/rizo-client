import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { getCategories } from "../../services/user/user";
import { useNavigate } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const LandingCategory = () => {
  const [sliderRef, setSliderRef] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategory(data.data.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    focusOnSelect: true,
    initialSlide: 0,
    beforeChange: (current, next) => setCurrentSlide(next),
    slidesToShow: 3,
    centerMode: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "15%",
          swipeToSlide: true,
          speed: 300,
          easing: "ease-out"
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "15%",
          swipeToSlide: true,
          speed: 300
        }
      }
    ]
  };

  if (isLoading) {
    return (
      <div className="flex relative flex-col md:flex-row justify-between w-full py-10 md:py-32 bg-white animate-pulse">
        {/* Left side skeleton */}
        <div className="md:w-1/2 mb-10 md:mb-0 md:pl-20 pl-6">
          <Skeleton variant="text" width={300} height={60} animation="wave" />
          <Skeleton
            variant="text"
            width={250}
            height={30}
            animation="wave"
            sx={{ mt: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width={150}
            height={40}
            animation="wave"
            sx={{ mt: 3, borderRadius: "4px" }}
          />

          <Box sx={{ mt: 4 }}>
            <Skeleton variant="text" width={200} height={30} animation="wave" />
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              {[...Array(4)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={50}
                    height={50}
                    animation="wave"
                    sx={{ borderRadius: "4px" }}
                  />
                  <Skeleton
                    variant="text"
                    width={40}
                    animation="wave"
                    sx={{ mt: 1 }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </div>

        {/* Right side slider skeleton */}
        <div className="md:w-1/2 relative md:h-[300px] h-[200px]">
          <Box sx={{ display: "flex", gap: 2 }}>
            {[...Array(3)].map((_, i) => (
              <Box key={i} sx={{ px: 1, flex: 1 }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={i === 1 ? 300 : 250}
                  animation="wave"
                  sx={{ borderRadius: "4px" }}
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  animation="wave"
                  sx={{ mt: 1, mx: "auto" }}
                />
              </Box>
            ))}
          </Box>
        </div>

        {/* Navigation buttons skeleton */}
        <div className="absolute bottom-5 left-[49%] transform -translate-x-1/2 z-10 flex items-center gap-2">
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

  const getCountdown = () => {
    const future = new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000 + 6 * 3600000 + 5 * 60000 + 30000
    );
    const now = new Date();
    const diff = Math.max(future.getTime() - now.getTime(), 0);
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return [d, h, m, s].map((unit) => unit.toString().padStart(2, "0"));
  };

  const [days, hours, mins, secs] = getCountdown();

  return (
    <div className="flex relative flex-col md:flex-row justify-between w-full py-10 md:py-32 bg-white">
      <div className="md:w-1/2 mb-10 md:mb-0 md:pl-20 pl-6">
        <h2 className="text-3xl md:text-5xl text-gray-600 font-semibold mb-4 poppins-medium">
          Essentials by Category
        </h2>
        <p className="mb-6 poppins-thin text-gray-400 text-sm w-2/3">
          Explore our must-have styles—hoodies, sweatshirts, and classic
          tees—sorted by category for your perfect fit.
        </p>
        <button className="bg-black poppins-thin text-xs text-gray-300 py-2.5 px-7 rounded-md mb-6 shadow-md transition hover:bg-gray-800">
          Explore More
        </button>
        <div>
          <p className="poppins-thin text-gray-600 text-base font-semibold mb-2">
            Hurry, Before It's Too Late!
          </p>
          <div className="flex gap-4">
            {[
              { label: "Days", value: days },
              { label: "Hr", value: hours },
              { label: "Mins", value: mins },
              { label: "Sec", value: secs },
            ].map((t, i) => (
              <div key={i} className="flex-col items-center justify-center">
                <div className="bg-white border border-gray-300 px-2 py-2 rounded shadow-lg text-center">
                  <div className="text-lg font-bold digital-numbers">
                    {t.value}
                  </div>
                </div>
                <div className="text-sm flex justify-center">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:w-1/2  relative md:h-[300px] h-[250px]">
        <Slider ref={setSliderRef} {...settings}>
          {category.map((cat, index) => (
            <div key={cat._id} className="px-2">
              <div
                onClick={() => navigate(`/shop?category=${cat.name}`)}
                className={`overflow-hidden transition-all duration-700 ease-out flex-col cursor-pointer justify-center items-center ${
                  index === currentSlide
                    ? "md:h-96 h-64 scale-105 z-10"
                    : "md:h-72 h-40 scale-95 opacity-50"
                } bg-gray-100 relative rounded-lg shadow-md hover:shadow-lg`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-black px-4 py-2 shadow text-center text-xs md:text-sm font-medium">
                  {cat.name}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .slick-slide {
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              opacity 0.3s ease;
          }
          .slick-center {
            transform: scale(1.1);
            opacity: 1;
            z-index: 1;
          }
          .slick-slide:not(.slick-center) {
            opacity: 0.7;
          }
        }
      `}</style>

      <div className="absolute md:bottom-5 bottom-3 left-[49%] transform -translate-x-1/2 z-10 flex items-center gap-2">
        <button
          onClick={() => sliderRef?.slickPrev()}
          className="w-8 h-8 bg-white border rounded-full shadow-xl flex items-center justify-center hover:bg-gray-100 transition-all active:scale-95"
        >
          <MdChevronLeft className="text-lg" />
        </button>
        <button
          onClick={() => sliderRef?.slickNext()}
          className="w-8 h-8 bg-white border rounded-full flex items-center justify-center shadow-xl hover:bg-gray-100 transition-all active:scale-95"
        >
          <MdChevronRight className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default LandingCategory;