import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Product from "../pages/product/Product";
import LandingPage from "../pages/landingpage/LandingPage";
import AllProducts from "../pages/full products/AllProducts";
import Shop from "../pages/shop/Shop";
import Contact from "../pages/contact/Contact";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import Order from "../pages/order/Order";
import About from "../pages/about/About";
import Login from "../pages/auth/Login";
import { LoginPage } from "../helpers/components/Ex";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/product" element={<Product />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order" element={<Order />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
