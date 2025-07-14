import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../features/Profile/profileSlice';
import searchReducer from '../features/Search/searchSlice';
import filterReducer from '../features/Filter/filterSlice';
import hotelSlice from '../features/Hotel/hotelSlice';
import orderSlice from '../features/Order/orderSlice';
import roomSlice from '../features/Room/roomSlice';
import orderListSlice from '../features/OrderList/orderListSlice';
import authSlice from '../features/Auth/authSlice';

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        search: searchReducer,
        filter: filterReducer,
        hotel: hotelSlice,
        order: orderSlice,
        room: roomSlice,
        orderList: orderListSlice,
        auth: authSlice,
    },
})