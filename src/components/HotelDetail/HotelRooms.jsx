import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import './HotelRooms.css';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Rooms } from '../../mock_data/Room/mock_room';
import { BiCalendar } from '@react-icons/all-files/bi/BiCalendar';
import { BsPeopleFill } from '@react-icons/all-files/bs/BsPeopleFill';
import { changeOrder } from '../../features/Order/orderSlice';
import { RoomDetail } from './RoomDetail';
import { roomAPI } from '../../features/Room/roomApi';


export const HotelRooms = (props) => {
    const dispatch = useDispatch();
    const hotel = useSelector(state => state.hotel);
    const [rooms, setRooms] = useState([]);
    const oldDates = useSelector(state => state.search.dates);
    const oldOptions = useSelector(state => state.search.options);
    const [dates, setDates] = useState([{
        ...oldDates[0],
        startDate: new Date(oldDates[0]?.startDate),
        endDate: new Date(oldDates[0]?.endDate),
    }]);
    const [options, setOptions] = useState(oldOptions);
    const [openDate, setOpenDate] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);

    useEffect(() => {
        //get Api
        roomAPI
            .getRoomsFilterAPI({
                ...options,
                startDate: Date.parse(dates[0]?.startDate),
                endDate: Date.parse(dates[0]?.endDate),
            }, hotel?._id)
            .then((response) => {
                const list = response?.data?.details || [];
                setRooms(list)
            })
            .catch((error) => {
                console.log(error)
            })

        dispatch(changeOrder({
            amountRoom: options.room,
            startDate: Date.parse(dates[0]?.startDate),
            endDate: Date.parse(dates[0]?.endDate),
        }));
    }, [hotel])

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };

    const handleSearch = () => {
        //get room API
        setOpenDate(false);
        setOpenOptions(false);
        roomAPI
            .getRoomsFilterAPI({
                ...options,
                startDate: Date.parse(dates[0]?.startDate),
                endDate: Date.parse(dates[0]?.endDate),
            }, hotel?._id)
            .then((response) => {
                const list = response?.data?.details
                setRooms(list)
            })
            .catch((error) => {
                console.log(error)
            })

        dispatch(changeOrder({
            amountRoom: options.room,
            startDate: Date.parse(dates[0]?.startDate),
            endDate: Date.parse(dates[0]?.endDate),
        }));
    };

    return (
        <React.Fragment>
            <div className='hotelRooms'>
                <div className='hotelRoomsTitle'>Choose your room</div>
                <div className='row searchRoom'>
                    <div className="checkio-btn col-4">
                        <div
                            onClick={() => {
                                setOpenDate(!openDate);
                                setOpenOptions(false);
                            }}
                            className='btn-text'
                        >
                            <BiCalendar className='search-icon' />
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

                    <div className='amount-btn col-4' type="button">
                        <span
                            onClick={() => {
                                setOpenOptions(!openOptions);
                                setOpenDate(false)
                            }}
                            className="btn-text"
                        >
                            <BsPeopleFill className='search-icon' />
                            {`${options.amount} person${options.amount > 1 ? 's' : ''}/room · 
                            ${options.room} room${options.room > 1 ? 's' : ''}`
                            }
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
                                        <span className="optionCounterNumber">
                                            {options.room}
                                        </span>
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

                    <button className='search-btn col-1' type="button" onClick={handleSearch}>
                        <p className='btn-text-search'>
                            Select
                        </p>
                    </button>
                </div>
                <div className='row roomType'>
                    {[...rooms].map((it, index) => {
                        return <RoomDetail data={{ ...it?.room, key: index }} key={index} />
                        // return <HashLink to='#order' className='roomTypeItem col-5' onClick={() => handleChooseRoom(it)} key={`room-${index}`}>
                        //     <div className='roomTypeTitle'>{it?.title}</div>
                        //     <div className='roomTypeDesc'>Max people: {it?.maxPeople}</div>
                        //     <div className='roomTypeDesc'>Price: {Intl.NumberFormat('vn-VN').format(it?.price)} VND</div>
                        //     <div className='roomTypeDesc'>Amenities: {it?.desc}</div>
                        // </HashLink>
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}