import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Image1 from '../../assets/images/hotel1.jpg';
import Image2 from '../../assets/images/hotel2.jpg';
import Image3 from '../../assets/images/hotel3.jpg';
import Image4 from '../../assets/images/hotel4.jpg';

import './Banner.css';
import { useSelector } from 'react-redux';

const photoHome = [Image1, Image2, Image3, Image4];

const Banner = (props) => {
    const photos = useSelector(state => state.hotel.photos);

    return (
        <Carousel className='container banner'>
            {
                photos.length ?
                    photos.map((it, index) => {
                        return <Carousel.Item interval={5000} key={index}>
                            <img
                                className="banner-item d-block w-100"
                                src={it}
                                alt="0"
                            />
                        </Carousel.Item>
                    }) :
                    photoHome.map((it, index) => {
                        return <Carousel.Item interval={5000} key={index}>
                            <img
                                className="banner-item d-block w-100"
                                src={it}
                                alt="0"
                            />
                        </Carousel.Item>
                    })
            }
        </Carousel>
    );
};

export default Banner;