import React, { useState, useEffect } from "react";
import { format } from "date-fns";

import "./OrderDetail.css";
import { ImCancelCircle } from "@react-icons/all-files/im/ImCancelCircle";
import { OrderModal } from "./OrderModal";
import { hotelAPI } from "../../features/Hotel/hotelApi";

export const OrderDetail = (props) => {
  const order = props.data;
  const [hotelName, setHotelName] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    hotelAPI
      .getOneHotelAPI(null, order?.roomId?.hotelId)
      .then((response) => {
        setHotelName(response?.data?.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [order?.roomId?.hotelId]);

  const handleDelete = () => {
    setIsConfirm(true);
  };

  return (
    <React.Fragment>
      <div className="orderDetail row">
        <div className="col-3 orderDesc">
          <div className="orderHotel">{hotelName}</div>
          <div className="orderText">{`${order?.roomId?.title}`}</div>
        </div>
        <div className="col-1 orderDesc">
          <div className="orderText">{`${order?.amountRoom}`}</div>
        </div>
        <div className="col-3 orderDesc">
          <div className="orderText">{`${format(
            order?.startDate,
            "dd/MM/yyyy"
          )} - ${format(order?.endDate, "dd/MM/yyyy")}`}</div>
        </div>
        <div className="col-2 orderDesc">
          <div className="orderText">{`${order?.state}`}</div>
        </div>
        <div className="col-2 orderTotal">{`${Intl.NumberFormat("vn-VN").format(
          order?.price
        )} VND`}</div>
        <ImCancelCircle className="col-1 orderIcon" onClick={handleDelete} />

        <OrderModal
          show={isConfirm}
          onHide={() => setIsConfirm(false)}
          data={props.data}
        />
      </div>
    </React.Fragment>
  );
};
