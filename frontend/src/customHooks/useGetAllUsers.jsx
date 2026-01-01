import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setOtherUsers } from "../redux/userSlice";
const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

const useGetAllUsers = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${backendBaseUrl}/api/v1/user/all`, {
          withCredentials: true,
        });
        dispatch(setOtherUsers(res.data.users));
      } catch (error) {
        console.log(error);
      }
    }

    if (userData) {
      fetchUser();
    }
  }, [userData, dispatch]);
};

export default useGetAllUsers;
