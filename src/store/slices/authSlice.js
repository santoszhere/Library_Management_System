import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../config/AxiosInstance";

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async(_, { rejectWithValue }) => {
        try {
            const { data } = await AxiosInstance.get("/users/current-user");
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to fetch user");
        }
    }
);

const initialState = {
    isLoggedIn: false,
    userData: null,
    role: "member",
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload.userData;
            state.role = action.payload.role;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
            state.role = "member";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;