import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./HotelListDetail.css";
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import { BsStar } from "@react-icons/all-files/bs/BsStar";
import { hotelAPI } from "../../features/Hotel/hotelApi";

const sortOption = ["Star", "Price"];

const HotelListDetail = (props) => {
  const navigate = useNavigate();
  const filter = useSelector((state) => state.filter);
  const city = useSelector((state) => state.search.city);
  const [list, setList] = useState([]);
  const [sort, setSort] = useState("  ");

  useEffect(() => {
    //get Api
    hotelAPI
      .getHotelByFilterAPI({
        city: city,
        ...filter,
      })
      .then((response) => {
        setList([...response?.data.details]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filter, city]);

  const handleSort = (item) => {
    let newList = list;

    if (item === "Star") {
      newList.sort((a, b) => a.stars - b.stars);
    }

    if (item === "Price") {
      newList.sort((a, b) => a.cheapestPrice - b.cheapestPrice);
    }

    setList([...newList]);
  };

  return (
    <React.Fragment>
      <div className="col-9">
        <div className="hotelListTitle">
          {city ? `${city} City` : `Where to go`}
        </div>
        <div className="sort col-6">
          <button
            className="buttonSort dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort by: {sort}
          </button>
          <ul className="dropdown-menu dropdown-menu-start sortOptions">
            {sortOption.map((item, index) => (
              <li style={{ marginBottom: "2%" }} key={index}>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {
                    setSort(item);
                    handleSort(item);
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* {Object.values(filter).join(' ')} */}
        <div className="hotelListContainer">
          {list.map((it, index) => {
            return (
              <div className="row hotelListItem" key={index}>
                <img
                  className="hotelItemImg col-3"
                  src={it?.photos[0]}
                  alt="hotelImage"
                  onClick={() => {
                    navigate(`/hotels/${it?._id}`);
                  }}
                />
                <div className="row col-9">
                  <div className="col-10">
                    <div
                      className="hotelItemName"
                      onClick={() => {
                        navigate(`/hotels/${it?._id}`);
                      }}
                    >
                      {it.name}
                    </div>
                    <div className="hotelItemAddr">{it.address}</div>
                    <div className="hotelItemDesc">{it.title}</div>
                    <div className="hotelItemDesc">
                      Distance: {it?.distance}
                    </div>
                  </div>
                  <div className="col-2">
                    <div
                      className="hotelItemAddr"
                      style={{ justifyContent: "end" }}
                    >
                      Star
                    </div>
                    <div className="hotelItemRating">
                      {[
                        ...Array(it?.stars).fill(
                          <BsStarFill className="hotelItemRating" />
                        ),
                        ...Array(5 - it?.stars).fill(
                          <BsStar className="hotelItemRating" />
                        ),
                      ].map((it, index) => (
                        <div key={index}>{it}</div>
                      ))}
                    </div>
                  </div>
                  <div className="hotelItemCost">
                    Starting from:{" "}
                    {Intl.NumberFormat("vn-VN").format(it?.cheapestPrice)} VND
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HotelListDetail;
