import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAction } from "../store/reducers/userReducers";
export default function Dropdown({
  list,
  person = false,
  product = false,
  icon,
  searchTitle,
  setsearchTitle,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button
            className={`inline-flex  justify-center rounded-l-md ${
              !person
                ? "bg-[#3e6553] md:bg-opacity-80 w-full px-4"
                : "w-auto !pr-0"
            }  ${
              product ? "py-4 h-[54px] bg-black" : "py-4"
            } text-sm font-medium text-white hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            {!person ? searchTitle : icon}
            <ChevronDownIcon
              className={`${
                person ? "ml-0" : "ml-2"
              } -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100`}
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {list.length > 0 &&
                list.map((item, i) => (
                  <Menu.Item key={i}>
                    {({ active }) =>
                      item?.link ? (
                        <span
                          className={`${
                            active ? "bg-[#3e6553] text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                          onClick={
                            item.name === "Logout"
                              ? () => {
                                  console.log("logout");
                                  dispatch(userAction.logoutUser());
                                }
                              : () => {
                                  navigate(item.link);
                                }
                          }
                        >
                          {item?.name}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setsearchTitle(item.name)}
                          className={`${
                            active ? "bg-[#3e6553] text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {item.name}
                        </button>
                      )
                    }
                  </Menu.Item>
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
