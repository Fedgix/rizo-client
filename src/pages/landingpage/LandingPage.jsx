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

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
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
      {isLoading ? (
        // Skeleton layout when loading
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <Box sx={{ width: "100%", height: 80, bgcolor: "#f6f6f6" }} />

          {/* Slider Skeleton */}
          <Box sx={{ width: "100%", height: 400, bgcolor: "#e0e0e0" }} />

          {/* Spacer */}
          <Box sx={{ width: "100%", height: 20, bgcolor: "#f6f6f6", my: 2 }} />

          {/* Landing Category Skeleton */}
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

          {/* Vether Banner Skeleton */}
          <Box sx={{ width: "100%", height: 200, bgcolor: "#e0e0e0", my: 4 }} />

          {/* New Arrivals Skeleton */}
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

          {/* Best Seller Skeleton */}
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

          {/* Social Media Skeleton */}
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

          {/* Footer Skeleton */}
          <Box sx={{ width: "100%", height: 200, bgcolor: "#f6f6f6", mt: 4 }} />
        </div>
      ) : (
        // Actual content when loaded
        <>
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
        </>
      )}
    </div>
  );
};

export default LandingPage;