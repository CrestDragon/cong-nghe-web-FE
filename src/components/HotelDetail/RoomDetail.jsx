import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashLink } from 'react-router-hash-link';

import './RoomDetail.css';
import { deselectRoom, selectRoom } from '../../features/Room/roomSlice';

export const RoomDetail = (props) => {
    const dispatch = useDispatch();
    const room = props.data;
    const [isSelect, setIsSelect] = useState(false);
    const roomSelect = useSelector(state => state.room)

    useEffect(() => {
        if (roomSelect.key === room.key) {
            setIsSelect(true);
        }
        else {
            setIsSelect(false);
        }
    }, [roomSelect])

    const handleChooseRoom = (item) => {
        setIsSelect(!isSelect);
        if (!isSelect) {
            return dispatch(selectRoom({
                data: {
                    roomId: item._id,
                    room: item.title,
                    price: item.price,
                    hotelId: item.hotelId,
                },
                key: room.key,
            }))
        }
        else {
            return dispatch(deselectRoom())
        }
    }

    return (
        <React.Fragment>
            {!isSelect ? <HashLink to='#order' className='roomTypeItem col-5' onClick={() => handleChooseRoom(room)} >
                <div className='roomTypeTitle'>{room?.title}</div>
                <div className='roomTypeDesc'>Max people: {room?.maxPeople}</div>
                <div className='roomTypeDesc'>Price: {Intl.NumberFormat('vn-VN').format(room?.price)} VND</div>
                <div className='roomTypeDesc'>Amenities: {room?.desc}</div>
            </HashLink>
                : <HashLink to='' className='roomTypeItem col-5' onClick={() => handleChooseRoom(room)} style={{ backgroundColor: 'lightcyan' }}>
                    <div className='roomTypeTitle'>{room?.title}</div>
                    <div className='roomTypeDesc'>Max people: {room?.maxPeople}</div>
                    <div className='roomTypeDesc'>Price: {Intl.NumberFormat('vn-VN').format(room?.price)} VND</div>
                    <div className='roomTypeDesc'>Amenities: {room?.desc}</div>
                </HashLink>}
        </React.Fragment>
    )
}