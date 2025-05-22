import React, { useEffect } from "react";
import Slider from "react-slick";
import Header from "../../helpers/components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LandingCategory from "./LandingCategory";
import VetherBanner from "./VetherBanner";
import { NewArrivals } from "./NewArrivels";
import { BestSeller } from "./BestSeller";
import SocialMedia from "./SocialMedia";
import Footer from "../../helpers/components/Footer";

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center gap-2 mt-4">{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="dot"></div>,
  };

  return (
    <div className="w-full h-full">
      <Header />
      <Slider {...settings}>
        <img
          src="/banner/Rizo Banner 1.png"
          alt="Banner 1"
          className="w-full "
        />
        <img
          src="/banner/Rizo Banner 1.png"
          alt="Banner 2"
          className="w-full"
        />
        <img
          src="/banner/Rizo Banner 1.png"
          alt="Banner 3"
          className="w-full"
        />
      </Slider>

      <style>
        {`
          /* Inactive dot (gray) */
          .dot {
            width: 8px;
            height: 8px;
            background-color: #a0a0a0;
            border-radius: 50%;
          }

          /* Active dot - creates the wrapper effect via padding + border */
          .slick-dots li.slick-active .dot {
            background-color: #000;
            padding: 4px; /* creates space between dot and border */
            border: 1px solid #000;
            border-radius: 50%;
          }
        `}
      </style>

      <LandingCategory />
      <VetherBanner />
      <NewArrivals />
      <BestSeller />
      <SocialMedia />
      <Footer />
    </div>
  );
};

export default LandingPage;
