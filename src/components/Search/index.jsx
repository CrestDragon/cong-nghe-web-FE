import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import { TiLocation } from "@react-icons/all-files/ti/TiLocation";
import { RiHotelBedFill } from "@react-icons/all-files/ri/RiHotelBedFill";
import { BiCalendar } from "@react-icons/all-files/bi/BiCalendar";
import { BsPeopleFill } from "@react-icons/all-files/bs/BsPeopleFill";
import CityList from "./CityList.js";
import { searchHotel } from "../../features/Search/searchSlice.js";

import "./Search.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useEffect } from "react";

const Search = (props) => {
  const cityStore = useSelector((state) => state.search.city);
  const datesStore = useSelector((state) => state.search.dates);
  const optionsStore = useSelector((state) => state.search.options);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    amount: 1,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    setOpenDate(false);
    setOpenOptions(false);
    const data = {
      city: city,
      dates: [
        {
          startDate: Date.parse(dates[0].startDate),
          endDate: Date.parse(dates[0].endDate),
          key: "selection",
        },
      ],
      options: options,
    };
    localStorage.setItem("search", JSON.stringify(data));
    dispatch(searchHotel(data));
    navigate("/hotels", { state: data });
  };

  useEffect(() => {
    setCity(cityStore);
    setDates([
      {
        ...datesStore[0],
        startDate: new Date(datesStore[0]?.startDate),
        endDate: new Date(datesStore[0]?.endDate),
      },
    ]);
    setOptions(optionsStore);
  }, [cityStore, datesStore, optionsStore]);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row search-box">
          <div className="btn-group col-4">
            <button
              type="button"
              className="destination-btn dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              placeholder="Where are you going?"
            >
              <p className="btn-text">
                <RiHotelBedFill className="search-icon" />
                {city || "Where are you going?"}
              </p>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <p className="dropdown-title">Popular destinations nearby</p>
              {CityList.map((item, index) => (
                <li style={{ marginBottom: "2%" }} key={index}>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => {
                      setCity(item);
                    }}
                  >
                    <TiLocation className="search-icon" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="checkio-btn col-4">
            <div
              onClick={() => {
                setOpenDate(!openDate);
                setOpenOptions(false);
              }}
              className="btn-text"
            >
              <BiCalendar className="search-icon" />
              {`${format(dates[0].startDate, "dd/MM/yyyy")} to 
                            ${format(dates[0].endDate, "dd/MM/yyyy")}`}
            </div>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>

          <div className="amount-btn col-3" type="button">
            <span
              onClick={() => {
                setOpenOptions(!openOptions);
                setOpenDate(false);
              }}
              className="btn-text"
            >
              <BsPeopleFill className="search-icon" />
              {`${options.amount} person${options.amount > 1 ? "s" : ""}/room · 
                            ${options.room} room${options.room > 1 ? "s" : ""}`}
            </span>
            {openOptions && (
              <div className="options">
                <div className="optionItem">
                  <span className="optionText">People</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.amount <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("amount", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.amount}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("amount", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="optionItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.room <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            className="search-btn col-1"
            type="button"
            onClick={handleSearch}
          >
            <p className="btn-text-search">Search</p>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Search;
