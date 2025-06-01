import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "../pages/product/Product";
import LandingPage from "../pages/landingpage/LandingPage";
import AllProducts from "../pages/full products/AllProducts";
import Shop from "../pages/shop/Shop";
import Contact from "../pages/contact/Contact";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import Order from "../pages/order/Order";
import About from "../pages/about/About";
import NewArrivel from "../pages/new arrivel/NewArrivel";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/product" element={<Product />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/contact" element={<Contact />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Order />} />
      </Route>
      
      <Route path="/about" element={<About />} />
      <Route path="/new-arrivals" element={<NewArrivel />} />
    </Routes>
  );
};

export default AppRoutes;