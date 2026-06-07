import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    lowPrice: 0,
    type: [],
    stars: 0,
  },
  reducers: {
    filterHotels: (state, actions) => {
      return {
        ...actions.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { filterHotels } = filterSlice.actions;

export default filterSlice.reducer;
