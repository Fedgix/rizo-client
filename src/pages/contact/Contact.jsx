import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import Header from "../../helpers/components/Header";
import Footer from "../../helpers/components/Footer";

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      comment: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .required("Phone number is required"), // Now required

      comment: Yup.string().required("Comment is required"),
    }),
    validateOnBlur: false, // Disable validation on blur
    validateOnChange: false,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="w-full h-full ">
      {/* <div className="h-10 bg-red-400"></div> */}
      <Header />
      <div className="flex justify-center p-20 ">
        <div className="w-2/3 p-6  rounded-lg">
          <h2 className="text-4xl poppins-medium font-semibold mb-6">
            Contact
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4 ">
            <div className="flex gap-2">
              <TextField
                color="xxw"
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
                    formik.setErrors({ ...formik.errors, name: undefined });
                  }
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                className="text-green-300"
                sx={{
                  "& .MuiInputBase-input": {
                    color: "black",
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                    fontSize: "0.70rem",
                  },
                  "& .Mui-focused": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    height: "40px",
                  },
                }}
              />

              <TextField
                color="xxw"
                fullWidth
                size="small"
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                type="email"
                value={formik.values.email}
                onChange={(e) => {
                  formik.handleChange(e);
                  if (formik.errors.email) {
                    formik.setErrors({ ...formik.errors, email: undefined });
                  }
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "black",
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                    fontSize: "0.70rem",
                  },
                  "& .Mui-focused": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },

                    height: "40px",
                  },
                }}
              />
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
                  formik.setErrors({ ...formik.errors, phone: undefined });
                }
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              sx={{
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                  fontSize: "0.60rem",
                },
                "& .Mui-focused": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },

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
              label="Comment  "
              variant="outlined"
              multiline
              rows={4}
              value={formik.values.comment}
              onChange={(e) => {
                formik.handleChange(e);
                if (formik.errors.comment) {
                  formik.setErrors({ ...formik.errors, comment: undefined });
                }
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.comment && Boolean(formik.errors.comment)}
              sx={{
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .MuiInputLabel-root": {
                  color:
                    formik.errors.comment && formik.touched.comment
                      ? "red"
                      : "black",
                  fontSize: "0.60rem",
                },
                "& .Mui-focused": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  height:"80px"
                },
              }}
            />

            <button className="bg-black px-8 py-2 text-white text-xs flex justify-center text-center  items-center rounded-md">
              SEND
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
