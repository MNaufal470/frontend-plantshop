import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const { user } = useSelector((state) => state.userInfo);
  return user.isAdmin ? <Outlet /> : (document.location.href = "/");
};

export default ProtectedAdminRoute;
