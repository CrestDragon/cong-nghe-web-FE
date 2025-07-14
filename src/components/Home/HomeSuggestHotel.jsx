import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './HomeSuggestHotel.css';
import { hotelAPI } from '../../features/Hotel/hotelApi';

const HomeSuggestHotel = (props) => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [hotelList, setHotelList] = useState([]);

    useEffect(() => {
        //get API
        hotelAPI
            .getAllHotelAPI()
            .then((response) => {
                const list = response?.data?.details.slice(0, 4)
                setHotelList(list)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleClick = (item) => {
        navigate(`/hotels/${item._id}`);
    }
    return (
        <React.Fragment>
            <div className="row suggest-home">
                {hotelList.map((it, index) => {
                    return <div className="suggestItem col" key={index} onClick={() => handleClick(it)}>
                        <img
                            src={it.photos[0]}
                            alt=""
                            className="suggestImg"
                        />
                        <div className="suggestName">{it.name}</div>
                        <div className='suggestDesc'>{it.address}</div>
                        <div className='suggestDesc'>
                            Starting from:&nbsp;
                            <div className='suggestCost'>
                                {new Intl.NumberFormat('vn-VN').format(it.cheapestPrice)} VND
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </React.Fragment>
    );
}

export default HomeSuggestHotel;