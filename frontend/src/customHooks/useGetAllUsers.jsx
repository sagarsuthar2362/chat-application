import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setOtherUsers } from '../redux/userSlice';
const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

const useGetAllUsers = () => {
  const dispatch = useDispatch();
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

    fetchUser();
  }, []);
};

export default useGetAllUsers