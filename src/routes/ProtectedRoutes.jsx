import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const user = Cookies.get("rizoUser");

  // console.log(user,"😀😀😀")
  //  console.log(user,'😀😀')
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
