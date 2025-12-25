import React from "react";
import { LogOut } from "lucide-react";
import {
  setOtherUsers,
  setSelectedUser,
  setUserData,
} from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { backendBaseUrl } from "../main";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, otherUsers, selectedUser } = useSelector(
    (state) => state.user
  );

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${backendBaseUrl}/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(setUserData(null));
        dispatch(setOtherUsers(null));
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (userData === null || otherUsers === null) {
    return <h1>Loading...</h1>;
  }
  return (
    <div
      className={`lg:w-[400px] w-full h-full bg-gray-200 ${
        selectedUser ? "hidden lg:block" : "block"
      }`}
    >
      <button
        className="flex items-center gap-3 bg-red-500 px-5 py-2 rounded-lg mt-6 ml-4 cursor-pointer text-white font-semibold hover:bg-red-600 transition-all duration-150"
        onClick={handleLogout}
      >
        <LogOut /> Logout
      </button>

      <div className="mt-20 p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">BaatCheet</h1>

          <h2 className="text-zinc-700 text-xl font-bold">
            Namaste, {userData.name}
          </h2>
        </div>

        <Link to={"/profile"}>
          <img
            src={userData.image || "person.png"}
            alt=""
            className="h-18 w-18 rounded-full object-cover"
          />
        </Link>
      </div>

      <hr />

      <div>
        {otherUsers.map((user) => (
          <div
            className="flex items-center gap-3 border-b cursor-pointer py-2"
            onClick={() => dispatch(setSelectedUser(user))}
          >
            <img
              src={user.image || "person.png"}
              alt={`${user.name}'s image`}
              className="lg:h-16 lg:w-16 h-12 w-12 rounded-full object-cover"
            />
            <h2 className="lg:text-lg font-medium">{user.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
