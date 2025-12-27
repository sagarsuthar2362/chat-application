import React from "react";

const formatTime = (time) => {
  if (!time) return "";

  const date = new Date(time);

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const MessageSender = ({ message, time }) => {
  return (
    <div className="self-end bg-gray-100 shadow-md p-3 rounded-b-lg rounded-tl-lg">
      <p>{message}</p>
      <span className="text-xs flex justify-end"> {formatTime(time)}</span>
    </div>
  );
};

export default MessageSender;
