import axios from "axios";
import React from "react";
import { backendBaseUrl } from "../main";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await axios.post(
        `${backendBaseUrl}/api/v1/user/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      if (res.status === 200 && res.data.token) {
        dispatch(setUserData(res.data.checkUserExists));
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        className="px-5 py-8 rounded-lg shadow-xl md:w-[400px] space-y-3 border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold">Login</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className="outline-none border border-gray-300 rounded-md font-medium p-2 w-full"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          required
          className="outline-none border border-gray-300 rounded-md font-medium p-2 w-full"
        />

        <button className="bg-zinc-900 text-white px-8 py-2 rounded-md cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
