import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AttributeFilter = ({ attrFromFilter, setAttrFromFilter }) => {
  const [attrFilter, setAttrFilter] = useState([]);
  const { category } = useParams() || "";
  const { categories } = useSelector((state) => state.categories);

  const addFilter = (e, keyAtrr, valAttr) => {
    setAttrFromFilter((items) => {
      if (items.length === 0) return [{ key: keyAtrr, value: [valAttr] }];
      let index = items.findIndex((x) => x.key === keyAtrr);
      if (index === -1) return [...items, { key: keyAtrr, value: [valAttr] }];
      if (e.target.checked) {
        items[index].value.push(valAttr);
        let unique = [...new Set(items[index].value)];
        items[index].value = unique;
        return [...items];
      }
      let valuesUnChecked = items[index].value.filter((val) => val !== valAttr);
      items[index].value = valuesUnChecked;
      if (valuesUnChecked.length > 0) {
        return [...items];
      } else {
        let filterWithoutOneKey = items.filter((x) => x.key !== keyAtrr);
        return [...filterWithoutOneKey];
      }
    });
  };

  useEffect(() => {
    if (category) {
      let categoryData = categories.find(
        (item) => item?.name?.replace(" ", "-") === category
      );
      setAttrFilter(categoryData?.attrs);
    } else {
      setAttrFilter([]);
    }
  }, [category, categories]);

  return (
    <div className="flex flex-col gap-y-10">
      {attrFilter?.map((item, i) => {
        if (item.key === "color") {
          return (
            <div key={item._id}>
              <h1 className="font-bold">Color</h1>
              <div className="mt-5 flex flex-col gap-y-3">
                {item.value.map((val, i) => (
                  <div className="flex justify-between items-center " key={i}>
                    <div className="flex items-center gap-x-1.5 text-sm hover:text-black ">
                      <div
                        className={`w-5 h-5 rounded-full ${
                          val[0].split("@")[1].includes("#fff")
                            ? "border-[1px] border-black"
                            : ""
                        } `}
                        style={{ backgroundColor: val[0].split("@")[1] }}
                      />
                      <span>{val[0].split("@")[0]}</span>
                    </div>
                    <input
                      type="checkbox"
                      className="cursor-pointer w-4 h-4 "
                      onChange={(e) => addFilter(e, item.key, val)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          return (
            <div key={item._id}>
              <h1 className="font-bold capitalize">{item.key}</h1>
              <div className="mt-5 flex flex-col gap-y-3">
                {item.value.map((val, i) => (
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    key={i}
                  >
                    <div className="flex items-center gap-x-1.5 text-sm hover:text-black ">
                      <span className="capitalize">{val}</span>
                    </div>
                    <input
                      className="cursor-pointer w-4 h-4 "
                      type="checkbox"
                      onChange={(e) => addFilter(e, item.key, val)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default AttributeFilter;
