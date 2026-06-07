import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    room: "",
    roomId: "",
    price: 0,
    hotelId: "",
  },
  key: -1,
};

export const roomSlice = createSlice({
  name: "roomType",
  initialState: initialState,
  reducers: {
    selectRoom: (state, actions) => {
      return {
        ...actions.payload,
      };
    },
    deselectRoom: (state, actions) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectRoom, deselectRoom } = roomSlice.actions;

export default roomSlice.reducer;
