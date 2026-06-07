import { createSlice } from "@reduxjs/toolkit";

export const orderListSlice = createSlice({
  name: "orderList",
  initialState: [],
  reducers: {
    setOrderList: (state, actions) => {
      return [...actions.payload];
    },
    deleteOrderList: (state, actions) => {
      const newOrders = [...state];
      newOrders.splice(actions?.payload, 1);
      return [...newOrders];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrderList, deleteOrderList } = orderListSlice.actions;

export default orderListSlice.reducer;
