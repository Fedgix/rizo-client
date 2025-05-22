import React, { useState } from "react";
import { FiMenu, FiSearch, FiUser, FiShoppingBag, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const Header = ({ isLoading = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Animation variants for the mobile menu
  const menuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "tween", ease: "easeOut", duration: 0.3 },
    },
    exit: {
      x: "100%",
      transition: { type: "tween", ease: "easeIn", duration: 0.2 },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.5,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 bg-white shadow-sm md:px-20 px-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Skeleton */}
            <Box sx={{ flexShrink: 0 }}>
              <Skeleton variant="rectangular" width={48} height={48} animation="wave" />
            </Box>

            {/* Desktop Navigation Skeleton */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} variant="text" width={60} height={20} animation="wave" />
              ))}
            </Box>

            {/* Icons Skeleton */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} variant="circular" width={24} height={24} animation="wave" />
              ))}
              <Skeleton 
                variant="circular" 
                width={24} 
                height={24} 
                animation="wave" 
                sx={{ display: { xs: 'block', md: 'none' } }}
              />
            </Box>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm md:px-20 px-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="logo/ChatGPT_Image_May_7__2025__03_32_37_PM-removebg-preview 1.png"
              alt="Logo"
              className="h-12"
              onClick={()=>navigate("/")}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center poppins-thin space-x-8">
            <a
              href="/"
              className="text-sm text-[#484848] hover:text-black transition-colors"
            >
              Home
            </a>
            <a
              href="/shop"
              className="text-sm text-[#484848] hover:text-black transition-colors"
            >
              Shop
            </a>
            <a
              href="/new-arrivals"
              className="text-sm text-[#484848] hover:text-black transition-colors"
            >
              New Arrivals
            </a>
            <a
              href="/about"
              className="text-sm text-[#484848] hover:text-black transition-colors"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-sm text-[#484848] hover:text-black transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-1 text-[#484848] hover:text-black transition-colors">
              <FiSearch size={16} />
            </button>
            <button className="p-1 text-[#484848] hover:text-black transition-colors">
              <FiUser size={16} />
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="p-1 text-[#484848] hover:text-black transition-colors"
            >
              <FiShoppingBag size={16} />
            </button>

            <button
              className="md:hidden p-1 text-[#484848] hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(true)}
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 bg-black"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              key="menu"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 z-50 w-64 bg-white shadow-lg"
            >
              <div className="flex justify-end p-4 border-b">
                <button
                  className="text-[#484848] text-xs hover:text-black transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiX size={24} />
                </button>
              </div>
              <nav className="flex flex-col p-6 space-y-6 poppins-thin">
                <a
                  href="/"
                  className="text-[#484848] text-xs hover:text-black transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/shop"
                  className="text-[#484848] text-xs hover:text-black transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </a>
                <a
                  href="/new-arrivals"
                  className="text-[#484848] text-xs hover:text-black transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  New Arrivals
                </a>
                <a
                  href="/about"
                  className="text-[#484848] text-xs hover:text-black transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="text-[#484848] text-xs hover:text-black transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;