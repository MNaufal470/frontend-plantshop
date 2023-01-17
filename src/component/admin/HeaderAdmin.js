import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userAction } from "../../store/reducers/userReducers";

const HeaderAdmin = () => {
  const { user } = useSelector((state) => state.userInfo);
  const { receive } = useSelector((state) => state.chat);
  const location = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userAction.logoutUser());
  };

  return (
    <div className="w-[200px]  py-5 flex flex-col gap-y-5   h-screen border-r-2 border-gray-300 shadow-xl">
      <div className="border-b-2 pb-3  w-full text-center border-gray-300 ">
        <Link to="/admin" className="nav__logo ">
          <i className="ri-leaf-line nav__logo-icon"></i> Plantex
        </Link>
      </div>
      <div className="pl-3 flex flex-col ">
        <span className="text-xs font-semibold mb-1">Main</span>
        <Link to={"/admin/dashboard"}>
          <span
            className={`flex items-center gap-x-2 text-sm cursor-pointer ${
              location.pathname.includes("/dashboard") ? "bg-[#ece8ff]" : ""
            } hover:bg-[#ece8ff]`}
          >
            <i className="ri-layout-grid-fill text-[#7451f8] text-lg"></i>
            Dashboard
          </span>
        </Link>
      </div>
      <div className="pl-3 flex flex-col gap-y-1">
        <span className="text-xs font-semibold mb-1">Management</span>
        <Link to={"/admin/users"}>
          <span
            className={`flex items-center gap-x-2 text-sm cursor-pointer ${
              location.pathname.includes("/user") ? "bg-[#ece8ff]" : ""
            } hover:bg-[#ece8ff]`}
          >
            <i className="ri-user-line text-[#7451f8] text-lg"></i>
            User
          </span>
        </Link>
        <Link to={"/admin/category"}>
          <span
            className={`flex items-center gap-x-2 text-sm ${
              location.pathname.includes("/category") ? "bg-[#ece8ff]" : ""
            } cursor-pointer hover:bg-[#ece8ff]`}
          >
            <i className="ri-store-3-line text-[#7451f8] text-lg"></i>
            Category
          </span>
        </Link>
        <Link to={"/admin/products"}>
          <span
            className={`flex items-center gap-x-2 text-sm cursor-pointer hover:bg-[#ece8ff] ${
              location.pathname.includes("/product") ? "bg-[#ece8ff]" : ""
            }`}
          >
            <i className="ri-store-fill text-[#7451f8] text-lg "></i>
            Products
          </span>
        </Link>
        <Link to={"/admin/orders"}>
          <span
            className={`flex items-center gap-x-2 text-sm cursor-pointer hover:bg-[#ece8ff] ${
              location.pathname.includes("/order") ? "bg-[#ece8ff]" : ""
            }`}
          >
            <i className="ri-bank-card-fill text-[#7451f8] text-lg"></i>
            Orders
          </span>
        </Link>
      </div>
      <div className="pl-3 flex flex-col gap-y-1">
        <span className="text-xs font-semibold mb-1">Actions</span>
        <span
          className="flex items-center gap-x-2 text-sm cursor-pointer hover:bg-[#ece8ff]"
          onClick={handleLogout}
        >
          <i className="ri-logout-box-line text-[#7451f8] text-lg"></i>
          Logout
        </span>
      </div>
    </div>
  );
};

export default HeaderAdmin;
