import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Profile.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProfileDisplay from "../../components/Profile/ProfileDisplay";

const Profile = (props) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate("/login", { state: { lastUrl: "/profile" } });
  }, [isLogin, navigate]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Profile | HotelBooking</title>
      </Helmet>
      <div className="main">
        <Header />
        <ProfileDisplay />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Profile;
