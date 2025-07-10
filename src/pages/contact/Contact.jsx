import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { TextField, Box, Skeleton } from "@mui/material";
import Header from "../../helpers/components/Header";
import Footer from "../../helpers/components/Footer";
import { contactForm } from "../../helpers/validations/validation";
import { contactFormSubmit } from "../../services/user/user";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      comment: "",
    },
    validationSchema: contactForm,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      contactFormSubmit(values)
        .then((data) => {
          if (data.status === "success") {
            setShowToast(true);
            setToastType("success");
            setToastMessage(data.message);
            resetForm();
          } else {
            setShowToast(true);
            setToastMessage("Please try again");
            setToastType("fail");
          }
        })
        .catch((err) => {
          setShowToast(true);
          setToastMessage("Please try again");
          setToastType("fail");
          console.log(err);
        });
    },
  });

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      {showToast && (
        <div className="fixed top-20 right-2 z-50 overflow-hidden">
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
        <div className="animate-pulse">
          <Box sx={{ width: "100%", height: 80, bgcolor: "#f6f6f6" }} />

          <div className="flex justify-center md:p-20">
            <div className="md:w-2/3 p-6">
              <Skeleton
                variant="text"
                width={200}
                height={50}
                animation="wave"
                sx={{ mb: 4 }}
              />

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:gap-4 gap-3">
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={40}
                    animation="wave"
                  />
                </div>

                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={40}
                  animation="wave"
                />

                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={120}
                  animation="wave"
                />

                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={40}
                  animation="wave"
                />
              </div>
            </div>
          </div>

          <Box sx={{ width: "100%", height: 200, bgcolor: "#f6f6f6" }} />
        </div>
      ) : (
        <>
          <Header />
          <div className="flex justify-center md:p-20">
            <div className="md:w-2/3 p-6 rounded-lg">
              <h2 className="md:text-4xl text-3xl poppins-medium mb-6">
                Contact
              </h2>

              <form
                onSubmit={formik.handleSubmit}
                className="space-y-4 relative"
              >
                <div className="absolute inset-0  flex items-center justify-center z-0 opacity-20 pointer-events-none">
                  <img
                    src="logo/ChatGPT_Image_May_7__2025__03_32_37_PM-removebg-preview 1.png"
                    alt="Background"
                    className=" object-contain"
                  />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex flex-col md:flex-row md:gap-4 gap-3 justify-center items-center">
                    <div className="w-full md:w-1/2">
                      <TextField
                        fullWidth
                        size="small"
                        id="name"
                        name="name"
                        label="Name"
                        variant="outlined"
                        value={formik.values.name}
                        onChange={(e) => {
                          formik.handleChange(e);
                          if (formik.errors.name) {
                            formik.setErrors({
                              ...formik.errors,
                              name: undefined,
                            });
                          }
                        }}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
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

                    <div className="w-full md:w-1/2">
                      <TextField
                        fullWidth
                        size="small"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={formik.values.email}
                        onChange={(e) => {
                          formik.handleChange(e);
                          if (formik.errors.email) {
                            formik.setErrors({
                              ...formik.errors,
                              email: undefined,
                            });
                          }
                        }}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
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
                  </div>

                  <TextField
                    color="xxw"
                    fullWidth
                    size="small"
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone number"
                    variant="outlined"
                    type="tel"
                    value={formik.values.phoneNumber}
                    onChange={(e) => {
                      formik.handleChange(e);
                      if (formik.errors.phoneNumber) {
                        formik.setErrors({
                          ...formik.errors,
                          phoneNumber: undefined,
                        });
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    sx={{
                      "& .MuiInputBase-input": { color: "black" },
                      "& .MuiInputLabel-root": {
                        color: "black",
                        fontSize: "0.60rem",
                      },
                      "& .Mui-focused": { color: "black" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "black" },
                        height: "40px",
                      },
                    }}
                  />

                  <TextField
                    color="xxw"
                    fullWidth
                    size="small"
                    id="comment"
                    name="comment"
                    label="Comment"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={formik.values.comment}
                    onChange={(e) => {
                      formik.handleChange(e);
                      if (formik.errors.comment) {
                        formik.setErrors({
                          ...formik.errors,
                          comment: undefined,
                        });
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.comment && Boolean(formik.errors.comment)
                    }
                    sx={{
                      "& .MuiInputBase-input": { color: "black" },
                      "& .MuiInputLabel-root": {
                        color:
                          formik.errors.comment && formik.touched.comment
                            ? "red"
                            : "black",
                        fontSize: "0.60rem",
                      },
                      "& .Mui-focused": { color: "black" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "black" },
                        height: "80px",
                      },
                    }}
                  />

                  <button className="bg-black px-8 py-2 text-white text-xs flex justify-center text-center items-center rounded-md">
                    SEND
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Footer isLoading={isLoading} />{" "}
        </>
      )}
    </div>
  );
};

export default Contact;
