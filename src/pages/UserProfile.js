import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { formReducer } from "../utils/validationInputs";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@mui/material";
import MetaComponent from "../component/MetaComponent";
const UserProfile = () => {
  const { user } = useSelector((state) => state.userInfo);
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [changeImage, setChangeImage] = useState(false);
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
  const [country, dispatchCountry] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [city, dispatchCity] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [zip, dispatchZip] = useReducer(formReducer, {
    value: "",
    isValid: "",
  });
  const [address, dispatchAddress] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [phoneNumber, dispatchPhoneNumber] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [state, dispatchState] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [password, dispatchPassword] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const updateApiHandler = async (formInput) => {
    const { data } = await axios.put("/api/user/profile/" + user._id, {
      ...formInput,
    });
    return data;
  };

  const hanlderApiImage = async (images) => {
    // Cloudinary Upload

    const reader = new FileReader();
    reader.readAsDataURL(images[0]);
    reader.onloadend = async () => {
      await axios
        .put("/api/user/profile/cloudinary/edit/" + user._id, {
          images: reader.result,
        })
        .then((res) => {
          setLoadingUpload(false);
          setChangeImage(!changeImage);
        })
        .catch((err) => console.log(err));
    };
    // const formImage = new FormData();
    // Array.from(images).forEach((img) => {
    //   formImage.append("images", img);
    // });
    // const { data } = await axios.post(
    //   "/api/user/profile/imageProfile/upload/" + user._id,
    //   formImage
    // );
    // if (data) {
    //   const oldImage = encodeURIComponent(image.value);
    //   await axios.put(
    //     `/api/user/profile/imageProfile/edit/${user._id}/${oldImage}`
    //   );
    // }
    // setChangeImage(!changeImage);
    return;
  };
  const hanldeChangeImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoadingUpload(true);
    dispatchImage({
      type: "uploadImage",
      mime: e.target.files[0].type,
      size: e.target.files[0].size,
      val: e.target.files,
    });
    if (
      !e.target.files[0].type.match(/\(jpg|jpeg|png/) ||
      e.target.files[0].size > 1048576
    ) {
      return setLoadingUpload(false);
    }
    hanlderApiImage(e.target.files)
      .then((res) => {
        return toast.success(`Success upload your image profile`, {
          position: "bottom-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        setLoadingUpload(false);
        dispatchImage({
          type: "uploadImage",
          mime: e.target.files[0].type,
          size: e.target.files[0].size,
          val: e.target.files,
        });
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      firstName.isValid === true &&
      lastName.isValid === true &&
      country.isValid === true &&
      city.isValid === true &&
      zip.isValid === true &&
      address.isValid === true &&
      phoneNumber.isValid === true &&
      state.isValid === true
    ) {
      let formInput = {
        name: firstName.value,
        lastName: lastName.value,
        country: country.value,
        city: city.value,
        zipCode: zip.value,
        address: address.value,
        phoneNumber: phoneNumber.value,
        state: state.value,
        password: password.value,
      };
      updateApiHandler(formInput)
        .then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res.userUpdated));
          return toast.success(`Success update your profile`, {
            position: "bottom-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        })
        .catch((err) => console.log(err));
    } else {
      dispatchImage({ type: "notEmpty", val: image.value });
      dispatchFirstName({ type: "notEmpty", val: firstName.value });
      dispatchLastName({ type: "notEmpty", val: lastName.value });
      dispatchCountry({ type: "notEmpty", val: country.value });
      dispatchCity({ type: "notEmpty", val: city.value });
      dispatchZip({ type: "notEmpty", val: zip.value });
      dispatchAddress({ type: "notEmpty", val: address.value });
      dispatchPhoneNumber({ type: "notEmpty", val: phoneNumber.value });
      dispatchState({ type: "notEmpty", val: state.value });
    }
  };
  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      const { data } = await axios.get("/api/user/profile/" + user._id);
      return data;
    };
    fetchUser().then((res) => {
      dispatchImage({ type: "fillData", val: res.image });
      dispatchFirstName({ type: "fillData", val: res.name });
      dispatchLastName({ type: "fillData", val: res.lastName });
      dispatchCountry({ type: "fillData", val: res.country ?? "" });
      dispatchCity({ type: "fillData", val: res.city ?? "" });
      dispatchZip({ type: "fillData", val: res.zipCode ?? "" });
      dispatchAddress({ type: "fillData", val: res.address ?? "" });
      dispatchPhoneNumber({ type: "fillData", val: res.phoneNumber ?? "" });
      dispatchState({ type: "fillData", val: res.state ?? "" });
    });
    setLoading(false);
  }, [changeImage]);
  return (
    <>
      <MetaComponent title={"Profile | Plantex 2022"} />
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Slide}
        theme="dark"
      />
      <div className="w-full h-[200px] md:h-[300px] bg-[url('https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/bg-breadcrumb.jpg')] section relative bg-left ">
        <h1 className="home__title text-center text-black md:pt-5 pt-0">
          User Profile
        </h1>
      </div>
      <div className="container mt-20 ">
        {!loading && (
          <div className="flex flex-col md:flex-row lg:gap-x-20 gap-x-10 justify-center">
            <div>
              {loadingUpload ? (
                <img
                  src="/uploading.gif"
                  alt=""
                  className="mx-auto w-[300px]"
                />
              ) : (
                <img src={image?.value} alt="" className="w-[300px] mx-auto" />
              )}
              <form
                className="flex flex-col justify-center items-center w-full mt-2"
                onChange={hanldeChangeImage}
              >
                <label
                  htmlFor="dropzone-file"
                  className={`flex flex-col justify-center items-center w-[300px] h-64 bg-gray-50 rounded-lg border-2 ${
                    image.isValid === false
                      ? "border-red-500"
                      : "border-gray-300"
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
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
                {image.isValid === false && (
                  <p className="mt-1  mb-2 text-xs text-red-600 dark:text-red-500">
                    {image.errors}
                  </p>
                )}
              </form>
            </div>
            <div>
              <div>
                <form
                  className="w-full max-w-lg mt-5 lg:mt-0"
                  onSubmit={handleSubmit}
                >
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
                        value={firstName?.value}
                        onChange={(e) =>
                          dispatchFirstName({
                            type: "notEmpty",
                            val: e.target.value,
                          })
                        }
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
                        value={lastName?.value}
                        onChange={(e) =>
                          dispatchLastName({
                            type: "notEmpty",
                            val: e.target.value,
                          })
                        }
                      />
                      {lastName.isValid === false && (
                        <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                          {lastName.errors}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-zip"
                      >
                        Country
                      </label>
                      <input
                        className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                          country.isValid === false
                            ? "bg-red-50 border border-red-500"
                            : ""
                        }`}
                        id="grid-zip"
                        type="text"
                        value={country?.value}
                        onChange={(e) =>
                          dispatchCountry({
                            type: "notEmpty",
                            val: e.target.value,
                          })
                        }
                      />
                      {country.isValid === false && (
                        <p className="mt-1  mb-2 text-xs text-red-600 dark:text-red-500">
                          {country.errors}
                        </p>
                      )}
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-city"
                      >
                        City
                      </label>
                      <input
                        className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                          city.isValid === false
                            ? "bg-red-50 border border-red-500"
                            : ""
                        }`}
                        id="grid-city"
                        type="text"
                        value={city?.value}
                        onChange={(e) =>
                          dispatchCity({
                            type: "notEmpty",
                            val: e.target.value,
                          })
                        }
                      />
                      {city.isValid === false && (
                        <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                          {city.errors}
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-zip"
                      >
                        Zip
                      </label>
                      <input
                        className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                          zip.isValid === false
                            ? "bg-red-50 border border-red-500"
                            : ""
                        }`}
                        id="grid-zip3"
                        type="text"
                        value={zip?.value}
                        onChange={(e) =>
                          dispatchZip({
                            type: "notEmpty",
                            val: e.target.value,
                          })
                        }
                      />
                      {zip.isValid === false && (
                        <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                          {zip.errors}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-zip"
                      >
                        Phone Number
                      </label>
                      <input
                        className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                          phoneNumber.isValid === false
                            ? "bg-red-50 border border-red-500"
                            : ""
                        }`}
                        id="grid-zip2"
                        type="text"
                        value={phoneNumber?.value}
                        onChange={(e) =>
                          dispatchPhoneNumber({
                            type: "notEmpty",
                            val: e.target.value,
                          })
                        }
                      />
                      {phoneNumber.isValid === false && (
                        <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                          {phoneNumber.errors}
                        </p>
                      )}
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-zip"
                      >
                        State
                      </label>
                      <input
                        className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                          state.isValid === false
                            ? "bg-red-50 border border-red-500"
                            : ""
                        }`}
                        id="grid-zip22"
                        type="text"
                        value={state?.value}
                        onChange={(e) =>
                          dispatchState({
                            type: "notEmpty",
                            val: e.target.value,
                          })
                        }
                      />
                      {state.isValid === false && (
                        <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                          {state.errors}
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
                        Address
                      </label>
                      <input
                        className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                          address.isValid === false
                            ? "bg-red-50 border border-red-500"
                            : ""
                        }`}
                        id="grid-password"
                        type="text"
                        value={address?.value}
                        onChange={(e) =>
                          dispatchAddress({
                            type: "notEmpty",
                            val: e.target.value,
                          })
                        }
                      />
                      {address.isValid === false && (
                        <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                          {address.errors}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full  px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-zip"
                      >
                        Change Password
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="changePassword"
                        type="password"
                        placeholder="******"
                        autoComplete="false"
                        onChange={(e) =>
                          dispatchPassword({
                            type: "fillData",
                            val: e.target.value,
                          })
                        }
                      />
                      <p className="text-gray-600 text-xs italic mt-0.5">
                        Fill this field to change your password
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <button
                      className="button"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex gap-x-20 justify-center">
            <div>
              <Skeleton
                variant="rectangular"
                width={300}
                height={250}
                animation="wave"
              />
              <Skeleton
                variant="rounded"
                width={300}
                height={200}
                animation="wave"
                sx={{ mt: "8px" }}
              />
            </div>
            <div className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Skeleton height={80} />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Skeleton height={80} />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Skeleton height={80} />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Skeleton height={80} />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Skeleton height={80} />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full  px-3 mb-6 md:mb-0">
                  <Skeleton height={80} />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full  px-3 mb-6 md:mb-0">
                  <Skeleton height={80} />
                </div>
              </div>
              <div className=" flex justify-end">
                <Skeleton height={80} variant="rounded" width={"100px"} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
