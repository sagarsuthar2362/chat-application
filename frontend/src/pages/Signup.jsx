import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post(
        `${backendBaseUrl}/api/v1/user/signup`,
        {
          name,
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(res.data));
      navigate("/profile");
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
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join us and start chatting</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="outline-none border border-gray-300 rounded-md font-medium p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="outline-none border border-gray-300 rounded-md font-medium p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="outline-none border border-gray-300 rounded-md font-medium p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
            className="outline-none border border-gray-300 rounded-md font-medium p-2 w-full"
          />
        </div>

        <button className="bg-gradient-to-r from-zinc-600 to-zinc-900 text-white px-8 py-2 rounded-md cursor-pointer w-full">
          Submit
        </button>

        <div className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
