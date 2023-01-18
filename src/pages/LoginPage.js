import axios from "axios";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaComponent from "../component/MetaComponent";
import { userAction } from "../store/reducers/userReducers";
import { formReducer } from "../utils/validationInputs";

const LoginPage = () => {
  const path = useLocation();
  const navigate = useNavigate();

  const [userOrEmail, dispatchUser] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [password, dispatchPassword] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [successRegis, setSuccessRegis] = useState({
    show: false,
    title: "",
    message: "",
  });
  const dispatch = useDispatch();
  const userRef = useRef();
  const passwordRef = useRef();
  const rememberRef = useRef();
  const [loading, setLoading] = useState(false);
  const userOrEmailChangeHandler = (e) => {
    dispatchUser({ type: "notEmpty", val: e.target.value });
  };
  const passwordChangeHandler = (e) => {
    dispatchPassword({ type: "notEmpty", val: e.target.value });
  };

  const loginApiHandler = async (formInputs) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_PLANT}/api/user/login`,
      formInputs
    );
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const usernameOrEmail = userRef.current.value;
    const passwordInput = passwordRef.current.value;
    const doNotLogout = rememberRef.current.checked;
    if (userOrEmail.isValid && password.isValid) {
      let formInputs = {
        userLogin: usernameOrEmail,
        password: passwordInput,
        doNotLogout,
      };
      loginApiHandler(formInputs)
        .then((res) => {
          dispatch(userAction.login(res.userLoggedIn));

          localStorage.setItem("userInfo", JSON.stringify(res.userLoggedIn));

          if (res.userLoggedIn.isAdmin) {
            navigate("/admin/dashboard", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          if (err.response.data.includes("password")) {
            dispatchPassword({
              type: "inccorectPassword",
              val: err.response.data,
            });
          }
          if (err.response.data.includes("registered")) {
            dispatchUser({ type: "invalidUser", val: err.response.data });
          }
          setLoading(false);
        });
    } else {
      dispatchUser({ type: "notEmpty", val: usernameOrEmail });
      dispatchPassword({ type: "notEmpty", val: passwordInput });
      setLoading(false);
    }
  };
  useEffect(() => {
    if (path.search === "?register=success")
      return setSuccessRegis({
        show: true,
        title: "Success",
        message: "Account Successfully Created",
      });
    if (path.search === "?order=required")
      return setSuccessRegis({
        show: true,
        title: "Login",
        message: "To make an order you have to login",
      });
  }, []);
  return (
    <div className="">
      <MetaComponent
        title={"Login | Plantex 2022"}
        desciption="Nothing adds more beauty and comfort to our homes and offices than the lush flowers and foliage of indoor plants. Bedrooms, bathrooms, kitchens, cubicles… There really isn’t a space a houseplant can’t enliven. Just add light and water, and you’ve got a growing indoor oasis. Bringing plants into your home is aesthetically pleasing and – amazingly – plants can offer strong health benefits as well!"
      />
      <div className="w-full h-[200px] md:h-[300px] bg-[url('https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/bg-breadcrumb.jpg')] section relative bg-left ">
        <h1 className="home__title text-center text-black md:pt-5 pt-0">
          Login Account
        </h1>
      </div>
      <div className="container mt-20">
        <div className="max-w-lg border-2 border-[#f5f5f5] mx-auto py-10 md:px-20">
          <div className="w-[50%] mx-auto">
            <h1 className="text-xl flex items-center justify-center gap-x-1 border-b-[1px] border-black pb-3">
              <i className="ri-account-circle-line text-2xl font-normal "></i>
              Login
            </h1>
          </div>

          <div className="w-full max-w-lg mt-4">
            {successRegis.show && (
              <div className=" text-center pt-4 lg:px-4  lg:mx-0">
                <div
                  className="p-2 bg-[#3e6553] items-center text-white leading-none md:rounded-full flex lg:inline-flex"
                  role="alert"
                >
                  <span className="flex rounded-full bg-[#619e82] uppercase px-2 py-1 text-xs font-bold mr-3">
                    {successRegis.title}
                  </span>
                  <span className="font-semibold mr-2 text-left text-xs flex-auto">
                    {successRegis.message}
                  </span>
                </div>
              </div>
            )}
            <form
              className="bg-white px-8 pt-6 pb-8 mb-4"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-[#828787] text-sm font-normal mb-2"
                  htmlFor="username"
                >
                  Username or email address
                  <span className="text-red-700 ">*</span>
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    userOrEmail.isValid === false
                      ? "border-red-500 bg-red-50"
                      : ""
                  }`}
                  id="username"
                  type="text"
                  placeholder="Username or email"
                  ref={userRef}
                  onChange={userOrEmailChangeHandler}
                />
                {userOrEmail.isValid === false && (
                  <p className="mt-1 mb-0 text-sm text-red-600 dark:text-red-500">
                    {userOrEmail.errors}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  className="block text-[#828787] text-sm font-normal mb-2"
                  htmlFor="password"
                >
                  Password<span className="text-red-700 ">*</span>
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    password.isValid === false ? "border-red-500 bg-red-50" : ""
                  }`}
                  id="password"
                  type="password"
                  placeholder="******************"
                  autoComplete="false"
                  ref={passwordRef}
                  onChange={passwordChangeHandler}
                />
                {password.isValid === false && (
                  <p className="mt-1 mb-0 text-sm text-red-600 dark:text-red-500">
                    {password.errors}
                  </p>
                )}
              </div>
              <div className="flex items-center mb-6">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-black bg-gray-100 rounded-full outline-none"
                  ref={rememberRef}
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-1 text-xs font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember Me
                </label>
              </div>
              <div className="">
                {!loading ? (
                  <button
                    className="button w-full mb-3"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    LOGIN
                  </button>
                ) : (
                  <div className="button   w-full mb-3 ">
                    <div className="loader mx-auto" />
                  </div>
                )}
                <span className="text-xs text-center ">
                  Don't have an account yet?{" "}
                  <Link to={"/register"}>
                    <span className="cursor-pointer hover:text-black hover:underline">
                      Register Here
                    </span>
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
