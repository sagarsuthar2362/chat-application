import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useCurrentUser from "./customHooks/useCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { addMessage, setMessages } from "./redux/messageSlice";
import { setActiveUsers } from "./redux/userSlice";
import { socket } from "./socket";
const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  useCurrentUser();
  const { userData, loading } = useSelector((state) => state.user);
  const { messageList } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?._id) {
      socket.io.opts.query = { userId: userData._id };
      socket.connect();

      socket.on("receive-message", (newMessage) => {
        dispatch(addMessage(newMessage));
      });

      socket.on("active-users", (users) => {
        dispatch(setActiveUsers(users));
      });

      return () => {
        socket.off("receive-message");
        socket.off("active-users");
        socket.disconnect();
      };
    }
  }, [userData]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={userData !== null ? <Home /> : <Navigate to={"/login"} />}
      />

      <Route
        path="/profile"
        element={userData !== null ? <Profile /> : <Navigate to={"/login"} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
