import React, { useEffect, useReducer, useRef, useState } from "react";
import { formReducer } from "../../utils/validationInputs";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const AdminEditCategory = () => {
  const [attrInput, setAttrInput] = useState([]);
  const [attrInputTable, setAttrInputTable] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [colorPicker, setColorPicker] = useState("#000");
  const [imageChanged, setimageChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const attrKeyRef = useRef();
  const attrValRef = useRef();
  const colorRef = useRef();
  const nameColor = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, dispatchCategory] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const [image, dispatchImage] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const handleAddAnotherAttr = () => {
    let object = {
      key: "",
      value: "",
      id: Math.random(),
    };
    setAttrInput([...attrInput, object]);
    setshowButton(false);
  };
  const handleAddColorAttr = () => {
    let object = {
      key: "Color",
      value: {
        name: "",
        color: "",
      },
      id: Math.random(),
    };
    setAttrInput([...attrInput, object]);
    setshowButton(false);
  };
  const handleRemoveAnotherAttr = (id) => {
    let filter = attrInput.filter((item) => item.id !== id);
    setAttrInput(filter);
    setshowButton(true);
  };

  const addAttrInputHandler = () => {
    const keyAttr = attrKeyRef.current.value;
    const valueAttr = attrValRef.current.value;
    setAttrInputTable((state) => {
      if (state.length === 0) {
        return [{ key: keyAttr, value: [valueAttr] }];
      }
      let existedKey = false;
      let modeifiedTable = state.map((att) => {
        if (att.key === keyAttr) {
          existedKey = true;
          att = { ...att, value: [...att.value, valueAttr] };
          return att;
        } else {
          return att;
        }
      });
      if (existedKey === true) {
        return [...modeifiedTable];
      } else {
        return [...state, { key: keyAttr, value: [valueAttr] }];
      }
    });
    setAttrInput([]);
    setshowButton(true);
  };

  const removeValue = (key, value) => {
    setAttrInputTable((state) => {
      let existedKey = false;
      let modeifiedTable = state.map((att) => {
        if (att.key === key) {
          existedKey = true;
          att = { ...att, value: att.value.filter((item) => item !== value) };
          return att;
        } else {
          return att;
        }
      });
      return [...modeifiedTable];
    });
  };
  const removeKey = (key) => {
    setAttrInputTable(attrInputTable.filter((item) => item.key !== key));
  };

  const handleEditCategory = async (formInputs) => {
    const { data } = await axios.put(
      `${process.env.REACT_APP_PLANT}/api/categories/` + id,
      formInputs
    );
    return data;
  };

  const handleSubmmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (category.isValid) {
      let formInputs = {
        name: categoryRef.current.value,
        attrs: attrInputTable,
      };
      handleEditCategory(formInputs)
        .then((res) => navigate("/admin/category", { replace: true }))
        .catch((err) =>
          dispatchCategory({ type: "errors", errorMessage: err.response.data })
        );
    } else {
      dispatchCategory({ type: "notEmpty", val: categoryRef.current.value });
      dispatchImage({
        type: "uploadImage",
        required: true,
        mime: imageRef?.current?.files[0]?.type,
        size: imageRef?.current?.files[0]?.size,
        val: imageRef?.current?.files,
      });
    }
  };

  const fetchCategory = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_PLANT}/api/categories/` + id
    );
    return data;
  };

  const hanlderApiImage = async (images) => {
    const formImage = new FormData();
    Array.from(images).forEach((img) => {
      formImage.append("images", img);
    });
    const { data } = await axios.put(
      "/api/categories/image/upload/" + id,
      formImage
    );

    return data;
  };

  const cloudinaryEditImage = (img) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = async () => {
      const data = await axios
        .put(
          `${process.env.REACT_APP_PLANT}/api/categories/image/upload/edit/` +
            id,
          {
            images: reader.result,
          }
        )
        .then((res) => {
          setimageChanged(!imageChanged);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
      return data;
    };
  };

  const hanldeChangeImage = async (e) => {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();
    dispatchImage({
      type: "uploadImage",
      mime: e.target.files[0].type,
      size: e.target.files[0].size,
      val: e.target.files[0],
    });
    // Cloudinary
    if (e.target.files[0].size < 1048576) {
      cloudinaryEditImage(e.target.files[0]);
    } else {
      setLoading(false);
    }

    // hanlderApiImage(e.target.files)
    //   .then((res) => {
    //     dispatchImage({
    //       type: "uploadImage",
    //       mime: e.target.files[0].type,
    //       size: e.target.files[0].size,
    //       val: res,
    //     });
    // setLoading(false);
    //   })
    //   .then((res) => setimageChanged(!imageChanged))
    //   .catch((err) =>
    //     dispatchImage({
    //       type: "errors",
    //       errorMessage: err.response.data,
    //     })
    //   );
  };
  const handleAddColor = () => {
    let colorName = nameColor.current.value;
    let value = [`${colorName}@${colorPicker}`];
    setAttrInputTable((state) => {
      let existed = false;
      let modifiedTable = state.map((att) => {
        if (att?.key === "color") {
          existed = true;
          att = { ...att, value: [...att.value, value] };
          return att;
        } else {
          return att;
        }
      });
      if (existed) {
        return [...modifiedTable];
      } else {
        return [...state, { key: "color", value: [value] }];
      }
    });
    setAttrInput([]);
    setshowButton(true);
  };
  useEffect(() => {
    fetchCategory().then((res) => {
      setAttrInputTable(res.attrs);
      dispatchCategory({ type: "fillData", val: res.name });
      dispatchImage({ type: "fillData", val: res.image });
    });
  }, [id, imageChanged]);

  return (
    <div className="w-full h-screen overflow-y-scroll pb-20">
      <div className="pt-[61px] border-b-2 border-gray-300 w-full" />
      <div className="flex gap-x-20 justify-center mt-10">
        <div className="">
          <form
            className="flex flex-col justify-center items-center w-full mt-2"
            onChange={hanldeChangeImage}
          >
            {loading ? (
              <img src="/uploading.gif" alt="" className="mx-auto w-[300px]" />
            ) : (
              <img src={image?.value} alt="" className="w-[300px]" />
            )}
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

                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 ">
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
                onChange={hanldeChangeImage}
                ref={imageRef}
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
          <form className="w-full max-w-lg" onSubmit={handleSubmmit}>
            <div className="flex flex-wrap -mx-3 mb-6 ">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Category Name
                </label>
                <input
                  className={`appearance-none block w-full ${
                    category.isValid === false
                      ? "bg-red-50 border-red-500"
                      : "bg-gray-200 border-gray-200"
                  }  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none  `}
                  id="nameCategory"
                  type="text"
                  ref={categoryRef}
                  value={category.value}
                  onChange={(e) =>
                    dispatchCategory({
                      type: "notEmpty",
                      val: e.target.value,
                    })
                  }
                />
                {category.isValid === false && (
                  <p className="mt-1 mb-0 text-sm text-red-600 dark:text-red-500">
                    {category.errors}
                  </p>
                )}
              </div>
            </div>
            {attrInputTable.length > 0 && (
              <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                <div className="w-full px-3">
                  <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="py-3 px-6">
                            Attribute name
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Atrribute Value
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {attrInputTable.length > 0 &&
                          attrInputTable?.map((attr, i) => (
                            <tr
                              className="relative bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                              key={i}
                            >
                              <th
                                scope="row"
                                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {attr?.key}
                              </th>
                              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {attr?.value.map((val) => {
                                  if (attr?.key !== "color") {
                                    return (
                                      attr?.key !== "color" && (
                                        <p
                                          key={val}
                                          className="mx-2 flex items-center gap-x-2 justify-center"
                                        >
                                          {val}
                                          {attr?.value.length > 1 && (
                                            <i
                                              className="ri-close-circle-line text-[#dc143c] text-xl cursor-pointer"
                                              onClick={() =>
                                                removeValue(attr?.key, val)
                                              }
                                            ></i>
                                          )}
                                        </p>
                                      )
                                    );
                                  } else {
                                    let array = val[0].split("@");
                                    return (
                                      <p
                                        key={val}
                                        className="mx-2 flex items-center gap-x-2 justify-center"
                                      >
                                        {array[0]}
                                        <i
                                          style={{ background: array[1] }}
                                          className={`w-5 h-5 ${
                                            array[1]?.includes("#ffff")
                                              ? "border-[1px] border-black"
                                              : ""
                                          } rounded-full`}
                                        ></i>
                                        {attr?.value?.length > 1 && (
                                          <i
                                            className="ri-close-circle-line text-[#dc143c] text-xl cursor-pointer"
                                            onClick={() =>
                                              removeValue(attr?.key, val)
                                            }
                                          ></i>
                                        )}
                                      </p>
                                    );
                                  }
                                })}
                              </td>
                              <td className="absolute right-1 top-1/2 translate-y-[-50%]">
                                <i
                                  className="ri-close-circle-line text-[#dc143c] text-xl cursor-pointer"
                                  onClick={() => removeKey(attr?.key)}
                                ></i>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {attrInput.map((attr, i) => {
              if (attr.key !== "Color") {
                return (
                  <div
                    className="relative flex flex-wrap -mx-3 mb-6"
                    key={attr.id}
                  >
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                      >
                        Category Atribute
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        ref={attrKeyRef}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        Attribute Value
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="text"
                        ref={attrValRef}
                      />
                    </div>
                    <div className="w-full px-3 flex justify-end">
                      <button
                        className="button"
                        type="button"
                        onClick={addAttrInputHandler}
                      >
                        Add
                      </button>
                    </div>
                    <div className="absolute right-0 top-0">
                      <i
                        className="ri-close-circle-line  text-[#dc143c] text-xl cursor-pointer"
                        onClick={(e) => handleRemoveAnotherAttr(attr.id)}
                      ></i>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="relative flex flex-wrap -mx-3 mb-6 "
                    key={attr.id}
                  >
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                      >
                        Color Name
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        ref={nameColor}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        Attribute Color
                      </label>
                      <DebounceInput
                        type="color"
                        className="appearance-none block w-full"
                        ref={colorRef}
                        value={colorPicker}
                        debounceTimeout={500}
                        onChange={(e) => setColorPicker(e.target.value)}
                      />
                    </div>
                    <div className="w-full flex justify-end ">
                      <button
                        className="button"
                        type="button"
                        onClick={handleAddColor}
                      >
                        Add
                      </button>
                    </div>
                    <div className="absolute right-0 top-0">
                      <i
                        className="ri-close-circle-line  text-[#dc143c] text-xl cursor-pointer"
                        onClick={(e) => handleRemoveAnotherAttr(attr.id)}
                      ></i>
                    </div>
                  </div>
                );
              }
            })}
            {showButton && (
              <div className="flex gap-x-4 mb-20">
                <button
                  type="button"
                  className="py-4 px-5 bg-[#00008b] text-white rounded text-xs"
                  onClick={handleAddColorAttr}
                >
                  Add Attributes Color
                </button>
                <button
                  type="button"
                  className="py-4 px-5 bg-[#00008b] text-white rounded text-xs"
                  onClick={handleAddAnotherAttr}
                >
                  Add New Attributes
                </button>
              </div>
            )}
            <div className="text-right">
              <button className="button" type="submit" onClick={handleSubmmit}>
                Update Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditCategory;
