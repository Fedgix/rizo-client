import React, { useEffect, useRef, useState } from "react";
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
import { getBanner, getCategories } from "../../services/user/user";
import { motion } from "framer-motion";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    getCategories("?location=title")
      .then((data) => {
        setBanners(data.data.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const getSlidePosition = (index) => {
    const diff = index - currentSlide;
    const totalSlides = banners.length;

    // Handle circular positioning
    let position = diff;
    if (Math.abs(diff) > totalSlides / 2) {
      position = diff > 0 ? diff - totalSlides : diff + totalSlides;
    }

    return position;
  };

  const getSlideStyles = (index) => {
    const position = getSlidePosition(index);
    const isCenter = position === 0;
    const isAdjacent = Math.abs(position) === 1;
    const isFar = Math.abs(position) === 2;

    if (isMobile) {
      // Mobile: Show only 3 slides
      if (Math.abs(position) > 1) return { display: "none" };

      return {
        scale: isCenter ? 1.1 : 0.8,
        zIndex: isCenter ? 20 : 10,
        opacity: isCenter ? 1 : 0.6,
        x: position * (isMobile ? 60 : 80) + "%",
        y: isCenter ? 0 : 20,
      };
    }

    // Desktop: Full pyramid effect
    if (Math.abs(position) > 2) return { display: "none" };

    const baseStyles = {
      0: {
        // Center
        scale: 1.2,
        zIndex: 30,
        opacity: 1,
        x: 0,
        y: 0,
      },
      1: {
        // Right adjacent
        scale: 0.9,
        zIndex: 20,
        opacity: 0.8,
        x: "70%",
        y: 30,
      },
      [-1]: {
        // Left adjacent
        scale: 0.9,
        zIndex: 10,
        opacity: 0.8,
        x: "-70%",
        y: 30,
      },
      2: {
        // Far right
        scale: 0.7,
        zIndex: 10,
        opacity: 0.5,
        x: "140%",
        y: 60,
      },
      [-2]: {
        // Far left
        scale: 0.7,
        zIndex: 10,
        opacity: 0.5,
        x: "-140%",
        y: 60,
      },
    };

    return baseStyles[position] || { display: "none" };
  };

  const handleSlideClick = (index) => {
    setCurrentSlide(index);
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
          <div className="w-full bg-black">
  <div className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
    
    {/* Background Circle */}
    <div className="absolute md:w-[600px] w-[400px] md:h-[600px] h-[450px] rounded-full border border-white opacity-30 z-0"></div>

    {banners.map((banner, index) => {
      const styles = getSlideStyles(index);
      if (styles.display === "none") return null;

      return (
        <motion.div
          key={banner.id}
          className="absolute cursor-pointer z-10" 
          animate={{
            scale: styles.scale,
            x: styles.x,
            y: styles.y,
            opacity: styles.opacity,
          }}
          style={{ zIndex: styles.zIndex }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          onClick={() => handleSlideClick(index)}
        >
          <div className="relative">
            <div className="w-[250px] h-[350px] md:w-[300px] md:h-[400px] overflow-hidden shadow-2xl bg-white">
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
</div>


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
