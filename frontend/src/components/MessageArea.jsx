import { MoveLeftIcon, Send, SmilePlus } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSelectedUser } from "../redux/userSlice";
import useGetMessages from "../customHooks/useGetMessages";
import MessageSender from "./MessageSender";
import MessageReceiver from "./MessageReceiver";
import axios from "axios";
import { backendBaseUrl } from "../main";
import { useState } from "react";
import { setMessages } from "../redux/messageSlice";

const MessageArea = () => {
  useGetMessages();
  const { selectedUser, userData } = useSelector((state) => state.user);
  const { messageList } = useSelector((state) => state.message);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.trim() === "") return;

    try {
      const res = await axios.post(
        `${backendBaseUrl}/api/v1/message/send/${selectedUser._id}`,
        { message },
        { withCredentials: true }
      );
      setMessage("");
      dispatch(
        setMessages([...messageList, { sender: userData._id, message }])
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (selectedUser === null) {
    return (
      <div
        className={` ${
          selectedUser ? "flex" : "hidden lg:flex"
        } flex-col h-full w-full  items-center justify-center`}
      >
        <h1 className="text-4xl font-semibold">Welcome to Baat Cheet</h1>
        <p>Chat with friends...</p>
      </div>
    );
  }
  return (
    <div className={`relative ${selectedUser ? "flex-1" : "hidden"}`}>
      <div className="bg-zinc-900 text-white h-20 flex items-center px-8 gap-6">
        <MoveLeftIcon
          className="cursor-pointer"
          onClick={() => dispatch(setSelectedUser(null))}
        />
        <div className="flex items-center gap-7">
          <img
            src={selectedUser.image || "person.png"}
            alt=""
            className="bg-white lg:h-14 lg:w-14 h-10 w-10 rounded-full object-cover"
          />
          <h1 className="lg:text-2xl lg:font-semibold">{selectedUser.name}</h1>
        </div>
      </div>

      <div className="h-full flex flex-col gap-4 p-4">
        {messageList?.map((m) =>
          m.sender === userData._id ? (
            <MessageSender message={m.message} />
          ) : (
            <MessageReceiver message={m.message} />
          )
        )}
      </div>

      <div className="fixed bottom-0 w-full bg-gray-200 lg:h-16 h-14 flex items-center lg:px-5 px-2 gap-2">
        <div className="cursor-pointer">
          <SmilePlus className="h-[25px] w-[25px]" />
        </div>

        <form
          className="flex justify-between w-[50%] gap-2"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            name="message"
            placeholder="Message"
            className="p-2 flex-1 outline-none"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button className="cursor-pointer">
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageArea;
