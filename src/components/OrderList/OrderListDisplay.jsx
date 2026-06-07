import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./OrderListDisplay.css";
import { OrderDetail } from "./OrderDetail";
import { setOrderList } from "../../features/OrderList/orderListSlice";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { orderAPI } from "../../features/Order/orderApi";

export const OrderListDisplay = (props) => {
  // localStorage.getItem()
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const orders = useSelector((state) => state.orderList);
  const dispatch = useDispatch();

  if (!isLogin) {
    navigate("/login");
  }

  useEffect(() => {
    //get Api
    orderAPI
      .getUserOrdersAPI(user?._id)
      .then((response) => {
        if (response.status === 200) {
          dispatch(setOrderList(response?.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, user?._id]);

  return (
    <React.Fragment>
      <div className="orderListContainer">
        <div className="titleOrderList">Your Orders</div>
        <div className="row orderInformation">
          <div className="orderListText col-3">User: {user?.username}</div>
          <div className="orderListTextBold col-3">
            {orders?.length > 1
              ? `${orders?.length} orders found`
              : `${orders?.length} order found`}
          </div>
        </div>
        <div className="orderItems">
          <div className="orderDetailTitle row">
            <div className="col-3 orderTitleText">Name</div>
            <div className="col-1 orderTitleText">Amount</div>
            <div className="col-3 orderTitleText">Checkin - Checkout</div>
            <div className="col-2 orderTitleText">Status</div>
            <div className="col-2 orderTitleText">Total</div>
            <div className="col-1 orderTitleText">Cancel</div>
          </div>
          {orders.map((it, index) => {
            return <OrderDetail data={{ ...it, pos: index }} key={index} />;
          })}
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};
