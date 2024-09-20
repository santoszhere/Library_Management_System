import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import searchSlice from "./slices/searchSlice";

const rootReducer = combineReducers({
  user: authSlice,
  search: searchSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
