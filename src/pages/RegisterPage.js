import React, { useReducer, useRef, useState } from "react";
import { formReducer } from "../utils/validationInputs";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MetaComponent from "../component/MetaComponent";
const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [firstName, dispatchFirstName] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [lastName, dispatchlastName] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [userName, dispatchuserName] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [email, dispatchEmail] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [password, dispatchPassword] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [cPassword, dispatchCPassword] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const navigate = useNavigate();

  const registUser = async (formInputs) => {
    const { data } = await axios.post("/api/user/register", formInputs);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let firstNameinput = firstNameRef.current.value;
    let lastNameinput = lastNameRef.current.value;
    let userNameinput = userNameRef.current.value;
    let passwordinput = passwordRef.current.value;
    let confirminput = confirmRef.current.value;
    let emailinput = emailRef.current.value;
    if (
      firstName.isValid &&
      lastName.isValid &&
      userName.isValid &&
      email.isValid &&
      password.isValid &&
      cPassword.isValid
    ) {
      let formInputs = {
        name: firstNameinput,
        lastName: lastNameinput,
        userName: userNameinput,
        email: emailinput,
        password: passwordinput,
      };
      registUser(formInputs)
        .then((res) => res.success && navigate("/login?register=success"))
        .catch((err) => {
          if (err.response.data.includes("email")) {
            return dispatchEmail({ type: "emailAlreadyExist" });
          }
          if (err.response.data.includes("user")) {
            return dispatchuserName({ type: "userNameExist" });
          }
          setLoading(false);
        });
    } else {
      dispatchFirstName({
        type: "notEmpty",
        val: firstNameinput,
      });
      dispatchlastName({
        type: "notEmpty",
        val: lastNameinput,
      });
      dispatchuserName({
        type: "notEmpty",
        val: userNameinput,
      });
      dispatchEmail({
        type: "email",
        val: emailinput,
      });
      dispatchPassword({
        type: "notEmpty",
        val: passwordinput,
      });
      dispatchCPassword({
        type: "passwordMacthed",
        val: confirminput,
        password: password.value,
      });
      setLoading(false);
    }
  };

  const firstNameChangeHandler = (e) => {
    dispatchFirstName({ type: "notEmpty", val: e.target.value });
  };
  const lastNameChangeHandler = (e) => {
    dispatchlastName({ type: "notEmpty", val: e.target.value });
  };
  const userNameChangeHandler = (e) => {
    dispatchuserName({ type: "notEmpty", val: e.target.value });
  };
  const emailChangeHandler = (e) => {
    dispatchEmail({ type: "email", val: e.target.value });
  };
  const passwordChangeHandler = (e) => {
    dispatchPassword({ type: "notEmpty", val: e.target.value });
    dispatchCPassword({
      type: "passwordMacthed",
      val: e.target.value,
      password: cPassword.value,
    });
  };
  const cPasswordChangeHandler = (e) => {
    dispatchCPassword({
      type: "passwordMacthed",
      val: e.target.value,
      password: password.value,
    });
  };
  return (
    <div className="">
      <MetaComponent
        title={"Register | Plantex 2022"}
        desciption="Nothing adds more beauty and comfort to our homes and offices than the lush flowers and foliage of indoor plants. Bedrooms, bathrooms, kitchens, cubicles… There really isn’t a space a houseplant can’t enliven. Just add light and water, and you’ve got a growing indoor oasis. Bringing plants into your home is aesthetically pleasing and – amazingly – plants can offer strong health benefits as well!"
      />
      <div className="w-full h-[200px] md:h-[300px] bg-[url('https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/bg-breadcrumb.jpg')] section relative bg-left ">
        <h1 className="home__title text-center text-black md:pt-5 pt-0">
          Register Account
        </h1>
      </div>
      <div className="container mt-20">
        <div className="max-w-lg border-2 border-[#f5f5f5] mx-auto py-10 md:px-20">
          <div className="w-[50%] mx-auto">
            <h1 className="text-xl flex items-center justify-center gap-x-1 border-b-[1px] border-black pb-3">
              <i className="ri-login-box-line text-2xl font-normal "></i>
              Register
            </h1>
          </div>
          <div className="w-full max-w-lg mt-4">
            <form
              className="bg-white  px-8 pt-6 pb-8 mb-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-wrap -mx-3 ">
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <label
                    className="block text-[#828787] text-sm font-normal mb-2"
                    htmlFor="grid-first-name"
                  >
                    First Name<span className="text-red-700 ">*</span>
                  </label>
                  <input
                    className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                      firstName.isValid === false
                        ? "bg-red-50 border border-red-500"
                        : ""
                    }`}
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane"
                    ref={firstNameRef}
                    onChange={firstNameChangeHandler}
                  />
                  {firstName.isValid === false && (
                    <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                      {firstName.errors}
                    </p>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <label
                    className="block text-[#828787] text-sm font-normal mb-2"
                    htmlFor="grid-last-name"
                  >
                    Last Name<span className="text-red-700 ">*</span>
                  </label>
                  <input
                    className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                      lastName.isValid === false
                        ? "bg-red-50 border border-red-500"
                        : ""
                    }`}
                    id="grid-last-name"
                    type="text"
                    placeholder="Doe"
                    ref={lastNameRef}
                    onChange={lastNameChangeHandler}
                  />
                  {lastName.isValid === false && (
                    <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                      {lastName.errors}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-[#828787] text-sm font-normal mb-2"
                  htmlFor="username"
                >
                  Username
                  <span className="text-red-700">*</span>
                </label>
                <input
                  className={`shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    userName.isValid === false
                      ? "bg-red-50 border border-red-500"
                      : ""
                  }`}
                  id="username"
                  type="text"
                  placeholder="Username"
                  ref={userNameRef}
                  onChange={userNameChangeHandler}
                />
                {userName.isValid === false && (
                  <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                    {userName.errors}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-[#828787] text-sm font-normal mb-2"
                  htmlFor="email"
                >
                  email address
                  <span className="text-red-700">*</span>
                </label>
                <input
                  className={`shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    email.isValid === false
                      ? email.errors === "Please input a valid email"
                        ? "bg-orange-100"
                        : "bg-red-50 border border-red-500"
                      : ""
                  }`}
                  id="email"
                  type="text"
                  placeholder="example@gmail.com"
                  ref={emailRef}
                  onBlur={emailChangeHandler}
                  onChange={emailChangeHandler}
                />
                {email.isValid === false && (
                  <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                    {email.errors}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label
                  className="block text-[#828787] text-sm font-normal mb-2"
                  htmlFor="password"
                >
                  Password<span className="text-red-700 ">*</span>
                </label>
                <input
                  className={`shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    password.isValid === false
                      ? "bg-red-50 border border-red-500"
                      : ""
                  }`}
                  id="password"
                  type="password"
                  placeholder="******************"
                  autoComplete="false"
                  ref={passwordRef}
                  onChange={passwordChangeHandler}
                />
                {password.isValid === false && (
                  <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                    {password.errors}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  className="block text-[#828787] text-sm font-normal mb-2"
                  htmlFor="password"
                >
                  Confirm Password<span className="text-red-700 ">*</span>
                </label>
                <input
                  className={`shadow appearance-none border w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline ${
                    cPassword.isValid === false
                      ? "bg-red-50 border border-red-500 mb-0"
                      : "mb-3"
                  }`}
                  id="confirmPassword"
                  type="password"
                  placeholder="******************"
                  autoComplete="false"
                  ref={confirmRef}
                  onChange={cPasswordChangeHandler}
                />
                {cPassword.isValid === false && (
                  <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                    {cPassword.errors}
                  </p>
                )}
              </div>
              <div className="">
                {!loading ? (
                  <button
                    className="button w-full mb-3"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    REGISTER
                  </button>
                ) : (
                  <div className="button   w-full mb-3 ">
                    <div className="loader mx-auto" />
                  </div>
                )}
                <span className="text-xs text-center ">
                  Already have an account?{" "}
                  <Link to={"/login"}>
                    <span className="cursor-pointer hover:text-black hover:underline">
                      Sign In Here
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

export default RegisterPage;
