import React, { useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import {
  FiMenu,
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { AiOutlineGoogle } from "react-icons/ai";
import { login, logout } from "../../services/auth/auth";
import { UserContext } from "../custom/UserContext";

const Header = ({ isLoading = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState(() => {
    const cookie = Cookies.get("rizoUser");
    return cookie ? JSON.parse(cookie) : null;
  });
  const { requireLogin, setRequireLogin } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const userMenuRef = useRef(null);

  // Check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle automatic opening and shaking
  useEffect(() => {
    if (requireLogin && !userData) {
      if (isMobile) {
        setIsMenuOpen(true);
      } else {
        setIsUserMenuOpen(true);
      }

      const timer = setTimeout(() => {
        setRequireLogin(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [requireLogin, userData, setRequireLogin, isMobile]);

  useEffect(() => {
    const encodedUser = searchParams.get("user");
    if (encodedUser) {
      const user = JSON.parse(atob(encodedUser));
      Cookies.set("rizoUser", JSON.stringify(user));
      setUserData(user);
    }
  }, [searchParams]);

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.2,
        repeat: 1,
        repeatType: "mirror",
      },
    },
    idle: {
      x: 0,
    },
  };

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
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.2,
        repeat: 0.5, // Will shake for 0.5s * 8 = 4s total
        repeatType: "mirror",
      },
    },
  };

  const handleSignup = async () => {
    try {
      const { data } = await login(window.location.pathname);
      window.location.href = data.authUrl;
      setIsLoggedIn(true);
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      Cookies.remove("rizoUser");
      setUserData(null);
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
              className="h-12 cursor-pointer"
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

            {!window.location.pathname.includes("/cart") && (
              <button
                className="p-1 text-[#484848] hover:text-black transition-colors"
                onClick={() => {
                  if (!userData) {
                    setRequireLogin(true);
                  } else {
                    navigate("/cart");
                  }
                }}
              >
                <FiShoppingBag size={16} />
              </button>
            )}

            <div className="relative hidden md:block" ref={userMenuRef}>
              <button
                className="p-1 text-[#484848] hover:text-black transition-colors"
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                  setRequireLogin(false);
                }}
              >
                <FiUser size={16} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    variants={userMenuVariants}
                    initial="hidden"
                    animate={
                      requireLogin && !userData
                        ? ["visible", "shake"]
                        : "visible"
                    }
                    exit="exit"
                    className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 p-3"
                  >
                    {!userData ? (
                      <button
                        onClick={handleSignup}
                        className="w-full flex justify-center items-center gap-2 bg-black rounded-md text-white font-medium h-10 px-4 py-2 text-sm"
                      >
                        <AiOutlineGoogle />
                        Sign in with Google
                      </button>
                    ) : (
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center gap-3">
                          {userData?.avatar && (
                            <img
                              src={userData.avatar}
                              alt="avatar"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <div className="text-[#484848] font-semibold text-sm">
                              Hello {userData.name}
                            </div>
                            <div className="text-[#484848] text-xs">
                              {userData.email}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center justify-center gap-2 w-full rounded-md px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 transition"
                        >
                          <FiLogOut size={14} />
                          Logout
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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

              <div className="border-t p-6">
                {!userData ? (
                  <motion.div
                    variants={shakeVariants}
                    initial="idle"
                    animate={requireLogin ? "shake" : "idle"}
                  >
                    <button
                      onClick={() => {
                        handleSignup();
                        setIsMenuOpen(false);
                      }}
                      className="w-full py-2 flex justify-center items-center gap-2 bg-black text-white text-xs rounded hover:bg-gray-800 transition-colors"
                    >
                      <AiOutlineGoogle />
                      Sign in with Google
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2 items-start justify-start">
                      {userData?.avatar && (
                        <img
                          src={userData.avatar}
                          alt=""
                          className="w-5 h-5 rounded-full"
                        />
                      )}
                      <div className="text-[#484848] font-bold text-xs flex justify-center items-center">
                        Hello {userData.name}
                      </div>
                    </div>
                    <div className="text-[#484848] text-xs font-semibold">
                      {userData.email}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex bg-red-700 items-center justify-center py-2 border text-white text-xs rounded hover:bg-gray-100 transition-colors"
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
