import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const ProtectedUserRoute = () => {
  const { user } = useSelector((state) => state.userInfo);
  return user.isAdmin === true ? (
    (document.location.href = "/admin/dashboard")
  ) : (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedUserRoute;
