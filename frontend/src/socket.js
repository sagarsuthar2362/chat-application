import { io } from "socket.io-client";

const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

export const socket = io(backendBaseUrl, {
  autoConnect: false,
  withCredentials: true,
});
