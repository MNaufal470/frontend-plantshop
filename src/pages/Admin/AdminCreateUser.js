import axios from "axios";
import React, { useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formReducer } from "../../utils/validationInputs";
const AdminCreateUser = () => {
  const [sendImage, setSendImage] = useState();
  const [loading, setLoading] = useState(false);
  const [image, dispatchImage] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });

  const [firstName, dispatchFirstName] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [lastName, dispatchLastName] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [userName, dispatchUserName] = useReducer(formReducer, {
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
  const cPasswordRef = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();
  const handleFirstName = (e) =>
    dispatchFirstName({ type: "notEmpty", val: e.target.value });

  const handleLastName = (e) =>
    dispatchLastName({ type: "notEmpty", val: e.target.value });

  const handleUsername = (e) =>
    dispatchUserName({ type: "notEmpty", val: e.target.value });

  const handleEmail = (e) =>
    dispatchEmail({ type: "email", val: e.target.value });

  const handlePassword = (e) => {
    dispatchPassword({ type: "notEmpty", val: e.target.value });
    dispatchCPassword({
      type: "passwordMacthed",
      val: cPassword.value,
      password: e.target.value,
    });
  };
  const handleCPassword = (e) => {
    dispatchCPassword({
      type: "passwordMacthed",
      val: e.target.value,
      password: password.value,
    });
  };

  const handleImage = (e) => {
    dispatchImage({
      type: "uploadImage",
      mime: e.target.files[0].type,
      size: e.target.files[0].size,
      val: e.target.files[0],
    });
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setSendImage(reader.result);
    };
  };

  const sendApiPost = async (formInputs) => {
    const { data } = await axios.post("/api/user/register", formInputs);
    return data;
  };
  const uploadImageToServer = async (id, images) => {
    // const formImage = new FormData();
    // Array.from(images).forEach((image) => {
    //   formImage.append("images", image);
    // });
    // const { data } = await axios.post(
    //   "/api/user/profile/imageProfile/upload/" + id,
    //   formImage
    // );

    const { data } = await axios.post(
      "/api/user/profile/imageProfile/upload/" + id,
      { sendImage }
    );
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      firstName.isValid &&
      lastName.isValid &&
      userName.isValid &&
      email.isValid &&
      password.isValid &&
      cPassword.isValid &&
      image.isValid
    ) {
      let formInputs = {
        name: firstName.value,
        lastName: lastName.value,
        userName: userName.value,
        email: email.value,
        password: password.value,
      };
      sendApiPost(formInputs)
        .then((res) => {
          if (res.success) {
            uploadImageToServer(res.userCreated._id, image.value).then((res) =>
              navigate("/admin/users", { replace: true })
            );
          }
        })
        .catch((err) => {
          if (err.response.data.includes("email")) {
            return dispatchEmail({ type: "emailAlreadyExist" });
          }
          if (err.response.data.includes("user")) {
            return dispatchUserName({ type: "userNameExist" });
          }
        });
    } else {
      dispatchFirstName({ type: "notEmpty", val: firstNameRef.current.value });
      dispatchLastName({ type: "notEmpty", val: lastNameRef.current.value });
      dispatchUserName({ type: "notEmpty", val: userNameRef.current.value });
      dispatchEmail({ type: "notEmpty", val: emailRef.current.value });
      dispatchPassword({ type: "notEmpty", val: passwordRef.current.value });
      dispatchCPassword({
        type: "passwordMacthed",
        val: passwordRef.current.value,
      });
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen overflow-y-scroll pb-20">
      <div className="pt-[61px] border-b-2 border-gray-300 w-full" />
      <div className="flex  gap-x-20 justify-center mt-10">
        <div className="">
          <div className="flex flex-col  justify-center items-center  mt-2">
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col justify-center items-center w-[300px] h-64 bg-gray-50 rounded-lg border-2 ${
                image.isValid === false ? "border-red-500" : "border-gray-300"
              }  border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
            >
              <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="mb-3 w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                {image.isValid ? (
                  <p className="text-xs text-gray-500 dark:text-gray-400 ">
                    {image.value.name}
                  </p>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 ">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleImage}
                ref={imageRef}
              />
            </label>
            {image.isValid === false && (
              <p className="mt-1  mb-2 text-xs text-red-600 dark:text-red-500">
                {image.errors}
              </p>
            )}
          </div>
        </div>
        <div>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                    firstName.isValid === false
                      ? "bg-red-50 border border-red-500"
                      : ""
                  }`}
                  id="grid-first-name"
                  type="text"
                  onChange={handleFirstName}
                  ref={firstNameRef}
                />
                {firstName.isValid === false && (
                  <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                    {firstName.errors}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                    lastName.isValid === false
                      ? "bg-red-50 border border-red-500"
                      : ""
                  }`}
                  id="grid-last-name"
                  type="text"
                  onChange={handleLastName}
                  ref={lastNameRef}
                />
                {lastName.isValid === false && (
                  <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                    {lastName.errors}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Username
                </label>
                <input
                  className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                    userName.isValid === false
                      ? "bg-red-50 border border-red-500"
                      : ""
                  }`}
                  id="userName"
                  type="text"
                  onChange={handleUsername}
                  ref={userNameRef}
                />
                {userName.isValid === false && (
                  <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                    {userName.errors}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-email"
                >
                  Email
                </label>
                <input
                  className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                    email.isValid === false
                      ? "bg-red-50 border border-red-500"
                      : ""
                  }`}
                  id="email"
                  type="email"
                  onChange={handleEmail}
                  ref={emailRef}
                />
                {email.isValid === false && (
                  <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                    {email.errors}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                    password.isValid === false
                      ? "bg-red-50 border border-red-500"
                      : ""
                  }`}
                  id="grid-password"
                  type="password"
                  placeholder="******************"
                  autoComplete="false"
                  onChange={handlePassword}
                  ref={passwordRef}
                />
                {password.isValid === false && (
                  <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                    {password.errors}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Confirm Password
                </label>
                <input
                  className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                    cPassword.isValid === false
                      ? "bg-red-50 border border-red-500"
                      : ""
                  }`}
                  id="confirm-password"
                  type="password"
                  placeholder="******************"
                  autoComplete="false"
                  onChange={handleCPassword}
                  ref={cPasswordRef}
                />

                {cPassword.isValid === false ? (
                  <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                    {cPassword.errors}
                  </p>
                ) : (
                  <p className="text-gray-600 text-xs italic">
                    Password and confirm password fields value must be matched
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              {!loading ? (
                <button className="button" type="submit" onClick={handleSubmit}>
                  Create User
                </button>
              ) : (
                <img src="/uploading.gif" alt="" />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateUser;
