import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

const useCurrentUser = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${backendBaseUrl}/api/v1/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(res.data.user));
      } catch (error) {
         dispatch(setUserData(null)); 
      }
    }

    fetchUser();
  }, []);
};

export default useCurrentUser;
