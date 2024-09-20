import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: null,
  role: "member",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      (state.isLoggedIn = true), (state.userData = action.payload.userData);
      state.role = action.payload.role;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      (state.token = null), (state.userData = null);
    },
  },
});
export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
