import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { subscribe } from "../../services/user/user";
const instagramImages = [
  {
    id: 1,
    image: "social media/image (18).png",
    alt: "Person in beige coat",
    isSmall: true,
  },
  {
    id: 2,
    image: "social media/image (19).png",
    alt: "Blue t-shirt",
    isSmall: false,
  },
  {
    id: 3,
    image: "social media/image (20).png",
    alt: "Black t-shirt with text",
    isSmall: true,
  },
  {
    id: 4,
    image: "social media/image.png",
    alt: "Person in black clothing",
    isSmall: false,
  },
  {
    id: 5,
    image: "social media/image (22).png",
    alt: "White hoodie",
    isSmall: true,
  },
  {
    id: 6,
    image: "social media/image (23).png",
    alt: "Person in light colored clothing",
    isSmall: false,
  },
  {
    id: 7,
    image: "social media/image (24).png",
    alt: "Person in light colored clothing",
    isSmall: true,
  },
];
const SocialMedia = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const validateAndSubmit = async () => {
    try {
      if (!email.trim()) {
        setShowToast(true);
        setToastMessage("Please Enter Email");
        setToastType("Fail");
        return;
      }
      const respone = await subscribe(email);
      if (respone.sutatus === "success") {
        setShowToast(true);
        setToastMessage(data.message);
        setToastType("success");
      }
    } catch (error) {
      console.log(error);
      setShowToast(true);
      setToastMessage("Please Try again");
      setToastType("Fail");
    }
  };

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <div className="w-full bg-white py-12">
      {showToast && (
        <div className="fixed  top-20 right-2 z-50 overflow-hidden">
          <div
            className={`flex items-center w-full max-w-xs md:px-4 px-2 md:py-2 py-1 rounded-lg shadow ${
              toastType === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
            style={{
              transform: "translateX(0)",
              animation: "0.1s ease-out 0s 1 normal forwards running slideIn",
            }}
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-4 h-4">
              {toastType === "success" ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </div>
            <div className="md:text-sm text-xs font-normal">{toastMessage}</div>
          </div>
          <style>{`
      @keyframes slideIn {
        from {
          transform: translateX(100%);
        }
        to {
          transform: translateX(0);
        }
      }
    `}</style>
        </div>
      )}
      {isLoading ? (
        // Skeleton layout when loading
        <div className="animate-pulse">
          {/* Title Section Skeleton */}
          <div className="text-center mb-20">
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Skeleton
                variant="text"
                width={300}
                height={40}
                animation="wave"
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Skeleton
                variant="text"
                width={400}
                height={20}
                animation="wave"
              />
            </Box>
          </div>

          {/* Instagram Grid Skeleton */}
          <div className="w-full overflow-hidden mb-16">
            <div className="flex w-full justify-center items-center">
              {[...Array(7)].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "17.2%",
                    height: index % 2 === 0 ? 200 : 250,
                    bgcolor: "#f6f6f6",
                    mx: 0.5,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Newsletter Section Skeleton */}
          <div className="flex justify-center items-center gap-8 mt-16">
            {/* Left Image Skeleton */}
            <Box
              sx={{
                width: "20%",
                height: 500,
                bgcolor: "#f6f6f6",
                display: { xs: "none", md: "block" },
              }}
            />

            {/* Center Content Skeleton */}
            <div className="text-center max-w-md">
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Skeleton
                  variant="text"
                  width={300}
                  height={40}
                  animation="wave"
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
                <Skeleton
                  variant="text"
                  width={400}
                  height={60}
                  animation="wave"
                />
              </Box>
              <div className="flex flex-col items-center mt-5 px-4">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={50}
                  animation="wave"
                  sx={{ mb: 4 }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={40}
                  animation="wave"
                />
              </div>
            </div>

            {/* Right Image Skeleton */}
            <Box
              sx={{
                width: "20%",
                height: 500,
                bgcolor: "#f6f6f6",
                display: { xs: "none", md: "block" },
              }}
            />
          </div>
        </div>
      ) : (
        // Actual content when loaded
        <>
          <div className="text-center mb-20">
            <h2 className="md:text-3xl text-2xl font-medium mb-2 poppins-medium text-[#484848]">
              Follow Us On Instagram
            </h2>
            <div className="flex w-full justify-center items-center">
              <p className="md:text-sm text-xs text-gray-400 mb-6 md:px-0 px-2 md:w-1/3 ">
                Connect with us on Instagram to stay updated on the latest
                trends and exclusive offers from our store.
              </p>
            </div>
          </div>
          <div className="w-full overflow-hidden mb-16">
            <div className="flex w-full justify-center items-center">
              {instagramImages.map((img) => (
                <div
                  key={img.id}
                  className={`flex  w-[17.2%]  } ${
                    img.isSmall
                      ? "h-[120px] md:h-[200px]"
                      : "h-[150px] md:h-[250px] "
                  } overflow-hidden`}
                >
                  <img
                    src={img.image}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-8 mt-16">
            <div className="hidden md:block">
              <img
                src="social media/image 2.png"
                alt="Model in yellow coat"
                className="object-cover h-[500px]"
              />
            </div>

            <div className="text-center max-w-md">
              <h2 className="md:text-3xl text-2xl font-medium mb-2 poppins-medium text-[#484848]">
                Subscribe To Our Newsletter
              </h2>
              <div className="flex w-full justify-center items-center">
                <p className="text-xs text-gray-400 mb-6 md:px-0 px-2 ">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Scelerisque duis ultrices sollicitudin aliquam sem.
                  Scelerisque duis ultrices sollicitudin
                </p>
              </div>
              <div className="flex flex-col items-center mt-5 md:px-0 px-4">
                <input
                  type="email"
                  placeholder="rizo@gmail.com"
                  className="w-full px-4 py-3 mb-4 bg-white shadow-lg border-none rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  value={email} // ✅ bind state
                  onChange={(e) => setEmail(e.target.value)} // ✅ update state
                  required
                />
                <button
                  className="bg-black text-white shadow-lg hover:bg-black/90 rounded px-7 py-2.5 text-xs font-medium w-full md:w-auto"
                  onClick={validateAndSubmit}
                  type="submit"
                >
                  SUBSCRIBE NOW
                </button>
              </div>
            </div>

            <div className="hidden md:block">
              <img
                src="social media/image 3.png"
                alt="Model in gray coat"
                className="object-cover h-[500px]"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialMedia;
