import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formReducer } from "../../utils/validationInputs";

const AdminEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [changeImage, setChangeImage] = useState(false);
  const [images, setImages] = useState();
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
  });

  const cloudinaryUpdate = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const { data } = await axios
        .put(`/api/user/profile/cloudinary/edit/${id}`, {
          images: reader.result,
        })
        .then((res) => {
          setChangeImage(!changeImage);
          setLoading(false);
        });

      return data;
    };
  };

  const hanlderApiImage = async (picture) => {
    const formImage = new FormData();
    Array.from(images).forEach((img) => {
      formImage.append("images", img);
    });
    const { data } = await axios.post(
      "/api/user/profile/imageProfile/upload/" + id,
      formImage
    );
    if (data) {
      const oldImage = encodeURIComponent(image.value);
      await axios.put(`/api/user/profile/imageProfile/edit/${id}/${oldImage}`);
    }
    setChangeImage(!changeImage);
    return data;
  };

  const validationImage = (img) => {
    const result = dispatchImage({
      type: "uploadImage",
      mime: img.type,
      size: img.size,
      val: img,
    });
  };

  const hanldeChangeImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Cloudinary
    if (e.target.files[0].size < 1048576) {
      cloudinaryUpdate(e.target.files[0]);
    } else {
      setLoading(false);
    }
    // Uploading To Local
    // hanlderApiImage(e.target.files)
    //   .then((res) => {
    // setChangeImage(!changeImage);
    // setLoading(false);
    //   })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstName.isValid &&
      lastName.isValid &&
      userName.isValid &&
      email.isValid
    ) {
      let formInputs = {
        name: firstName.value,
        lastName: lastName.value,
        userName: userName.value,
        email: email.value,
        password: password.value,
        isAdmin: isAdmin,
      };
      await axios
        .put("/api/user/" + id, formInputs)
        .then((res) => navigate("/admin/users", { replace: true }))
        .catch((err) => {
          if (err.response.data.includes("email")) {
            return dispatchEmail({ type: "emailAlreadyExist" });
          }
          if (err.response.data.includes("user")) {
            return dispatchUserName({ type: "userNameExist" });
          }
        });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get("/api/user/" + id);
      return data;
    };
    fetchUser().then((res) => {
      dispatchFirstName({ type: "fillData", val: res.name });
      dispatchLastName({ type: "fillData", val: res.lastName });
      dispatchUserName({ type: "fillData", val: res.userName });
      dispatchEmail({ type: "fillData", val: res.email });
      dispatchImage({ type: "fillData", val: res.image });
      setIsAdmin(res.isAdmin);
    });
  }, [id, changeImage]);
  return (
    <div className="w-full h-screen overflow-y-scroll pb-20">
      <div className="pt-[61px] border-b-2 border-gray-300 w-full" />
      <div className="flex gap-x-20 justify-center mt-10">
        <div className="">
          {loading ? (
            <img src="/uploading.gif" alt="" className="mx-auto w-[300px]" />
          ) : (
            <img src={image?.value} alt="" className="w-[300px]" />
          )}
          <form
            className="flex flex-col justify-center items-center w-full mt-2"
            onChange={(e) => {
              validationImage(e.target.files[0]);
              hanldeChangeImage(e);
            }}
          >
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
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  validationImage(e.target.files[0]);
                  hanldeChangeImage(e);
                }}
              />
            </label>
            {image.isValid === false && (
              <p className="mt-1  mb-2 text-xs text-red-600 dark:text-red-500">
                {image.errors}
              </p>
            )}
          </form>
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
                  value={firstName?.value}
                  onChange={(e) =>
                    dispatchFirstName({ type: "notEmpty", val: e.target.value })
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
                  type="text"
                  value={lastName?.value}
                  onChange={(e) =>
                    dispatchLastName({ type: "notEmpty", val: e.target.value })
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
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  userName
                </label>
                <input
                  className={`appearance-none block w-full  text-gray-700 border   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow ${
                    userName.isValid === false
                      ? "bg-red-50 border border-red-500"
                      : ""
                  }`}
                  id="userName"
                  type="text"
                  value={userName?.value}
                  onChange={(e) =>
                    dispatchUserName({ type: "notEmpty", val: e.target.value })
                  }
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
                  htmlFor="grid-password"
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
                  value={email?.value}
                  onChange={(e) =>
                    dispatchEmail({ type: "email", val: e.target.value })
                  }
                />
                {email?.isValid === false && (
                  <p className="mt-0  mb-2 text-xs text-red-600 dark:text-red-500">
                    {email?.errors}
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
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="password"
                  placeholder="******************"
                  autoComplete="false"
                  onChange={(e) =>
                    dispatchPassword({ type: "fillData", val: e.target.value })
                  }
                />
                <p className="text-gray-600 text-xs italic">
                  Fill this field if you want to change the password
                </p>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  checked={isAdmin}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label
                  htmlFor="link-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Is Admin
                </label>
              </div>
            </div>
            <div className="text-right">
              <button className="button" onClick={handleSubmit}>
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditUser;
