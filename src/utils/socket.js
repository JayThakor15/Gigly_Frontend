import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  //web socket
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
