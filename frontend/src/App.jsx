import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useCurrentUser from "./customHooks/useCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/Profile";
import useGetAllUsers from "./customHooks/useGetAllUsers";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { backendBaseUrl } from "./main";
import { addMessage, setMessages } from "./redux/messageSlice";

const App = () => {
  useCurrentUser();
  useGetAllUsers();
  const { userData } = useSelector((state) => state.user);
  const { messageList } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io(`${backendBaseUrl}`, {
      query: { userId: userData?._id },
    });

    socket.on("receive-message", (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    return () => {
      socket.disconnect();
    };
  }, [userData]);

  return (
    <Routes>
      <Route
        path="/"
        element={userData !== "null" ? <Home /> : <Navigate to={"/login"} />}
      />

      <Route
        path="/profile"
        element={userData !== "null" ? <Profile /> : <Navigate to={"/login"} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
