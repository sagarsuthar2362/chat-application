import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getUserSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    const { message } = req.body;

    const checkConversationExists = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    const newMessage = await Message.create({
      sender,
      receiver,
      message,
    });

    if (checkConversationExists) {
      checkConversationExists.messages.push(newMessage._id);
      await checkConversationExists.save();
    } else {
      const newConversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id],
      });
    }
    const receiverSocketId = getUserSocketId(receiver);
    console.log("receiver socket id is:", receiverSocketId);
    io.to(receiverSocketId).emit("receive-message", newMessage);
    return res.status(200).json({ message: "message sent succesfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", from: "send Message" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");

    return res.status(200).json({ conversation });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error at get messages" });
  }
};
