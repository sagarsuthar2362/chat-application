import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;
import { MessageCircle } from "lucide-react";

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
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-zinc-600 to-zinc-900 rounded-2xl mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue chatting</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="outline-none border border-gray-300 rounded-md font-medium px-4 py-3 w-full"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
            className="outline-none border border-gray-300 rounded-md font-medium px-4 py-3 w-full"
          />
        </div>

        <button
          className="text-white px-8 py-2 rounded-md cursor-pointer bg-gradient-to-r from-zinc-600 to-zinc-900 w-full"
          type="submit"
        >
          Submit
        </button>

        <div className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
