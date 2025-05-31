import React, { useEffect, useState } from "react";
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
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { getBanner } from "../../services/user/user";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);

  useEffect(() => {
    getBanner("?location=title")
      .then((data) => {
        setBanners(data.data);
        setIsLoading(false);

      })
      .catch((err) => console.log(err));
  }, []);

  const settings = {
    dots: banners.length > 1,
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

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <div className="animate-pulse">
          <Box sx={{ width: "100%", height: 80, bgcolor: "#f6f6f6" }} />
          <Box sx={{ width: "100%", height: 400, bgcolor: "#e0e0e0" }} />
          <Box sx={{ width: "100%", height: 20, bgcolor: "#f6f6f6", my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <Skeleton variant="text" width={300} height={40} animation="wave" />
          </Box>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {[...Array(4)].map((_, index) => (
              <Box key={index} sx={{ p: 2 }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={150}
                  animation="wave"
                />
                <Skeleton width="80%" animation="wave" sx={{ mt: 2 }} />
              </Box>
            ))}
          </div>

          <Box sx={{ width: "100%", height: 200, bgcolor: "#e0e0e0", my: 4 }} />

          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <Skeleton variant="text" width={300} height={40} animation="wave" />
          </Box>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {[...Array(4)].map((_, index) => (
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

          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <Skeleton variant="text" width={300} height={40} animation="wave" />
          </Box>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {[...Array(4)].map((_, index) => (
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

          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <Skeleton variant="text" width={300} height={40} animation="wave" />
          </Box>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {[...Array(4)].map((_, index) => (
              <Box key={index} sx={{ p: 2 }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={150}
                  animation="wave"
                />
              </Box>
            ))}
          </div>

          <Box sx={{ width: "100%", height: 200, bgcolor: "#f6f6f6", mt: 4 }} />
        </div>
      ) : (
        <>
          <Header />
          <div className="relative">
            <Slider {...settings}>
              {banners.map((item, index) => (
                <div key={index} className="w-full">
                  <img
                    src={item.imageUrl}
                    alt={`Banner ${index + 1}`}
                    className="w-full  object-fit transition-all duration-500 object-fit md:h-[500px] h-[300px]"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <style>
            {`
    .dot {
      width: 8px;
      height: 8px;
      background-color: #a0a0a0;
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .slick-dots li.slick-active .dot {
      background-color: #000;
      transform: scale(1.3);
    }

    .slick-dots {
      position: absolute;
      bottom: 20px;
      width: 100%;
      padding: 0;
      margin: 0;
      list-style: none;
      text-align: center;
      z-index: 10;
    }
  `}
          </style>
          <LandingCategory />
          <VetherBanner />
          <NewArrivals />
          <BestSeller />
          <SocialMedia />
          <Footer isLoading={isLoading} />
        </>
      )}
    </div>
  );
};

export default LandingPage;
