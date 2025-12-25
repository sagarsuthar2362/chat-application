import axios from "axios";
import React, { useEffect } from "react";
import { backendBaseUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedUser) return;

    async function fetchMessages() {
      try {
        const res = await axios.get(
          `${backendBaseUrl}/api/v1/message/get/${selectedUser._id}`,
          {
            withCredentials: true,
          }
        );
        console.log(res);
        dispatch(setMessages(res.data?.conversation?.messages));
      } catch (error) {
        console.log(error);
      }
    }

    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessages;
