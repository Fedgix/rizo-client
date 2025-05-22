import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  { label: "T - SHIRT", image: "/categoty/image (14).png" },
  { label: "HODIE", image: "/categoty/image (16).png" },
  { label: "HDIE", image: "/categoty/image (16).png" },
  { label: "HOODE", image: "/categoty/image (16).png" },
  { label: "HOODsxsIE", image: "/categoty/image (16).png" },
  { label: "HOOsDIE", image: "/categoty/image (16).png" },
  { label: "GRAPHIC TEE", image: "/categoty/image (16).png" },
];

const LandingCategory = () => {
  const [sliderRef, setSliderRef] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (sliderRef) {
      sliderRef.slickGoTo(0);
    }
  }, [sliderRef]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    centerMode: false,
    arrows: false,
    beforeChange: (current, next) => setCurrentSlide(next),
    focusOnSelect: true,
    initialSlide: 0,
  };

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
    <div className="flex relative flex-col md:flex-row  justify-between w-full py-10 md:py-32 bg-white">
      <div className="md:w-1/2 mb-10 md:mb-0 md:pl-20 pl-6 ">
        <h2 className="text-3xl md:text-5xl text-gray-600 font-semibold mb-4 poppins-medium">
          Essentials by Category
        </h2>
        <p className="mb-6 poppins-thin text-gray-400 text-sm w-2/3">
          Explore our must-have styles—hoodies, sweatshirts, and classic
          tees—sorted by category for your perfect fit.
        </p>
        <button className="bg-black poppins-thin text-xs text-gray-300 py-2.5 px-7 rounded-md mb-6 shadow-md transition">
          Explore More
        </button>
        <div>
          <p className=" poppins-thin text-gray-600 text-base  font-semibold mb-2">
            Hurry, Before It's Too Late!
          </p>
          <div className="flex gap-4">
            {[
              { label: "Days", value: days },
              { label: "Hr", value: hours },
              { label: "Mins", value: mins },
              { label: "Sec", value: secs },
            ].map((t) => (
              <div className="flex-col items-center justify-center">
                <div
                  key={t.label}
                  className="bg-white border  border-gray-300 px-2 py-2 rounded   shadow-lg text-center"
                >
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

      <div className="md:w-1/2 relative md:h-[300px] h-[200px ] ">
        <Slider ref={setSliderRef} {...settings}>
          {categories.map((cat, index) => (
            <div key={index} className="px-2 ">
              <div
                className={`overflow-hidden transition-all  flex-col justify-center items-center duration-300 ${
                  index === currentSlide ? "md:h-96 h-52" : "md:h-72 h-40"
                } bg-green-800 relative`}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-1/2 md:text-base text-xs  transform -translate-x-1/2 bg-white text-black px-4 py-2 shadow text-center">
                  {cat.label}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style>
        {`
          .slick-dots {
            bottom: -35px;
          }
          .slick-dots li button:before {
            font-size: 10px;
            color: gray;
          }
          .slick-dots li.slick-active button:before {
            color: black;
          }
          .slick-slide {
            transition: transform 0.3s ease;
          }
          .slick-slide.slick-current {
            transform: scale(1.08);
          }
        `}
      </style>
      <div className="absolute bottom-5  left-[49%] transform -translate-x-1/2 z-10 flex items-center gap-2">
        <button
          onClick={() => sliderRef?.slickPrev()}
          className="w-8 h-8 bg-white border rounded-full flex items-center justify-center shadow hover:bg-gray-100"
        >
          <span className="text-lg">&lt;</span>
        </button>
        <button
          onClick={() => sliderRef?.slickNext()}
          className="w-8 h-8 bg-white border rounded-full flex items-center justify-center shadow hover:bg-gray-100"
        >
          <span className="text-lg">&gt;</span>
        </button>
      </div>
    </div>
  );
};

export default LandingCategory;
