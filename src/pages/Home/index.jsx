import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HomeCity from "../../components/Home/HomeCity";
import HomeSuggestHotel from "../../components/Home/HomeSuggestHotel";
import Search from "../../components/Search";
import { resetHotel } from "../../features/Hotel/hotelSlice";
import { resetSearch } from "../../features/Search/searchSlice";

import "./Home.css";

const Home = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem("search");
    dispatch(resetSearch());
    dispatch(resetHotel());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Home | HotelBooking</title>
      </Helmet>
      <div className="main">
        <Header />
        <Banner />
        <Search />
        <div className="container feature">
          <p className="title-text-home">Some suggest for you</p>
          <p className="text-home">Have a look and find where to stay.</p>
          <h1 className="title-line-home"> City </h1>
          <HomeCity />
          <h1 className="title-line-home"> Popular Hotels</h1>
          <HomeSuggestHotel />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
