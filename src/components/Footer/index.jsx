import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <React.Fragment>
      <div className="footer" id="footer">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-4 style-col">
              <p className="title">Hotel Booking</p>
              <div className="divider"></div>
              <p className="text-footer">
                Created by Tran Thanh Long. Website is made for finding
                information, ordering room in hotels and other services.
              </p>
            </div>
            <div className="col-3 style-col">
              <p className="title">Contact</p>
              <div className="divider"></div>
              <ul className="text-footer">
                <li>
                  <p className="title-text">Address:</p>
                  <p className="text-footer">
                    1 Dai Co Viet Street, Hai Ba Trung, Hanoi
                  </p>
                </li>
                <li>
                  <p className="title-text">Hotline:</p>
                  <p className="text-footer">(+84) 98 171 0696</p>
                </li>
                <li>
                  <p className="title-text">Email:</p>
                  <p className="text-footer">intercopycat@gmail.com</p>
                  <p className="text-footer">long.tt194103@sis.hust.edu.vn</p>
                </li>
              </ul>
            </div>
            <div className="col-3 style-col">
              <p className="title">Support</p>
              <div className="divider"></div>
              <p className="text-footer">
                Please contact us via hotline or email to get help as soon as
                possible.
              </p>
            </div>
          </div>
        </div>
        <div className="signature">
          <div className="container">
            <p className="text-footer">
              Copyright 2023 © LongTT - Booking Web App{" "}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
