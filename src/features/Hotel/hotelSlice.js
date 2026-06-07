import { createSlice } from "@reduxjs/toolkit";

export const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    id: "",
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    photos: [],
    title: "",
    desc: "",
    rating: 0,
    rooms: [],
    cheapestPrice: 0,
    featured: false,
  },
  reducers: {
    setHotel: (state, actions) => {
      return {
        ...actions.payload,
      };
    },
    resetHotel: (state) => {
      return {
        id: "",
        name: "",
        type: "",
        city: "",
        address: "",
        distance: "",
        photos: [],
        title: "",
        desc: "",
        rating: 0,
        rooms: [],
        cheapestPrice: 0,
        featured: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setHotel, resetHotel } = hotelSlice.actions;

export default hotelSlice.reducer;
