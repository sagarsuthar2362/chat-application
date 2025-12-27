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

const MessageReceiver = ({ message, time }) => {
  return (
    <div className="bg-zinc-800 text-white shadow-xl p-3 w-fit rounded-b-lg rounded-tr-lg">
      <p>{message}</p>
      <span className="text-xs flex justify-start"> {formatTime(time)}</span>
    </div>
  );
};

export default MessageReceiver;
