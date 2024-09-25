import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import searchSlice from "./slices/searchSlice";
import socketSlice from "./slices/socketSlice";

const rootReducer = combineReducers({
    user: authSlice,
    search: searchSlice,
    socket: socketSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});