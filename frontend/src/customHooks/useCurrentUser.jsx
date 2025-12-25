import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;


const useCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${backendBaseUrl}/api/v1/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(res.data.user));
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);
};

export default useCurrentUser;
