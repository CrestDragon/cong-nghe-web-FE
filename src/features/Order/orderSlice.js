import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    username: "",
    fullname: "",
    phone: "",
    email: "",
    userId: "",
    hotelId: "",
    hotelName: "",
    room: "",
    roomId: "",
    amountRoom: "",
    price: 0,
    startDate: Math.floor(Date.now() / 86400000) * 86400000,
    endDate: Math.floor(Date.now() / 86400000 + 1) * 86400000,
    state: "Waiting",
  },
  reducers: {
    changeOrder: (state, actions) => {
      return {
        ...state,
        ...actions.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeOrder } = orderSlice.actions;

export default orderSlice.reducer;
