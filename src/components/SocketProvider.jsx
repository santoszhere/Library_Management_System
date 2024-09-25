import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import socketio from "socket.io-client";
import { disconnectSocket, setSocket } from "../store/slices/socketSlice";

const getSocket = () => {
  return socketio("http://localhost:5000", {
    withCredentials: true,
  });
};

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = getSocket();
    dispatch(setSocket(socket));

    return () => {
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default SocketProvider;
