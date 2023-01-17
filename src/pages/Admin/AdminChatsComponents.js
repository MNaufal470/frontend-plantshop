import React, { useEffect, useState } from "react";
const AdminChatsComponents = ({ roomIndex, socketUser, room, socket }) => {
  [window["toast" + roomIndex], window["closeToast" + roomIndex]] =
    useState(true);
  const [rerender, setRerender] = useState(false);
  const [chat, setChat] = useState(room);
  const close = () => {
    window["closeToast" + roomIndex](false);
    socket.emit("admin closes chat", socketUser);
  };
  let show = "toast" + roomIndex;

  const handleSubmit = (e, elem) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    const msg = document.getElementById("chat" + roomIndex);
    let isEmpty = msg.value.trim();
    if (isEmpty === "" || isEmpty === null || isEmpty === false || !isEmpty) {
      return;
    }
    setChat([...chat, { admin: msg.value }]);
    socket.emit("admin sends message", {
      user: socketUser,
      message: msg.value,
    });
    msg.focus();
    setRerender(!rerender);
    setTimeout(() => {
      msg.value = "";
      const chatMessages = document.querySelector(`.cht-msg${socketUser}`);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 200);
  };

  useEffect(() => {
    if (chat.length > 1) {
      setChat([...chat, room[room.length - 1]]);
    }
  }, [room]);

  useEffect(() => {
    const chatMessages = document.querySelector(`.cht-msg${socketUser}`);
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
  });
  return (
    <div>
      {show ? (
        <div className=" relative bg-white shadow-2xl rounded-lg w-72 m-10">
          <div className="py-5 bg-[#3e6553] rounded-t-lg text-center">
            <h1 className="text-white">
              Chat With Naufal <i className="ri-leaf-line text-white"></i>
            </h1>
          </div>
          <div
            className={`p-5 space-y-4 overflow-y-scroll  h-96 cht-msg${socketUser}`}
          >
            {chat.map((msg, index) => {
              if (msg.client) {
                return (
                  <p
                    key={index}
                    className="text-sm border border-[#3e6553] rounded-lg text-black font-bold text-right py-2 pr-3"
                  >
                    User Wrote :<br />{" "}
                    <span className="font-light">{msg.client}</span>
                  </p>
                );
              } else if (msg.admin) {
                return (
                  <p
                    key={index}
                    className="text-sm pb-1.5 border-b border-gray-300"
                  >
                    You Wrote: {msg.admin}
                  </p>
                );
              }
              return null;
            })}
          </div>
          <form>
            <label htmlFor="chat" className="sr-only">
              Your message
            </label>
            <div
              className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700"
              id={`adminChatMsg${roomIndex}`}
            >
              <textarea
                id={`chat${roomIndex}`}
                rows="1"
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-[#3e6553] dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                placeholder="Your message..."
                onKeyUp={(e) => handleSubmit(e, `adminChatMsg${roomIndex}`)}
              ></textarea>
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-[#3e6553] rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                onClick={(e) => handleSubmit(e, `adminChatMsg${roomIndex}`)}
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 rotate-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
          <div
            className="absolute -right-3 -top-3  border bg-white border-red-500 rounded-full  px-1.5 shadow-2xl cursor-pointer hover:bg-red-300"
            onClick={close}
          >
            <i className="ri-close-line text-red-500 text-xl"></i>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default AdminChatsComponents;
