import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const AlreadyLogin = () => {
  const { user } = useSelector((state) => state.userInfo);
  return !user._id && <Outlet />;
};

export default AlreadyLogin;
