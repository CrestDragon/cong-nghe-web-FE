import React from "react";
import { Helmet } from "react-helmet";

import "./OrderList.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { OrderListDisplay } from "../../components/OrderList/OrderListDisplay";

const OrderList = (props) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Order List | HotelBooking</title>
      </Helmet>
      <div className="main">
        <Header />
        <div className="orderList container">
          <OrderListDisplay />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default OrderList;
