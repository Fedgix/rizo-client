import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
 
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

import Select from "react-select";
import { State } from "country-state-city";
import Header from "../../helpers/components/Header";
import Footer from "../../helpers/components/Footer";

import { checkoutAddress } from "../../helpers/validations/validation";
import Skeleton from "@mui/material/Skeleton";
import { HomeIcon } from "flowbite-react";
import { MdApartment } from "react-icons/md";
import {
  addAddress,
  deleteAddress,
  editAddress,
  getAddress,
  makeDefultAddress,
} from "../../services/user/user";
import { RxPencil2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import Payment from "./payment";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddressId, setCurrentAddressId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const refreshAddresses = async () => {
    try {
      const response = await getAddress();
      const sortedAddresses = [...(response.data.addresses || [])].sort(
        (a, b) => b.isDefault - a.isDefault
      );
      setUserAddresses(sortedAddresses);
      return sortedAddresses;
    } catch (err) {
      console.error("Error refreshing addresses:", err);
      throw err;
    }
  };
  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); // 3 seconds
    }
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [showToast]);
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const addresses = await refreshAddresses();
        const defaultAddress = addresses.find((addr) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);
  const indianStates = State.getStatesOfCountry("IN").map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const formik = useFormik({
    initialValues: {
      fullName: "",
      address: "",
      landmark: "",
      state: null,
      pincode: "",
      phoneNumber: "",
      addressType: "",
      city: "",
      isDefault: false,
    },
    validationSchema: checkoutAddress,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          addressLine1: values.address,
          landmark: values.landmark,
          city: values.city,
          state: values.state?.label || values.state,
          pinCode: values.pincode,
          country: "India",
          address_type: values.addressType,
          isDefault: values.isDefault,
        };

        if (isEditing && currentAddressId) {
          await updateAddress(currentAddressId, payload);
        } else {
          const data = await addAddress(payload);
          if (data.status === "Success") {
            setShowToast(true);
            setToastMessage(data.message);
            setToastType("success");
          }
        }
        const updatedAddresses = await refreshAddresses();

        // Find and select the updated/added address
        const addressToSelect = isEditing
          ? updatedAddresses.find((a) => a.id === currentAddressId)
          : updatedAddresses[0]; // New addresses are added first

        if (addressToSelect) {
          setSelectedAddressId(addressToSelect.id);
        }

        resetForm();
        setIsEditing(false);
        setCurrentAddressId(null);
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleAddressSelect = (address) => {
    setSelectedAddressId(address.id);
    setCurrentAddressId(address.id);
  };

  const handleEdit = (address) => {
    setIsEditing(true);
    setCurrentAddressId(address.id);
    formik.setValues({
      fullName: address.fullName,
      address: address.addressLine1,
      landmark: address.landmark,
      state: indianStates.find((s) => s.label === address.state) || null,
      pincode: address.pinCode,
      phoneNumber: address.phoneNumber,
      addressType: address.addressType,
      city: address.city,
      isDefault: address.isDefault,
    });
  };
  const handleNewAddress = () => {
    setIsEditing(false);
    setCurrentAddressId(null);
    formik.resetForm();
  };

  const handleDelete = async (id) => {
    try {
      const data = await deleteAddress(id);
      if (data.status === "success") {
        setShowToast(true);
        setToastMessage(data.message);
        setToastType("success");
      }
      await refreshAddresses();

      if (selectedAddressId === id) {
        setSelectedAddressId(null);
      }
    } catch (error) {
      console.log(error);
      setShowToast(true);
      setToastMessage(error);
      setToastType("Fail");
    }
  };

  const updateAddress = async (id, addressData) => {
    try {
      const data = await editAddress(id, addressData);
      if (data.status === "success") {
        setShowToast(true);
        setToastMessage("Address Updated");
        setToastType("success");
        refreshAddresses();
      }
      return data;
    } catch (error) {
      console.log(error);
      setShowToast(true);
      setToastMessage(error);
      setToastType("Fail");
    }
  };

  const makeDefault = async (id) => {
    try {
      const data = await makeDefultAddress(id);
      if (data.status === "success") {
        setShowToast(true);
        setToastMessage("Default Address Updated");
        setToastType("success");
      }
      const updatedAddresses = await refreshAddresses();

      const defaultAddress = updatedAddresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
      }
    } catch (error) {
      console.log(error);
      setShowToast(true);
      setToastMessage(error);
      setToastType("Fail");
    }
  };
  return (
    <div className="w-full h-full poppins-thin">
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
      <Header isLoading={isLoading} />
      {isLoading ? (
        <div className="flex justify-center p-2 md:p-20 animate-pulse">
          <div className="w-full md:p-6 rounded-lg">
            <div className="md:space-y-4 space-y-9 md:gap-4 md:flex">
              <div className="md:w-1/2 w-full space-y-3 md:px-5 px-2">
                <Skeleton
                  variant="text"
                  width={200}
                  height={40}
                  animation="wave"
                />

                <div className="flex gap-2">
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
                  height={40}
                  animation="wave"
                />

                <div className="flex gap-2">
                  <Skeleton
                    variant="rectangular"
                    width="33%"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="33%"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="33%"
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

                <div className="flex items-center gap-2">
                  <Skeleton
                    variant="rectangular"
                    width={16}
                    height={16}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width={200}
                    height={20}
                    animation="wave"
                  />
                </div>
              </div>

              <div className="md:w-1/2 md:border-l-[2px] md:hidden-border-t-[2px] md:py-0 py-4 border-gray-100">
                <div className="md:px-7 px-2">
                  <div className="md:space-y-8 space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-3">
                        <Skeleton
                          variant="rectangular"
                          width={48}
                          height={48}
                          animation="wave"
                        />
                        <div className="flex flex-col gap-1">
                          <Skeleton
                            variant="text"
                            width={120}
                            height={20}
                            animation="wave"
                          />
                          <Skeleton
                            variant="text"
                            width={40}
                            height={16}
                            animation="wave"
                          />
                        </div>
                      </div>
                      <Skeleton
                        variant="text"
                        width={60}
                        height={20}
                        animation="wave"
                      />
                    </div>

                    <div className="pb-4 w-full">
                      <div className="flex gap-2">
                        <Skeleton
                          variant="rectangular"
                          width="80%"
                          height={36}
                          animation="wave"
                        />
                        <Skeleton
                          variant="rectangular"
                          width="20%"
                          height={36}
                          animation="wave"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pb-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex justify-between">
                          <Skeleton
                            variant="text"
                            width={80}
                            height={20}
                            animation="wave"
                          />
                          <Skeleton
                            variant="text"
                            width={60}
                            height={20}
                            animation="wave"
                          />
                        </div>
                      ))}
                      <div className="flex justify-between pt-3">
                        <Skeleton
                          variant="text"
                          width={60}
                          height={28}
                          animation="wave"
                        />
                        <div className="text-right">
                          <Skeleton
                            variant="text"
                            width={80}
                            height={28}
                            animation="wave"
                          />
                          <Skeleton
                            variant="text"
                            width={120}
                            height={16}
                            animation="wave"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Skeleton
                        variant="text"
                        width={100}
                        height={28}
                        animation="wave"
                      />
                      <Skeleton
                        variant="text"
                        width={200}
                        height={16}
                        animation="wave"
                      />

                      <div className="border rounded-md">
                        <div className="p-4 flex justify-between items-center border border-black rounded-md">
                          <div className="flex items-center gap-2">
                            <Skeleton
                              variant="circular"
                              width={16}
                              height={16}
                              animation="wave"
                            />
                            <Skeleton
                              variant="text"
                              width={180}
                              height={20}
                              animation="wave"
                            />
                          </div>
                          <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                              <Skeleton
                                key={i}
                                variant="rectangular"
                                width={30}
                                height={20}
                                animation="wave"
                              />
                            ))}
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50">
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={128}
                            animation="wave"
                          />
                          <div className="mt-3 space-y-1">
                            {[...Array(3)].map((_, i) => (
                              <Skeleton
                                key={i}
                                variant="text"
                                width="100%"
                                height={12}
                                animation="wave"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={48}
                        animation="wave"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center p-2 md:p-20">
            <div className="w-full md:p-6 rounded-lg   md:flex">
              <div className="flex md:w-1/2 flex-col">
                <form
                  onSubmit={formik.handleSubmit}
                  className="md:space-y-4  space-y-9 md:gap-4"
                >
                  <div className="w-full space-y-3 md:px-5 px-2">
                    <h2 className="md:text-4xl text-2xl poppins-medium font-semibold mb-6">
                      Shipping Information
                    </h2>
                    <div className="flex gap-2">
                      <TextField
                        fullWidth
                        inputProps={{ maxLength: 100 }}
                        size="small"
                        id="fullName"
                        name="fullName"
                        label="Full Name"
                        variant="outlined"
                        value={formik.values.fullName}
                        onChange={(e) => {
                          // Sanitize input - allow letters, spaces, and common name characters
                          const sanitized = e.target.value.replace(/[^a-zA-Z\s\-'.]/g, '');
                          formik.setFieldValue("fullName", sanitized);
                          if (formik.errors.fullName) {
                            formik.setErrors({ ...formik.errors, fullName: undefined });
                          }
                        }}
                        error={
                          formik.touched.fullName &&
                          Boolean(formik.errors.fullName)
                        }
                        sx={{
                          "& .MuiInputBase-input": { color: "black" },
                          "& .MuiInputLabel-root": {
                            color:
                              formik.touched.fullName && formik.errors.fullName
                                ? "red"
                                : "black",
                            fontSize: "0.70rem",
                          },
                          "& .Mui-focused": {
                            color:
                              formik.touched.fullName && formik.errors.fullName
                                ? "red"
                                : "black",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor:
                                formik.touched.fullName &&
                                formik.errors.fullName
                                  ? "red"
                                  : "black",
                            },
                            height: "40px",
                          },
                        }}
                      />
                    </div>
                    <div className="flex gap-2">
                      {/* Phone Number Field */}
                      <TextField
                        fullWidth
                        size="small"
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Phone Number"
                        variant="outlined"
                        value={formik.values.phoneNumber}
                        onChange={(e) =>  {
                          const sanitized = e.target.value.replace(/[^0-9+\-()\s]/g, '');
                          formik.setFieldValue("phoneNumber", sanitized);
                          if (formik.errors.phoneNumber) {
                            formik.setErrors({ ...formik.errors, phoneNumber: undefined });
                          }
                        }}
                        error={
                          formik.touched.phoneNumber &&
                          Boolean(formik.errors.phoneNumber)
                        }
                        sx={{
                          "& .MuiInputBase-input": { color: "black" },
                          "& .MuiInputLabel-root": {
                            color:
                              formik.touched.phoneNumber &&
                              formik.errors.phoneNumber
                                ? "red"
                                : "black",
                            fontSize: "0.70rem",
                          },
                          "& .Mui-focused": {
                            color:
                              formik.touched.phoneNumber &&
                              formik.errors.phoneNumber
                                ? "red"
                                : "black",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor:
                                formik.touched.phoneNumber &&
                                formik.errors.phoneNumber
                                  ? "red"
                                  : "black",
                            },
                            height: "40px",
                          },
                        }}
                      />

                      <ToggleButtonGroup
                        size="small"
                        exclusive
                        value={formik.values.addressType}
                        onChange={(event, newValue) => {
                          if (newValue !== null) {
                            formik.setFieldValue("addressType", newValue);
                          }
                        }}
                        error={
                          formik.touched.addressType &&
                          Boolean(formik.errors.addressType)
                        }
                        onBlur={() =>
                          formik.setFieldTouched("addressType", true)
                        }
                        sx={{
                          "& .MuiToggleButton-root": {
                            borderColor:
                              formik.touched.addressType &&
                              formik.errors.addressType
                                ? "red"
                                : "black",
                            color: "black",
                            textTransform: "none",
                            fontSize: "0.75rem",
                            "&.Mui-selected": {
                              backgroundColor: "#121212",
                              color: "white",
                            },
                          },
                        }}
                      >
                        <ToggleButton value="HOME" aria-label="HOME">
                          <HomeIcon sx={{ mr: 1 }} /> Home
                        </ToggleButton>
                        <ToggleButton value="Building" aria-label="Building">
                          <MdApartment sx={{ mr: 1 }} /> Building
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>

                    <TextField
                      fullWidth
                      size="small"
                      id="address"
                      name="address"
                      label="Address"
                      variant="outlined"
                      value={formik.values.address}
                      onChange={(e) => {
                        // Allow alphanumeric, spaces, and common address characters
                        const sanitized = e.target.value.replace(/[<>"'`;(){}[\]\\]/g, '');
                        formik.setFieldValue("address", sanitized);
                        if (formik.errors.address) {
                          formik.setErrors({ ...formik.errors, address: undefined });
                        }
                      }}
                      inputProps={{ maxLength: 200 }}
                      error={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      sx={{
                        "& .MuiInputBase-input": { color: "black" },
                        "& .MuiInputLabel-root": {
                          color:
                            formik.touched.address && formik.errors.address
                              ? "red"
                              : "black",
                          fontSize: "0.70rem",
                        },
                        "& .Mui-focused": {
                          color:
                            formik.touched.address && formik.errors.address
                              ? "red"
                              : "black",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor:
                              formik.touched.address && formik.errors.address
                                ? "red"
                                : "black",
                          },
                          height: "40px",
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      id="landmark"
                      name="landmark"
                      label="LandMark: Apartment, suite, etc."
                      variant="outlined"
                      value={formik.values.landmark}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.landmark &&
                        Boolean(formik.errors.landmark)
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

                    <div className="flex gap-2">
                      <div className="w-1/3">
                        <TextField
                          fullWidth
                          size="small"
                          id="city"
                          name="city"
                          label="City"
                          variant="outlined"
                          value={formik.values.city}
                          onChange={(e) => {
                            formik.handleChange(e);
                            if (formik.errors.city) {
                              formik.setErrors({
                                ...formik.errors,
                                city: undefined,
                              });
                            }
                          }}
                          error={
                            formik.touched.city && Boolean(formik.errors.city)
                          }
                          sx={{
                            "& .MuiInputBase-input": { color: "black" },
                            "& .MuiInputLabel-root": {
                              color:
                                formik.touched.city && formik.errors.city
                                  ? "red"
                                  : "black",
                              fontSize: "0.70rem",
                            },
                            "& .Mui-focused": {
                              color:
                                formik.touched.city && formik.errors.city
                                  ? "red"
                                  : "black",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor:
                                  formik.touched.city && formik.errors.city
                                    ? "red"
                                    : "black",
                              },
                              height: "40px",
                            },
                          }}
                        />
                      </div>

                      <div className="w-1/3">
                        <Select
                          id="state"
                          name="state"
                          options={indianStates}
                          value={formik.values.state}
                          onChange={(value) => {
                            formik.setFieldValue("state", value);
                            if (formik.errors.state) {
                              formik.setErrors({
                                ...formik.errors,
                                state: undefined,
                              });
                            }
                          }}
                          onBlur={() => formik.setFieldTouched("state", true)}
                          placeholder=" state..."
                          isSearchable
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              minHeight: "40px",
                              fontSize: "0.75rem",
                              borderColor:
                                formik.touched.state && formik.errors.state
                                  ? "red"
                                  : "black",
                              boxShadow: "none",
                              "&:hover": {
                                borderColor:
                                  formik.touched.state && formik.errors.state
                                    ? "red"
                                    : "black",
                              },
                            }),
                            input: (provided) => ({
                              ...provided,
                              color: "black",
                              fontSize: "0.75rem",
                            }),
                            singleValue: (provided) => ({
                              ...provided,
                              color: "black",
                            }),
                            placeholder: (provided) => ({
                              ...provided,
                              color:
                                formik.touched.state && formik.errors.state
                                  ? "red"
                                  : "rgba(0, 0, 0, 0.6)",
                              fontSize: "0.75rem",
                            }),
                            menu: (provided) => ({
                              ...provided,
                              maxHeight: "150px",
                              overflowY: "auto",
                              fontSize: "0.75rm",
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }),
                            menuList: (provided) => ({
                              ...provided,
                              fontSize: "0.75rm",
                              maxHeight: "150px",
                              overflowY: "auto",
                              paddingRight: "5px",
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                              "::-webkit-scrollbar": {
                                display: "none",
                              },
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              fontSize: "0.75rem",
                              backgroundColor: state.isFocused
                                ? "#f0f0f0"
                                : "white",
                              color: "black",
                              cursor: "pointer",
                            }),
                          }}
                          className="react-select-container w-full"
                          classNamePrefix="react-select"
                        />
                      </div>

                      <div className="w-1/3">
                        <TextField
                          fullWidth
                          size="small"
                          id="pincode"
                          name="pincode"
                          label="Pincode"
                          variant="outlined"
                          value={formik.values.pincode}
                          onChange={(e) => {
                            formik.handleChange(e);
                            if (formik.errors.pincode) {
                              formik.setErrors({
                                ...formik.errors,
                                pincode: undefined,
                              });
                            }
                          }}
                          error={
                            formik.touched.pincode &&
                            Boolean(formik.errors.pincode)
                          }
                          sx={{
                            "& .MuiInputBase-input": { color: "black" },
                            "& .MuiInputLabel-root": {
                              color:
                                formik.touched.pincode && formik.errors.pincode
                                  ? "red"
                                  : "black",
                              fontSize: "0.70rem",
                            },
                            "& .Mui-focused": {
                              color:
                                formik.touched.pincode && formik.errors.pincode
                                  ? "red"
                                  : "black",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor:
                                  formik.touched.pincode &&
                                  formik.errors.pincode
                                    ? "red"
                                    : "black",
                              },
                              height: "40px",
                            },
                          }}
                        />
                      </div>
                    </div>
                    {!isEditing && (
                      <div className="flex items-center text-white gap-2 rounded">
                        <input
                          type="checkbox"
                          id="saveInfo"
                          name="isDefault"
                          checked={formik.values.isDefault}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className=""
                        />
                        <label
                          htmlFor="saveInfo"
                          className="text-xs text-black"
                        >
                          Save as default address
                        </label>
                      </div>
                    )}

                    <div className="flex items-center justify-center bg-black py-2 text-white gap-2 rounded">
                      <button
                        type="submit"
                        className="text-xs w-full"
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting
                          ? "Saving..."
                          : isEditing
                          ? "Update Address"
                          : "Save Address"}
                      </button>
                    </div>
                  </div>
                </form>

                {userAddresses.length > 0 && (
                  <div className="mt-8 px-5">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      Saved Addresses
                    </h3>
                    {isEditing && (
                      <button
                        onClick={handleNewAddress}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + New Address
                      </button>
                    )}
                    <div className="space-y-3">
                      {userAddresses.slice(0, 3).map((address) => (
                        <div
                          key={address.id}
                          className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer
                         ${
                           selectedAddressId === address.id
                             ? "bg-gray-100 border-black  shadow-sm border-l-8 rounded-3xl border-l-black-500"
                             : "bg-white border-gray-200 hover:bg-gray-50"
                         }
                       
                       `}
                          onClick={() => handleAddressSelect(address)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex ">
                              <div className="   w-fit ">
                                <div className="flex items-center ">
                                  <p className="font-medium text-gray-900 text-sm">
                                    {address.fullName}
                                  </p>
                                </div>
                                <p className="text-gray-700 text-xs mb-1">
                                  {address.addressLine1}
                                </p>
                                <p className="text-gray-500 text-xs ">
                                  Landmark: {address.landmark}
                                </p>
                                <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                                  <div>
                                    <span className="font-medium">Phone:</span>{" "}
                                    {address.phoneNumber}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-1  items-center text-xs text-gray-500">
                                {" "}
                                <div>
                                  <span className="font-medium">Pincode:</span>{" "}
                                  {address.pinCode}
                                </div>
                                <div>
                                  <span className="font-medium">City:</span>{" "}
                                  {address.city}
                                </div>
                                <div>
                                  <span className="font-medium">State:</span>{" "}
                                  {address.state}
                                </div>
                                <span className="font-medium flex ">
                                  Type:
                                  <span className="flex ml-1 items-center">
                                    {address.addressType === "HOME" ? (
                                      <HomeIcon
                                        className="inline mr-1"
                                        size={14}
                                      />
                                    ) : (
                                      <MdApartment
                                        className="inline mr-1"
                                        size={14}
                                      />
                                    )}
                                    {address.addressType.toLowerCase()}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className=" flex flex-col gap-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(address);
                                }}
                                className="text-sm text-orange-400 hover:text-blue-800 font-medium whitespace-nowrap ml-4"
                              >
                                <RxPencil2 />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(address.id);
                                }}
                                className="text-sm text-red-600 hover:text-red-800 font-medium whitespace-nowrap ml-4"
                              >
                                <RiDeleteBin6Line />
                              </button>

                              {!address.isDefault && (
                                <button
                                  onClick={() => makeDefault(address.id)}
                                  className="text-base text-blue-600  hover:text-red-800 font-medium whitespace-nowrap ml-4"
                                >
                                  <IoIosStarOutline />
                                </button>
                              )}
                              {address.isDefault && (
                                <button className="text-base cursor-default text-blue-600  font-medium whitespace-nowrap ml-4">
                                  <IoIosStar color="#417df2" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="md:w-1/2">
                <Payment />
              </div>
            </div>
          </div>
          <Footer isLoading={isLoading} />{" "}
        </>
      )}
    </div>
  );
};

export default Checkout;
