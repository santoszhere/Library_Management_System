import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  search: "",
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setsearch: (state, action) => {
      state.search = action.payload;
    },
  },
});
export const { setsearch } = searchSlice.actions;
export default searchSlice.reducer;
