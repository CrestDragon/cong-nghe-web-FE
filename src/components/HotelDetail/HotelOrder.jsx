import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

import "./HotelOrder.css";
import { changeOrder } from "../../features/Order/orderSlice";
import { toast } from "react-toastify";
import { Checkout } from "./Checkout";
import { Button } from "../Button/Button";

export const HotelOrder = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hotel = useSelector((state) => state.hotel);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const order = useSelector((state) => state.order);
  const room = useSelector((state) => state.room);
  const [user] = useState({
    ...JSON.parse(localStorage.getItem("user")),
  });
  const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    if (!!user) {
      dispatch(
        changeOrder({
          ...room.data,
          username: user?.username,
          phone: user?.phone,
          email: user?.email,
          userId: user?._id,
        })
      );
    }
  }, [dispatch, room, user]);

  const handleSubmitEdit = () => {
    if (!isLogin) {
      return navigate("/login");
    }

    if (room.key === -1 || !order.fullname) {
      return toast.error("Please choose room type and fill all fields!");
    } else {
      // navigate('/order')
      dispatch(
        changeOrder({
          ...room.data,
          price:
            room.data.price *
            Math.round((order.endDate - order.startDate) / 86400000) *
            order.amountRoom,
        })
      );
      setIsCheckout(true);
    }
  };

  return (
    <React.Fragment>
      <div className="hotelRoomOrder" id="order">
        <div className="hotelOrderTitle">Order now</div>
        <div className="hotelCost">
          <div className="hotelCostNormal">Total:&nbsp;</div>
          {Intl.NumberFormat("vn-VN").format(
            room.data.price *
              Math.round((order.endDate - order.startDate) / 86400000) *
              order.amountRoom
          )}
          <div className="hotelCostNormal">&nbsp;VND</div>
        </div>
        <div className="orderForm">
          <Form.Group className="col-6">
            <div className="textTitlePassword">Fullname:</div>
            <Form.Control
              className="textDetail"
              type="text"
              autoComplete="off"
              value={order?.fullname}
              onChange={(e) =>
                dispatch(changeOrder({ fullname: e.target.value }))
              }
              required
            />
          </Form.Group>
          <Form.Group className="col-6">
            <div className="textTitlePassword">Phone:</div>
            <Form.Control
              className="textDetail"
              type="text"
              value={order?.phone}
              onChange={(e) => dispatch(changeOrder({ phone: e.target.value }))}
              required
            />
          </Form.Group>
          <Button
            name="Submit"
            onClick={() => {
              handleSubmitEdit();
            }}
          />
        </div>
      </div>

      <Checkout
        hotel={hotel}
        show={isCheckout}
        onHide={() => setIsCheckout(false)}
      />
    </React.Fragment>
  );
};
