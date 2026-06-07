import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './HomeCity.css'
import { searchHotel } from '../../features/Search/searchSlice';

const HomeCity = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const search = useSelector(state => state.search)

    const handleClick = (param, name) => {
        dispatch(searchHotel({ ...search, city: name }))
        navigate(`/hotels`, { state: { city: name } });
    }

    return (
        <React.Fragment>
            <div className="row city-home">
                <div className="cityBigItem col" onClick={ () => handleClick("hochiminh", "Ho Chi Minh") }>
                    <img
                        src="https://lesrivesexperience.com/wp-content/uploads/2018/11/sunset-on-saigon-river.jpg"
                        alt=""
                        className="cityImg"
                    />
                    <div className="cityTitles">Ho Chi Minh</div>
                </div>

                <div className="cityBigItem col" onClick={ () => handleClick("hanoi", "Ha Noi") }>
                    <img
                        src="https://a.cdn-hotels.com/gdcs/production144/d1394/a304783d-6dc9-4bb2-9239-d124a16a154e.jpg?impolicy=fcrop&w=1600&h=1066&q=medium"
                        alt=""
                        className="cityImg"
                    />
                    <div className="cityTitles">Ha Noi</div>
                </div>
                <div className='w-100'/>
                <div className="cityItem col" onClick={ () => handleClick("nhatrang", "Nha Trang") }>
                    <img
                        src="https://a.cdn-hotels.com/gdcs/production28/d58/181be07c-4fc8-48e7-bc47-7b437939cafd.jpg?impolicy=fcrop&w=1600&h=1066&q=medium"
                        alt=""
                        className="cityImg"
                    />
                    <div className="cityTitles">Nha Trang</div>
                </div>
                <div className="cityItem col" onClick={ () => handleClick("hue", "Hue") }>
                    <img
                        src="https://vietnamesefood.com.vn/kcfinder/upload/images/kinh%20thanh%20hue.jpg"
                        alt=""
                        className="cityImg"
                    />
                    <div className="cityTitles" >Hue</div>
                </div>
                <div className="cityItem col" onClick={ () => handleClick("hoian", "Hoi An") }>
                    <img
                        src="https://d13jio720g7qcs.cloudfront.net/images/destinations/origin/5f052dca0e42d.jpg"
                        alt=""
                        className="cityImg"
                    />
                    <div className="cityTitles">Hoi An</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default HomeCity;