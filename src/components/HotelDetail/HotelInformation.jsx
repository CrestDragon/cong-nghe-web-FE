import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./HotelInformation.css";
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import { BsStar } from "@react-icons/all-files/bs/BsStar";
import { FaDotCircle } from "@react-icons/all-files/fa/FaDotCircle";
import { changeOrder } from "../../features/Order/orderSlice";

export const HotelInformation = (props) => {
  const hotel = useSelector((state) => state.hotel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeOrder({ hotelName: hotel?.name }));
  }, [dispatch, hotel?.name]);

  return (
    <React.Fragment>
      <div className="hotelInformation">
        <div className="hotelCost">
          <div className="hotelCostNormal">Starting from:&nbsp;</div>
          {Intl.NumberFormat("vn-VN").format(hotel?.cheapestPrice)}
          <div className="hotelCostNormal">&nbsp;VND/night</div>
        </div>
        <div className="row" style={{ marginTop: "2%" }}>
          <div className="col-8" style={{ paddingRight: "5%" }}>
            <div className="hotelName">{hotel?.name}</div>
            <div className="hotelRating">
              {[
                ...Array(hotel?.stars || 0).fill(
                  <BsStarFill className="hotelIconRating" />
                ),
                ...Array(5 - (hotel?.stars || 0)).fill(
                  <BsStar className="hotelIconRating" />
                ),
              ].map((it, index) => (
                <div key={index}>{it}</div>
              ))}
              &nbsp;- Star
            </div>
            <div className="hotelAddr">{hotel?.address}</div>
            <div className="hotelTitle">{hotel?.title}</div>
            <div className="hotelDesc">{hotel?.desc}</div>
            <div className="hotelDesc">
              Distance: {hotel?.distance} - from centre
            </div>
          </div>
          <ul className="hotelAmenities col-4">
            Popular amenities
            {hotel?.amenities?.map((it, index) => {
              return (
                <li
                  className="row hotelAmenitiesItem"
                  key={`amenities-${index}`}
                >
                  <FaDotCircle className="hotelAmenitiesIcon col-2" />
                  <div className="hotelAmenitiesText col-10"> {it} </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
