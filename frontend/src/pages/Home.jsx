import { LogOut } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers, setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";
import useGetMessages from "../customHooks/useGetMessages";
import useGetAllUsers from "../customHooks/useGetAllUsers";
const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;


const Home = () => {
  useGetAllUsers();

  const { userData, otherUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (userData === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <MessageArea />
    </div>
  );
};

export default Home;
