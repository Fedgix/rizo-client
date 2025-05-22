import * as Yup from "yup";

export const checkoutAddress = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  apartment: Yup.string(),
  state: Yup.object().required("State is required"),
  pincode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Pincode is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Phone number is required"),
});
