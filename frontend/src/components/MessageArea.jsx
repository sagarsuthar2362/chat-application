import { MoveLeftIcon, Send, SmilePlus } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeTypingUser,
  setSelectedUser,
  setTypingUser,
} from "../redux/userSlice";
import useGetMessages from "../customHooks/useGetMessages";
import MessageSender from "./MessageSender";
import MessageReceiver from "./MessageReceiver";
import axios from "axios";
import { useState } from "react";
import { setMessages } from "../redux/messageSlice";
import EmojiPicker from "emoji-picker-react";
import { socket } from "../socket";
const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

const MessageArea = () => {
  useGetMessages();
  const { selectedUser, userData, activeUsers, typingUsers } = useSelector(
    (state) => state.user
  );
  const { messageList } = useSelector((state) => state.message);
  const [message, setMessage] = useState("");
  const [emojiPicker, setshowEmojiPicker] = useState(false);
  const dispatch = useDispatch();
  const typingTimeoutRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    socket.on("user-typing", (typingUserId) => {
      dispatch(setTypingUser(typingUserId));
    });

    socket.on("user-stop-typing", (id) => {
      dispatch(removeTypingUser(id));
    });

    return () => {
      socket.off("user-typing");
      socket.off("user-stop-typing");
    };
  }, [selectedUser, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messageList, typingUsers]);

  const handleTyping = (e) => {
    setMessage(e.target.value);

    socket.emit("typing", {
      senderId: userData._id,
      receiverId: selectedUser._id,
    });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing", {
        senderId: userData._id,
        receiverId: selectedUser._id,
      });
    }, 3000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.trim() === "") return;

    socket.emit("typing", {
      senderId: userData._id,
      receiverId: selectedUser._id,
    });

    try {
      const res = await axios.post(
        `${backendBaseUrl}/api/v1/message/send/${selectedUser._id}`,
        { message },
        { withCredentials: true }
      );
      setMessage("");
      dispatch(
        setMessages([
          ...messageList,
          { sender: userData._id, message, createdAt: new Date() },
        ])
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
    <div className="flex flex-col justify-between flex-1 h-full">
      {/* msg area header */}
      <div className="bg-zinc-900 text-white h-20 flex items-center px-6 gap-4 sticky top-0 z-10">
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
          <div>
            <h1 className="lg:text-2xl lg:font-semibold">
              {selectedUser.name}
            </h1>
            {activeUsers?.includes(selectedUser._id) && (
              <span className="text-sm font-medium text-green-300">online</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 overflow-y-auto h-full">
        {messageList !== null &&
          messageList?.map((m) =>
            m.sender === userData._id ? (
              <MessageSender
                message={m.message}
                time={m.createdAt}
                key={m._id}
              />
            ) : (
              <MessageReceiver
                message={m.message}
                time={m.createdAt}
                key={m._id}
              />
            )
          )}

        {/* Messages list ke thik niche */}
        {typingUsers.includes(selectedUser._id) && (
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
            <p className="text-xs italic text-gray-500">
              {selectedUser.name} is typing...
            </p>
          </div>
        )}

        <div ref={scrollRef}></div>
      </div>

      <div className="border-t border-t-gray-300 bg-gray-200 lg:h-16 h-18 flex items-center justify-between lg:px-5 px-2 gap-2">
        <div className="cursor-pointer">
          <SmilePlus
            className="h-[25px] w-[25px]"
            onClick={() => setshowEmojiPicker(!emojiPicker)}
          />
        </div>

        {emojiPicker && (
          <div className="absolute bottom-16">
            <EmojiPicker
              height={350}
              width={300}
              onEmojiClick={(e) => {
                setMessage(message + e.emoji);
                setshowEmojiPicker(false);
              }}
            />
          </div>
        )}

        <form
          className="flex flex-1 justify-between w-[50%] gap-2"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            name="message"
            placeholder="Message"
            className="p-2 flex-1 outline-none"
            onChange={handleTyping}
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
