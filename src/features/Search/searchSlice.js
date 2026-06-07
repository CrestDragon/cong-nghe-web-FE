import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "",
  dates: [
    {
      startDate: Math.floor(Date.now() / 86400000) * 86400000,
      endDate: Math.floor(Date.now() / 86400000 + 1) * 86400000,
      key: "selection",
    },
  ],
  options: {
    amount: 1,
    room: 1,
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState: JSON.parse(localStorage.getItem("search")) || initialState,
  reducers: {
    searchHotel: (state, actions) => {
      return {
        ...actions.payload,
      };
    },
    resetSearch: (state, actions) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchHotel, resetSearch } = searchSlice.actions;

export default searchSlice.reducer;
