import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminChatsComponents from "./AdminChatsComponents";

const AdminChats = () => {
  const { chatRooms, socket } = useSelector((state) => state.chat);
  return (
    <div className="w-full h-screen overflow-y-scroll pb-20">
      <div className="pt-[61px] border-b-2 border-gray-300 w-full" />
      <div className="grid grid-cols-3">
        {Object.entries(chatRooms).map((chat, index) => {
          let room = [...chat[1]];
          return (
            <AdminChatsComponents
              key={index}
              roomIndex={index + 1}
              socketUser={chat[0]}
              room={room}
              socket={socket}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminChats;
