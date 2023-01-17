import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../component/admin/HeaderAdmin";

const RouteWithHeaderAdmin = () => {
  return (
    <React.Fragment>
      <div className="flex">
        <HeaderAdmin />
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default RouteWithHeaderAdmin;
