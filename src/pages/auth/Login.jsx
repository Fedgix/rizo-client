import React, { useState } from "react";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import {
  loginValidation,
  registerValidation,
} from "../../helpers/validations/validation";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped(!isFlipped);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Login submitted:", values);
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Register submitted:", values);
      } catch (error) {
        console.error("Register error:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className={`flip-container ${isFlipped ? "flipped" : ""}`}>
        <div className="flipper">
          {/* Login Form */}
          <div className="front">
            <div className="relative max-w-md p-8 bg-white rounded-lg shadow-md h-full">
              {/* Background Image - moved behind content */}
              <div className="absolute inset-0 overflow-hidden rounded-lg z-0">
                <img
                  src="logo/ChatGPT_Image_May_7__2025__03_32_37_PM-removebg-preview 1.png"
                  alt="Background"
                  className="w-full h-full object-cover opacity-20"
                />
              </div>
              
              {/* Content with higher z-index */}
              <div className="relative z-10  h-full flex flex-col justify-center">
                <h2 className="text-3xl poppins-medium mb-6 text-center">
                  Login
                </h2>
                <form onSubmit={loginFormik.handleSubmit} className="space-y-6">
                  <div className="w-full">
                    <TextField
                      fullWidth
                      size="small"
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      variant="outlined"
                      value={loginFormik.values.email}
                      onChange={(e) => {
                        loginFormik.handleChange(e);
                        if (loginFormik.errors.email) {
                          loginFormik.setErrors({
                            ...loginFormik.errors,
                            email: undefined,
                          });
                        }
                      }}
                      onBlur={loginFormik.handleBlur}
                      error={
                        loginFormik.touched.email &&
                        Boolean(loginFormik.errors.email)
                      }
                      sx={{
                        "& .MuiInputBase-input": { color: "black" },
                        "& .MuiInputLabel-root": {
                          color: "black",
                          fontSize: "0.70rem",
                        },
                        "& .Mui-focused": { color: "black" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "black" },
                          height: "40px",
                        },
                      }}
                    />
                  </div>

                  <div className="w-full">
                    <TextField
                      fullWidth
                      size="small"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={loginFormik.values.password}
                      onChange={(e) => {
                        loginFormik.handleChange(e);
                        if (loginFormik.errors.password) {
                          loginFormik.setErrors({
                            ...loginFormik.errors,
                            password: undefined,
                          });
                        }
                      }}
                      onBlur={loginFormik.handleBlur}
                      error={
                        loginFormik.touched.password &&
                        Boolean(loginFormik.errors.password)
                      }
                      sx={{
                        "& .MuiInputBase-input": { color: "black" },
                        "& .MuiInputLabel-root": {
                          color: "black",
                          fontSize: "0.70rem",
                        },
                        "& .Mui-focused": { color: "black" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "black" },
                          height: "40px",
                        },
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-black px-8 py-2 text-white text-xs flex justify-center text-center items-center rounded-md w-full hover:bg-gray-800 transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? "LOGGING IN..." : "LOGIN"}
                  </button>
                </form>
                <div className="mt-6 flex justify-center items-center w-full">
                  <p className="text-xs mt-6">
                    Don't have an account?{" "}
                    <button
                      onClick={handleFlip}
                      className="text-blue-500 font-semibold focus:outline-none"
                      type="button"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Register Form */}
          <div className="back">
            <div className="relative max-w-md p-8 bg-white   h-full flex flex-col justify-center rounded-lg shadow-md ">
              {/* Background Image - moved behind content */}
              <div className="absolute inset-0 overflow-hidden rounded-lg z-0">
                <img
                  src="logo/ChatGPT_Image_May_7__2025__03_32_37_PM-removebg-preview 1.png"
                  alt="Background"
                  className="w-full h-full object-cover opacity-20"
                />
              </div>
              
              {/* Content with higher z-index */}
              <div className="relative z-10">
                <h2 className="text-3xl poppins-medium mb-6 text-center">
                  Register
                </h2>
                <form onSubmit={registerFormik.handleSubmit} className="space-y-4">
                  <div className="w-full">
                    <TextField
                      fullWidth
                      size="small"
                      id="name"
                      name="name"
                      label="Full Name"
                      variant="outlined"
                      value={registerFormik.values.name}
                      onChange={(e) => {
                        registerFormik.handleChange(e);
                        if (registerFormik.errors.name) {
                          registerFormik.setErrors({
                            ...registerFormik.errors,
                            name: undefined,
                          });
                        }
                      }}
                      onBlur={registerFormik.handleBlur}
                      error={
                        registerFormik.touched.name &&
                        Boolean(registerFormik.errors.name)
                      }
                      sx={{
                        "& .MuiInputBase-input": { color: "black" },
                        "& .MuiInputLabel-root": {
                          color: "black",
                          fontSize: "0.70rem",
                        },
                        "& .Mui-focused": { color: "black" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "black" },
                          height: "40px",
                        },
                      }}
                    />
                  </div>

                  <div className="w-full">
                    <TextField
                      fullWidth
                      size="small"
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      variant="outlined"
                      value={registerFormik.values.email}
                      onChange={(e) => {
                        registerFormik.handleChange(e);
                        if (registerFormik.errors.email) {
                          registerFormik.setErrors({
                            ...registerFormik.errors,
                            email: undefined,
                          });
                        }
                      }}
                      onBlur={registerFormik.handleBlur}
                      error={
                        registerFormik.touched.email &&
                        Boolean(registerFormik.errors.email)
                      }
                      sx={{
                        "& .MuiInputBase-input": { color: "black" },
                        "& .MuiInputLabel-root": {
                          color: "black",
                          fontSize: "0.70rem",
                        },
                        "& .Mui-focused": { color: "black" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "black" },
                          height: "40px",
                        },
                      }}
                    />
                  </div>

                  <div className="w-full">
                    <TextField
                      fullWidth
                      size="small"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={registerFormik.values.password}
                      onChange={(e) => {
                        registerFormik.handleChange(e);
                        if (registerFormik.errors.password) {
                          registerFormik.setErrors({
                            ...registerFormik.errors,
                            password: undefined,
                          });
                        }
                      }}
                      onBlur={registerFormik.handleBlur}
                      error={
                        registerFormik.touched.password &&
                        Boolean(registerFormik.errors.password)
                      }
                      sx={{
                        "& .MuiInputBase-input": { color: "black" },
                        "& .MuiInputLabel-root": {
                          color: "black",
                          fontSize: "0.70rem",
                        },
                        "& .Mui-focused": { color: "black" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "black" },
                          height: "40px",
                        },
                      }}
                    />
                  </div>

                  <div className="w-full">
                    <TextField
                      fullWidth
                      size="small"
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      value={registerFormik.values.confirmPassword}
                      onChange={(e) => {
                        registerFormik.handleChange(e);
                        if (registerFormik.errors.confirmPassword) {
                          registerFormik.setErrors({
                            ...registerFormik.errors,
                            confirmPassword: undefined,
                          });
                        }
                      }}
                      onBlur={registerFormik.handleBlur}
                      error={
                        registerFormik.touched.confirmPassword &&
                        Boolean(registerFormik.errors.confirmPassword)
                      }
                      sx={{
                        "& .MuiInputBase-input": { color: "black" },
                        "& .MuiInputLabel-root": {
                          color: "black",
                          fontSize: "0.70rem",
                        },
                        "& .Mui-focused": { color: "black" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "black" },
                          height: "40px",
                        },
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-black px-8 py-2 text-white text-xs flex justify-center text-center items-center rounded-md w-full hover:bg-gray-800 transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? "REGISTERING..." : "REGISTER"}
                  </button>
                </form>
                <div className="mt-6 flex justify-center items-center w-full">
                  <p className="text-xs mt-6">
                    Already have an account?{" "}
                    <button
                      onClick={handleFlip}
                      className="text-blue-500 font-semibold focus:outline-none"
                      type="button"
                    >
                      Login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for flip animation */}
      <style jsx global>{`
        .flip-container {
          perspective: 1000px;
          width: 100%;
          max-width: 28rem;
          height: 500px; /* Fixed height for consistent flipping */
        }
        .flipper {
          transition: 0.6s;
          transform-style: preserve-3d;
          position: relative;
          width: 100%;
          height: 100%;
        }
        .front,
        .back {
          backface-visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .front {
          z-index: 2;
          transform: rotateY(0deg);
        }
        .back {
          transform: rotateY(180deg);
        }
        .flipped .flipper {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Login;