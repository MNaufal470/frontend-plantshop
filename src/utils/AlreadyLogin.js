import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AlreadyLogin = () => {
  const { user } = useSelector((state) => state.userInfo);
  return !user._id ? (
    <Outlet />
  ) : user.isAdmin ? (
    (document.location.href = "/admin")
  ) : (
    (document.location.href = "/")
  );
};

export default AlreadyLogin;
