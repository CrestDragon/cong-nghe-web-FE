import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "passwordChange",
  initialState: {
    isExpand: false,
  },
  reducers: {
    expand: (state) => {
      return { isExpand: true };
    },
    collapse: (state) => {
      return { isExpand: false };
    },
  },
});

// Action creators are generated for each case reducer function
export const { expand, collapse } = profileSlice.actions;

export default profileSlice.reducer;
