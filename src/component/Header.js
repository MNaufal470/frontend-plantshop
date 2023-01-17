import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";

const Header = () => {
  const [showBar, setshowBar] = useState(false);
  const [changeBg, setchangeBg] = useState(false);
  const location = useLocation();
  const listenScrollEvent = () => {
    if (window.scrollY > 73) {
      return setchangeBg(true);
    } else if (window.scrollY < 70) {
      return setchangeBg(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  const { user } = useSelector((state) => state.userInfo);
  const { wishlist } = useSelector((state) => state.wishlist);
  let list = [
    { name: "User Profile", link: "/user" },
    { name: "My Orders", link: "/user/orders" },
    { name: "Logout", link: "logout" },
  ];
  const cart = useSelector((state) => state.cart);
  return (
    <header className={`header ${changeBg ? "scroll-header" : ""}`} id="header">
      <nav className="nav container ">
        <Link to={"/"}>
          <p className="nav__logo">
            <i className="ri-leaf-line nav__logo-icon"></i> Plantex
          </p>
        </Link>
        <div
          className={`nav__menu ${showBar ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav__list">
            <Link to={"/about"}>
              <li className="nav__item ">
                <p
                  className={`nav__link ${
                    location.pathname === "/about" ? "active-link" : ""
                  }`}
                >
                  About
                </p>
              </li>
            </Link>
            <Link to={"/"}>
              <li className="nav__item">
                <p
                  className={`nav__link ${
                    location.pathname === "/" ? "active-link" : ""
                  }`}
                >
                  Home
                </p>
              </li>
            </Link>
            <Link to={"/shop"}>
              <li className="nav__item">
                <p
                  className={`nav__link ${
                    location.pathname.includes("/shop") ? "active-link" : ""
                  }`}
                >
                  Shop
                </p>
              </li>
            </Link>
          </ul>
          <ul className="nav__list nav__listLogo !justify-center gap-x-10">
            <li className="nav__item ">
              {!user._id ? (
                <Link to={`/login`}>
                  <p className="nav__link">
                    <i className="ri-login-circle-line nav__logo-icon logo-2"></i>
                  </p>
                </Link>
              ) : (
                <Dropdown
                  person={true}
                  list={list}
                  icon={<i className="ri-user-line nav__logo-icon logo-2"></i>}
                />
              )}
            </li>

            <Link to={"/wishlist"}>
              <li className="nav__item">
                <p className="nav__link">
                  <i className="ri-heart-line nav__logo-icon logo-2"></i>
                  {wishlist.length > 0 && <small>{wishlist.length}</small>}
                </p>
              </li>
            </Link>
            <Link to={"/cart"}>
              <li className="nav__item ">
                <p className="nav__link ">
                  <i className="ri-shopping-cart-2-line nav__logo-icon logo-2"></i>
                  <small>
                    ${cart.cartSubtotal > 0 ? cart.cartSubtotal.toFixed(2) : 0}
                  </small>
                </p>
              </li>
            </Link>
          </ul>
          {showBar && (
            <div className="nav__close" id="nav-close">
              <i
                className="ri-close-line nav__logo-icon"
                onClick={() => setshowBar(false)}
              ></i>
            </div>
          )}
        </div>
        {!showBar && (
          <div className="nav__toggle" id="nav-toggle">
            <i className="ri-menu-line" onClick={() => setshowBar(true)}></i>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
