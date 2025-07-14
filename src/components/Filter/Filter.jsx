import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";

import "./Filter.css";
import { filterHotels } from "../../features/Filter/filterSlice";

const types = ["Hotel", "Apartment", "Villa"];

const Filter = (props) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [type, setType] = useState([]);
  const [rating, setRating] = useState(0);

  const handleTypeCheckbox = (flag, item) => {
    if (flag) {
      return setType([...type, item]);
    } else {
      let newType = [...type];
      newType.splice(
        newType.findIndex((it) => it === item),
        1
      );
      return setType(newType);
    }
  };

  const handleRatingCheckbox = (item) => {
    return setRating(item === "Unrated" ? 0 : item);
  };

  const handleSubmitFilter = () => {
    // console.log(price, type, rating);
    dispatch(filterHotels({ lowPrice: price, type: type, stars: rating }));
  };

  return (
    <React.Fragment>
      <div className="filter col-3">
        <div className="filterTitle">Filter by</div>
        <div className="filterProperty">
          Type
          {types.map((item, index) => {
            return (
              <div className="filterOption" key={index}>
                <Form.Check
                  className="filterSelect"
                  type="checkbox"
                  id={`type-${index}`}
                  onChange={(e) => handleTypeCheckbox(e.target.checked, item)}
                />
                <div className="filterText">{item}</div>
              </div>
            );
          })}
        </div>

        <div className="filterProperty">
          Lowest price
          <div style={{ marginTop: "2%" }}>
            <div className="filterOption" style={{ justifyContent: "end" }}>
              <div className="filterText">
                {Intl.NumberFormat("vn-VN").format(price)} VND
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={2000000}
              onChange={(e) =>
                setPrice(Math.round(e.target.value / 50000) * 50000)
              }
              className="filterSlider"
            />
          </div>
        </div>
        <div className="filterProperty">
          Star
          {[1, 2, 3, 4, 5, "Unrated"].map((item, index) => {
            return (
              <div className="filterOption" key={index}>
                <Form.Check
                  className="filterSelect"
                  type="radio"
                  id={`rating-${index}`}
                  name="star"
                  onChange={(e) => handleRatingCheckbox(item)}
                />
                <div className="filterText">{item}</div>
              </div>
            );
          })}
        </div>

        <button className="filterBtn" onClick={handleSubmitFilter}>
          Find
        </button>
      </div>
    </React.Fragment>
  );
};

export default Filter;
