import React, { useState } from "react";
import {
  FiMenu,
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { AiOutlineGoogle } from "react-icons/ai";
import { login } from "../../services/auth/auth";

const Header = ({ isLoading = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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

  const userMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const handleSignup = async () => {
    try {
  

      const { data } = await login(  window.location.pathname);
      window.location.href = data.authUrl;
      setIsLoggedIn(true);
      setIsUserMenuOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
  };

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 bg-white shadow-sm md:px-20 px-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Box sx={{ flexShrink: 0 }}>
              <Skeleton
                variant="rectangular"
                width={48}
                height={48}
                animation="wave"
              />
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="text"
                  width={60}
                  height={20}
                  animation="wave"
                />
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              {[...Array(3)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="circular"
                  width={24}
                  height={24}
                  animation="wave"
                />
              ))}
              <Skeleton
                variant="circular"
                width={24}
                height={24}
                animation="wave"
                sx={{ display: { xs: "block", md: "none" } }}
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
          <div className="flex-shrink-0">
            <img
              src="logo/ChatGPT_Image_May_7__2025__03_32_37_PM-removebg-preview 1.png"
              alt="Logo"
              className="h-12"
              onClick={() => navigate("/")}
            />
          </div>

          <div className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-[#484848] hover:text-black transition-colors"
            >
              Home
            </a>
            <a
              href="/shop"
              className="text-[#484848] hover:text-black transition-colors"
            >
              Shop
            </a>
            <a
              href="/new-arrivals"
              className="text-[#484848] hover:text-black transition-colors"
            >
              New Arrivals
            </a>
            <a
              href="/about"
              className="text-[#484848] hover:text-black transition-colors"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-[#484848] hover:text-black transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center md:space-x-4 space-x-2 relative">
            <button className="p-1 text-[#484848] hover:text-black transition-colors">
              <FiSearch size={16} />
            </button>

            {/* Cart Icon - hidden only on /cart route */}
            {!window.location.pathname.includes("/cart") && (
              <button
                className="p-1 text-[#484848] hover:text-black transition-colors"
                onClick={() => navigate("/cart")}
              >
                <FiShoppingBag size={16} />
              </button>
            )}

            {/* User Icon with Dropdown (Desktop) */}
            <div className="relative hidden md:block">
              <button
                className="p-1 text-[#484848] hover:text-black transition-colors"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <FiUser size={16} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    variants={userMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 ${
                      !isLoggedIn
                        ? "h-auto flex justify-center items-center"
                        : "h-20 flex flex-col"
                    }`}
                  >
                    {!isLoggedIn ? (
                      <button
                        onClick={handleSignup}
                        className=" w-full flex  justify-center items-center gap-2 bg-black rounded-md text-white font-sm h-10 text-center px-4 py-2 text-sm"
                      >
                        <AiOutlineGoogle />
                        Signin with Google
                      </button>
                    ) : (
                      <>
                        <div className="px-4 py-2 text-sm text-gray-700">
                          Hello
                        </div>
                        <div className="px-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full rounded-md text-left px-4 py-2 text-sm text-white bg-red-600"
                          >
                            <FiLogOut className="mr-2" size={14} /> Logout
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button - hidden on /cart route */}
            {!window.location.pathname.includes("/cart") && (
              <button
                className="md:hidden p-1 text-[#484848] hover:text-black transition-colors"
                onClick={() => setIsMenuOpen(true)}
              >
                <FiMenu size={20} />
              </button>
            )}
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
              className="fixed top-0 right-0 bottom-0 z-50 w-64 bg-white shadow-lg flex flex-col"
            >
              <div className="flex justify-end p-4 border-b">
                <button
                  className="text-[#484848] text-xs hover:text-black transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col p-6 space-y-6 poppins-thin overflow-y-auto">
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

              {/* Separated Auth Buttons at Bottom */}
              <div className="border-t p-6">
                {!isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleSignup();
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-2 flex justify-center items-center gap-2 bg-black text-white text-xs rounded hover:bg-gray-800 transition-colors"
                  >
                    <AiOutlineGoogle />
                    Signin with Google{" "}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="text-[#484848] text-xs">Hello</div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center py-2 border border-black text-black text-xs rounded hover:bg-gray-100 transition-colors"
                    >
                      <FiLogOut className="mr-2" size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
