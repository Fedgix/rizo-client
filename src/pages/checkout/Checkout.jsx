import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Checkbox, Input, TextField } from "@mui/material";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import Header from "../../helpers/components/Header";
import Footer from "../../helpers/components/Footer";
import { HiMiniWallet } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { checkoutAddress } from "../../helpers/validations/validation";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const indianStates = State.getStatesOfCountry("IN").map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      state: null,
      pincode: "",
      phoneNumber: "",
    },
    validationSchema: checkoutAddress,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      alert(
        JSON.stringify(
          {
            ...values,
            state: values.state.label,
          },
          null,
          2
        )
      );
    },
  });

  return (
    <div className="w-full h-full poppins-thin">
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
            <div className="w-full md:p-6 rounded-lg">
              <form
                onSubmit={formik.handleSubmit}
                className="md:space-y-4 space-y-9 md:gap-4 md:flex"
              >
                <div className="md:w-1/2 w-full space-y-3 md:px-5 px-2">
                  <h2 className="md:text-4xl text-2xl  poppins-medium font-semibold mb-6">
                    Shipping Information
                  </h2>
                  <div className="flex gap-2">
                    <TextField
                      fullWidth
                      size="small"
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      value={formik.values.firstName}
                      onChange={(e) => {
                        formik.handleChange(e);
                        if (formik.errors.firstName) {
                          formik.setErrors({
                            ...formik.errors,
                            firstName: undefined,
                          });
                        }
                      }}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
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

                    <TextField
                      fullWidth
                      size="small"
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      variant="outlined"
                      value={formik.values.lastName}
                      onChange={(e) => {
                        formik.handleChange(e);
                        if (formik.errors.lastName) {
                          formik.setErrors({
                            ...formik.errors,
                            lastName: undefined,
                          });
                        }
                      }}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
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

                  <TextField
                    fullWidth
                    size="small"
                    id="address"
                    name="address"
                    label="Address"
                    variant="outlined"
                    value={formik.values.address}
                    onChange={(e) => {
                      formik.handleChange(e);
                      if (formik.errors.address) {
                        formik.setErrors({
                          ...formik.errors,
                          address: undefined,
                        });
                      }
                    }}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
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

                  <TextField
                    fullWidth
                    size="small"
                    id="apartment"
                    name="apartment"
                    label="Apartment, suite, etc. (optional)"
                    variant="outlined"
                    value={formik.values.apartment}
                    onChange={formik.handleChange}
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
                        helperText={formik.touched.city && formik.errors.city}
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
                          control: (provided) => ({
                            ...provided,
                            minHeight: "40px",
                            fontSize: "0.75rem",

                            borderColor: "black",
                            boxShadow: "none",
                            "&:hover": {
                              borderColor: "black",
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
                            color: "rgba(0, 0, 0, 0.6)",
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

                      {formik.touched.state && formik.errors.state && (
                        <p
                          className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeSmall MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root"
                          style={{
                            color: "#d32f2f",
                            margin: "3px 14px 0",
                            fontSize: "0.75rem",
                          }}
                        >
                          {formik.errors.state}
                        </p>
                      )}
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
                        helperText={
                          formik.touched.pincode && formik.errors.pincode
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
                    fullWidth
                    size="small"
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    variant="outlined"
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
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
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
                  <div className="flex items-center gap-2  rounded">
                    <input type="checkbox" id="saveInfo" className="" />
                    <label htmlFor="saveInfo" className="text-xs text-black">
                      Save the information for next time
                    </label>
                  </div>
                </div>
                <div className="md:w-1/2 md:border-l-[2px] md:hidden-border-t-[2px] md:py-0 py-4 border-gray-100">
                  <div className="md:px-7 px-2">
                    <div className="md:space-y-8 space-y-3">
                      <div className=" ">
                        <div className="flex justify-between items-center py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-md relative">
                              <img
                                src="product/Screenshot 2025-05-01 at 10.52.27 PM 1 (1).png"
                                alt="White Adrenaline Tee"
                                fill
                                className="object-cover border  rounded-md"
                              />
                            </div>
                            <div className=" flex flex-col">
                              <span className="text-sm font-semibold">
                                White Adrenaline Tee
                              </span>
                              <span className="text-sm text-gray-400 font-semibold">
                                S
                              </span>
                            </div>
                          </div>
                          <span className="text-base font-semibold">
                            ₹984.00
                          </span>
                        </div>
                      </div>

                      <div className=" pb-4   w-full">
                        <div className="flex gap-2 ">
                          <Input
                            placeholder="Discount code or gift card "
                            className=" w-[80%] text-xs placeholder:text-xs"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                          />
                          <button
                            variant="outline"
                            size="sm"
                            className="whitespace-nowrap w-[20%] text-xs bg-[#fafafa] rounded-lg text-[#484848] py-2 text-opacity-50 border border-gray-300 font-bold "
                          >
                            Apply
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3  font-semibold  pb-4">
                        <div className="flex justify-between text-sm">
                          <span> Subtotal</span>
                          <span>₹984.00</span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span>Shipping</span>
                          <span className="text-gray-500">Entered address</span>
                        </div>

                        <div className="flex justify-between text-xl  font-bold pt-3">
                          <span className="">Total</span>
                          <div className="text-right">
                            <div>₹984.00</div>
                            <div className="text-xs font-semibold text-gray-500">
                              Including ₹48.86 in taxes
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h2 className="font-semibold  text-xl ">Payment</h2>
                        <p className="text-xs text-gray-500">
                          All transactions are secure and encrypted.
                        </p>

                        <div className="border rounded-md">
                          <div className="p-4 flex justify-between items-center border border-black rounded-md">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                              </div>
                              <span className="md:text-xs text-[10px] md:w-full w-[90%]">
                                Razorpay Payment Gateway (UPI, Cards &
                                Netbanking)
                              </span>
                            </div>
                            <div className="flex md:gap-1 px-2">
                              <img
                                src="new arrivels/visa-logo-visa-icon-transparent-free-png.webp"
                                alt="Visa"
                                width={30}
                                height={20}
                              />
                              <img
                                src="logo/upi_logo_icon_169316.webp"
                                alt="Mastercard"
                                width={30}
                                height={20}
                              />
                              <img
                                src="logo/image.png"
                                alt="PayPal"
                                width={30}
                                height={20}
                              />
                            </div>
                          </div>

                          <div className="p-4 bg-gray-50">
                            <div className="h-32 w-full rounded-md">
                              <HiMiniWallet className="h-full w-full text-[#868484]" />
                            </div>
                            <p className="text-[9px] text-gray-500 mt-3 text-center">
                              After clicking "Pay now", you will be redirected
                              to <br />
                              <span className="font-medium ">
                                Razorpay Payment Gateway (UPI, Cards &
                                Netbanking)
                              </span>{" "}
                              <br />
                              to complete your purchase securely.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => navigate("/order")}
                          className="w-full bg-black hover:bg-black/90 text-white py-3 rounded-md"
                        >
                          Pay now
                        </button>
                      </div>
                    </div>
                  </div>
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

export default Checkout;
