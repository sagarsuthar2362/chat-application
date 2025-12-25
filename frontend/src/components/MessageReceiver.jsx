import React from "react";

const MessageReceiver = ({ message }) => {
  return (
    <div className="bg-zinc-800 text-white shadow-xl p-3 w-fit rounded-b-lg rounded-tr-lg">
      <p>{message}</p>
    </div>
  );
};

export default MessageReceiver;
