import React, { useState, useEffect } from "react";
import Header from "../../helpers/components/Header";
import Footer from "../../helpers/components/Footer";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full w-full">
      <Header isLoading={isLoading} />
      {isLoading ? (
        <div className="md:p-20 p-10 animate-pulse">
          <Box sx={{ md: { px: 32 }, py: 4 }}>
            <Skeleton
              variant="text"
              width={200}
              height={50}
              animation="wave"
              sx={{ mx: "auto" }}
            />
          </Box>

          <div className="flex flex-col gap-6 items-center md:px-32 py-10">
            {[...Array(4)].map((_, index) => (
              <Skeleton
                key={index}
                variant="text"
                width="100%"
                height={20}
                animation="wave"
              />
            ))}
            <Box sx={{ width: "80%", mt: 2 }}>
              <Skeleton
                variant="text"
                width="60%"
                height={20}
                animation="wave"
              />
            </Box>

            <Box sx={{ height: 30 }} />

            {[...Array(3)].map((_, index) => (
              <Skeleton
                key={index + 4}
                variant="text"
                width="100%"
                height={20}
                animation="wave"
              />
            ))}
            <Box sx={{ width: "70%" }}>
              <Skeleton
                variant="text"
                width="100%"
                height={20}
                animation="wave"
              />
            </Box>
          </div>
        </div>
      ) : (
        <>
          <div className="md:p-20 p-10 relative">
            <div className="absolute inset-0 flex items-center justify-center z-0 opacity-10 pointer-events-none">
              <img
                src="logo/ChatGPT_Image_May_7__2025__03_32_37_PM-removebg-preview 1.png"
                alt="RIZO Logo"
                className=" object-contain"
              />
            </div>

            {/* Content with higher z-index */}
            <div className="relative z-10">
              <h1 className="md:text-3xl text-2xl about md:px-32 font-bold">
                ABOUT RIZO
              </h1>
              <div className="justify-center spcac-y-4 flex flex-col gap-3 items-center md:px-32 py-10 md:text-sm text-xs poppins-thin">
                <p className="about">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p className="about">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
          <Footer isLoading={isLoading} />
        </>
      )}
    </div>
  );
};

export default About;
