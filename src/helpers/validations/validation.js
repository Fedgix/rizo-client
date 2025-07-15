import * as Yup from "yup";

export const checkoutAddress = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  landmark: Yup.string().required("Landmark is required"),
  state: Yup.object().required("State is required"),
  pincode: Yup.string()
    .matches(/^[0-9]+$/, "Pincode must be numeric")
    .length(6, "Pincode must be 6 digits")
    .required("Pincode is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .length(10, "Phone number must be 10 digits")
    .required("Phone number is required"),
  addressType: Yup.string().required("Address type is required"),
});
export const contactForm = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Phone number is required"),
  comment: Yup.string().required("Comment is required"),
});

export const loginValidation = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters long")
    .required("Password is required"),
});

export const registerValidation = Yup.object({
  name: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});



export const addressInitialValues = {
  fullName: "",
  address: "",
  landmark: "",
  state: null,
  pincode: "",
  phoneNumber: "",
  addressType: "",
  city: "",
  isDefault: false,
}