import React, { useEffect } from "react";
import { /*useSelector,*/ useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import "./HotelDetail.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import { setHotel } from "../../features/Hotel/hotelSlice";
import { HotelInformation } from "../../components/HotelDetail/HotelInformation";
import { HotelRooms } from "../../components/HotelDetail/HotelRooms";
import { HotelOrder } from "../../components/HotelDetail/HotelOrder";
import { ToastContainer } from "react-toastify";
import { hotelAPI } from "../../features/Hotel/hotelApi";

const HotelDetail = (props) => {
  const { hotelId } = useParams();
  //   const detail = useSelector((state) => state.hotel);
  const dispatch = useDispatch();

  useEffect(() => {
    //get Api
    hotelAPI
      .getOneHotelAPI(null, hotelId)
      .then((response) => {
        dispatch(setHotel(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, hotelId]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Hotel Detail | HotelBooking</title>
      </Helmet>
      <div className="main">
        <Header />
        <Banner />
        <div className="container hotelDetail">
          <HotelInformation />
          <HotelRooms />
          <HotelOrder />
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default HotelDetail;
