import { createSlice } from "@reduxjs/toolkit";
import socketio from "socket.io-client";

// Function to establish a socket connection without authentication
const getSocket = () => {
  // Create a socket connection with the provided URI
  // import.meta.env.VITE_SOCKET_URI
  return socketio("http://localhost:5000", {
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

// Thunk to initialize the socket
export const initializeSocket = () => (dispatch) => {
  const socket = getSocket();
  dispatch(setSocket(socket));
};

// Export actions and reducer
export const { setSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
