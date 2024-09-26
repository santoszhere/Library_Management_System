import { createSlice } from "@reduxjs/toolkit";
import socketio from "socket.io-client";

const getSocket = () => {
  console.log(import.meta.env.VITE_SOCKET_URL, "SOCKET URL");
  console.log(import.meta.env.VITE_BASE_URL, "BASE URL");
  return socketio(import.meta.env.VITE_SOCKET_URL, {
    withCredentials: true,
  });
};

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
  },
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload;
    },
    disconnectSocket(state) {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
      }
    },
  },
});

export const initializeSocket = () => (dispatch) => {
  const socket = getSocket();
  dispatch(setSocket(socket));
};

export const { setSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
