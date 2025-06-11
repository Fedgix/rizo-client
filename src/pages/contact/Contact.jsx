import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { TextField, Box, Skeleton } from "@mui/material";
import Header from "../../helpers/components/Header";
import Footer from "../../helpers/components/Footer";
import { contactForm } from "../../helpers/validations/validation";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      comment: "",
    },
    validationSchema: contactForm,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-between">
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
                    id="phone"
                    name="phone"
                    label="Phone number"
                    variant="outlined"
                    type="tel"
                    value={formik.values.phone}
                    onChange={(e) => {
                      formik.handleChange(e);
                      if (formik.errors.phone) {
                        formik.setErrors({
                          ...formik.errors,
                          phone: undefined,
                        });
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
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
