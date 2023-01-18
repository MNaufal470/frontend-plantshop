import React, { useEffect, useReducer, useState, useRef } from "react";
import { formReducer } from "../../utils/validationInputs";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const AdminEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [imgRemoved, setImgRemoved] = useState(false);
  const [catgeoriesSelected, dispatchCategoriesSelected] = useReducer(
    formReducer,
    {
      value: "Choose Category",
      isValid: "",
      errors: "",
    }
  );
  const [attrTable, setAttrTable] = useState([]);
  const [attrCategory, setAttrCategory] = useState([]);
  const [attrKey, setAttrKey] = useState("");
  const [attrVal, setAttrVal] = useState("");
  const [choosendAttr, setChoosendAttr] = useState({
    key: "Choose Attribute",
    value: "Choose Attribute Value",
  });
  const [image, dispatchImage] = useReducer(formReducer, {
    value: [],
    isValid: "",
    errors: "",
  });
  const imageRef = useRef();
  const [name, dispatchName] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const nameRef = useRef();
  const [description, dispatchDescription] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const descriptionRef = useRef();
  const [price, dispatchPrice] = useReducer(formReducer, {
    value: "",
    isValid: "",
    errors: "",
  });
  const priceRef = useRef();
  const [stocks, dispatchStocks] = useReducer(formReducer, {
    value: "",
    isValid: "",
  });
  const stocksRef = useRef();

  const categoriesSelectedHandler = (e) => {
    dispatchCategoriesSelected({
      type: "notEmpty",
      val: e.target.value,
    });
    setAttrCategory([]);
    setAttrVal([]);
    let findKey = categories.find((state) => state.name === e.target.value);
    if (findKey) {
      setAttrCategory(findKey.attrs);
    }
  };

  const attrKeyHandler = (e) => {
    let value = attrCategory.find((item) => item.key === e.target.value);
    setAttrVal([]);
    if (value) {
      setChoosendAttr({ key: e.target.value, value: "Choose Attribute Value" });
      setAttrVal(value.value);
    }
  };

  const attrValueChange = (e) => {
    setChoosendAttr({ ...choosendAttr, value: e.target.value });
    setAttrTable((state) => {
      if (state.length === 0) {
        return [{ key: choosendAttr.key, value: [e.target.value] }];
      }
      let existedKey = false;
      let modifiedTable = state.map((attr) => {
        if (attr.key === choosendAttr.key) {
          existedKey = true;
          attr = { ...attr, value: [...attr.value, e.target.value] };
          return attr;
        } else {
          return attr;
        }
      });
      if (existedKey === true) {
        return [...modifiedTable];
      } else {
        return [
          ...state,
          {
            key: choosendAttr.key,
            value: [e.target.value],
          },
        ];
      }
    });
    setChoosendAttr({
      key: "Choose Attribute",
      value: "Choose Attribute value",
    });
    setAttrVal([]);
  };

  const removeValue = (key, value) => {
    setAttrTable((state) => {
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
    setAttrTable(attrTable.filter((item) => item.key !== key));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      image.isValid &&
      name.isValid &&
      description.isValid &&
      price.isValid &&
      stocks.isValid &&
      catgeoriesSelected !== "Choose Category"
    ) {
      let formInputs = {
        name: name.value,
        description: description.value,
        stocks: stocks.value,
        price: price.value,
        category: catgeoriesSelected.value,
        attributesTable: attrTable,
      };
      sendDataToServer(formInputs)
        .then((res) => {
          navigate("/admin/products");
        })
        .catch((err) =>
          dispatchName({ type: "errors", errorMessage: err.response.data })
        );
    } else {
      dispatchImage({
        type: "uploadImage",
        required: true,
        mime: imageRef?.current?.files[0]?.type,
        size: imageRef?.current?.files[0]?.size,
        val: imageRef?.current?.files,
      });
      dispatchName({ type: "notEmpty", val: nameRef.current.value });
      dispatchDescription({
        type: "notEmpty",
        val: descriptionRef.current.value,
      });
      dispatchPrice({ type: "notEmpty", val: priceRef.current.value });
      dispatchStocks({ type: "notEmpty", val: stocksRef.current.value });
      dispatchCategoriesSelected({
        type: "notEmpty",
        val: catgeoriesSelected.value,
        category: true,
      });
    }
  };

  const sendDataToServer = async (formInputs) => {
    const { data } = await axios.put(
      `${process.env.REACT_APP_PLANT}/api/products/` + id,
      formInputs
    );
    return data;
  };

  const addImageHandler = async (e, image) => {
    e.preventDefault();
    e.stopPropagation();
    let formData = new FormData();
    Array.from(image).forEach((img) => {
      formData.append("images", img);
    });
    await axios
      .put(
        `${process.env.REACT_APP_PLANT}/api/products/images/upload/${id}`,
        formData
      )
      .catch((err) =>
        dispatchImage({ type: "errors", errorMessage: err.response.data })
      );
    setImgRemoved(!imgRemoved);
  };

  const cloudinaryUpload = (e, image) => {
    e.preventDefault();
    e.stopPropagation();
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      await axios
        .put(
          `${process.env.REACT_APP_PLANT}/api/products/images/upload/` + id,
          {
            image: reader.result,
          }
        )
        .then((res) => setImgRemoved(!imgRemoved));
    };
  };
  const deleteImageHandler = async (path, cloudID) => {
    // Cloudinary Delete Image
    let pathName = encodeURIComponent(path);
    const { data } = await axios.put(
      `${process.env.REACT_APP_PLANT}/api/products/images/delete/${pathName}/${id}`,
      { cloudID, path }
    );
    setImgRemoved(!imgRemoved);
    return data;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_PLANT}/api/categories`
      );
      return data;
    };
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_PLANT}/api/products/` + id
      );
      return data;
    };

    fetchCategories().then((res) => {
      setCategories(res);
    });

    fetchProduct().then((res) => {
      dispatchName({ type: "fillData", val: res.name });
      dispatchDescription({ type: "fillData", val: res.description });
      dispatchCategoriesSelected({ type: "fillData", val: res.category });
      dispatchImage({ type: "fillData", val: res.images });
      dispatchPrice({ type: "fillData", val: res.price });
      dispatchStocks({ type: "fillData", val: res.stocks });
      setAttrTable(res.attrs);
    });
  }, [imgRemoved]);
  return (
    <div className="w-full h-screen overflow-y-scroll">
      <div className="pt-[61px] border-b-2 border-gray-300 w-full " />
      <div className="flex px-10 pt-10 gap-x-20 pb-20">
        <div className="">
          <div className="w-[400px] grid grid-cols-3 ">
            {image.value.length > 0 &&
              image.value.map((img) => (
                <div className="relative w-[120px] h-[140px]" key={img._id}>
                  <img
                    src={img.path}
                    alt=""
                    className=" object-cover w-full h-full"
                  />
                  <i
                    className="ri-close-circle-line absolute top-[-10px] right-[-5px] text-[#dc143c] text-xl cursor-pointer"
                    onClick={() => deleteImageHandler(img.path, img.cloudID)}
                  ></i>
                </div>
              ))}
          </div>

          <form
            className="flex flex-col justify-center items-center w-[400px] mt-2"
            onChange={(e) => cloudinaryUpload(e, e.target.files[0])}
          >
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col justify-center items-center w-[300px] h-64 bg-gray-50 rounded-lg border-2 ${
                image.isValid === false ? "border-red-500" : "border-gray-300 "
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
                {image.value.length > 0 ? (
                  image.value.map((img, i) => (
                    <p
                      className="text-xs text-gray-500 truncate dark:text-gray-400 mb-1.5 w-[300px]"
                      key={i}
                    >
                      {img.path}
                    </p>
                  ))
                ) : (
                  <>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
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
                onChange={(e) => cloudinaryUpload(e, e.target.files[0])}
                multiple={true}
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
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Product Name
                </label>
                <input
                  className={`appearance-none block w-full ${
                    name.isValid === false
                      ? "bg-red-50 border-red-500"
                      : "bg-gray-200 border-gray-200 mb-3"
                  }  text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none  `}
                  id="email"
                  type="text"
                  value={name.value}
                  onChange={(e) =>
                    dispatchName({ type: "notEmpty", val: e.target.value })
                  }
                  ref={nameRef}
                />
                {name.isValid === false && (
                  <p className="mt-1 mb-2 text-sm font-light text-red-600 dark:text-red-500">
                    {name.errors}
                  </p>
                )}
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Product Description
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border ${
                    description.isValid === false
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }  focus:bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none`}
                  onChange={(e) =>
                    dispatchDescription({
                      type: "notEmpty",
                      val: e.target.value,
                    })
                  }
                  value={description.value}
                  ref={descriptionRef}
                ></textarea>
                {description.isValid === false && (
                  <p className="mt-1 mb-0 text-sm text-red-600 dark:text-red-500">
                    {description.errors}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Price
                </label>

                <input
                  className={`appearance-none block w-full ${
                    price.isValid === false
                      ? "bg-red-50 border-red-500"
                      : "bg-gray-200 border-gray-200 mb-3"
                  }  text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none  `}
                  id="grid-last-name"
                  type="number"
                  onChange={(e) =>
                    dispatchPrice({
                      type: "notEmpty",
                      val: e.target.value,
                    })
                  }
                  ref={priceRef}
                  value={price.value}
                />
                {price.isValid === false && (
                  <p className="mt-1 mb-0 text-sm text-red-600 dark:text-red-500">
                    {price.errors}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Stocks
                </label>

                <input
                  className={`appearance-none block w-full ${
                    stocks.isValid === false
                      ? "bg-red-50 border-red-500"
                      : "bg-gray-200 border-gray-200 mb-3"
                  }  text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none  `}
                  id="grid-last-name"
                  type="number"
                  onChange={(e) =>
                    dispatchStocks({
                      type: "notEmpty",
                      val: e.target.value,
                    })
                  }
                  ref={stocksRef}
                  value={stocks.value}
                />
                {stocks.isValid === false && (
                  <p className="mt-1 mb-0 text-sm text-red-600 dark:text-red-500">
                    {stocks.errors}
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
                  Choose Category
                </label>
                <select
                  id="small"
                  className={`block p-2  w-full text-sm text-gray-900 ${
                    catgeoriesSelected.isValid === false
                      ? "bg-red-50 border-red-500"
                      : "bg-gray-200 border-gray-300"
                  }   focus:bg-white rounded-lg border  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none`}
                  onChange={categoriesSelectedHandler}
                  value={catgeoriesSelected}
                >
                  <option value={catgeoriesSelected.value}>
                    {catgeoriesSelected.value}
                  </option>
                  {categories.map((ctx, i) => {
                    if (ctx.name !== catgeoriesSelected.value) {
                      return (
                        <option value={ctx.name} key={i}>
                          {ctx.name}
                        </option>
                      );
                    } else {
                      return (
                        <option key={i} value="Choose Category">
                          Choose Category
                        </option>
                      );
                    }
                  })}
                </select>
                {catgeoriesSelected.isValid === false && (
                  <p className="mt-1 mb-0 text-sm text-red-600 dark:text-red-500">
                    {catgeoriesSelected.errors}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Choose Attribute
                </label>

                <select
                  id="small"
                  className="block p-2  w-full text-sm text-gray-900 bg-gray-200  focus:bg-white  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none mb-1"
                  onChange={attrKeyHandler}
                  disabled={catgeoriesSelected.value === "Choose Category"}
                  value={choosendAttr.key}
                >
                  <option value="Choose Attribute">Choose Attribute</option>
                  {attrCategory.length > 0 &&
                    attrCategory.map((item, i) => (
                      <option key={i} value={item.key}>
                        {item.key}
                      </option>
                    ))}
                </select>
                <p className="text-gray-600 text-xs italic">
                  Choose Category first
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Choose Attribute Value
                </label>
                <select
                  id="value"
                  className="block p-2  w-full text-sm text-gray-900 bg-gray-200  focus:bg-white  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none mb-1"
                  onChange={attrValueChange}
                  disabled={catgeoriesSelected.value === "Choose Category"}
                  value={choosendAttr.value}
                >
                  <option value="Choose Attribute">Choose Attribute</option>
                  {attrVal.length > 0 &&
                    attrVal.map((item, i) => {
                      let isColor = item[0].includes("@");
                      let array = item[0].split("@");
                      return (
                        <option key={i} value={item}>
                          {isColor ? array[0] : item}
                        </option>
                      );
                    })}
                </select>
                <p className="text-gray-600 text-xs italic">
                  Choose atrribute first
                </p>
              </div>
            </div>

            {attrTable.length > 0 && (
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
                        {attrTable.map((attr, i) => (
                          <tr
                            className="relative bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            key={i}
                          >
                            <th
                              scope="row"
                              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {attr.key}
                            </th>
                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {attr.value.map((val) => {
                                if (attr.key !== "color") {
                                  return (
                                    attr.key !== "color" && (
                                      <p
                                        key={val}
                                        className="mx-2 flex items-center gap-x-2 justify-center"
                                      >
                                        {val}
                                        {attr.value.length > 1 && (
                                          <i
                                            className="ri-close-circle-line text-[#dc143c] text-xl cursor-pointer"
                                            onClick={() =>
                                              removeValue(attr.key, val)
                                            }
                                          ></i>
                                        )}
                                      </p>
                                    )
                                  );
                                } else {
                                  let array = val.split("@");
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
                                      {attr.value.length > 1 && (
                                        <i
                                          className="ri-close-circle-line text-[#dc143c] text-xl cursor-pointer"
                                          onClick={() =>
                                            removeValue(attr.key, val)
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
                                onClick={() => removeKey(attr.key)}
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
            <div className="text-right">
              <button className="button" type="submit" onClick={handleSubmit}>
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
