import React from "react";
import { Helmet } from "react-helmet";

import "./HotelList.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Filter from "../../components/Filter/Filter";
import Search from "../../components/Search";
import HotelListDetail from "../../components/HotelList/HotelListDetail";

const HotelList = (props) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Hotel List | HotelBooking</title>
      </Helmet>
      <div className="main">
        <Header />
        <Search />
        <div className="container">
          <div className="hotelList row">
            <Filter className="col-3" />
            <HotelListDetail className="col-9" />
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default HotelList;
