import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useDispatch, useSelector } from 'react-redux';

import { BiCart } from "@react-icons/all-files/bi/BiCart"
import { BiUser } from "@react-icons/all-files/bi/BiUser"

import './Header.css';

const Header = (props) => {
    // const dispatch = useDispatch();

    return (
        <React.Fragment>
            <div className="header sticky-top shadow-lg" id='header'>
                <div className='navbar' >
                    <div className='container'>
                        {/*Homepage Title*/}
                        <Link className='col-4' to="/" style={{ textDecoration: 'none' }}>
                            <div className='home-nav'>
                                HOTELBOOKING.COM
                            </div>
                        </Link>
                        <div className='row col-5 justify-content-start'>
                            <Link className='col-2' to="/" style={{ textDecoration: 'none' }}>
                                <div className='content-nav col-8'>
                                    HOME
                                </div>
                            </Link>
                            <HashLink className='col-2' smooth to="#footer" style={{ textDecoration: 'none' }}>
                                <div className='content-nav col-8'>
                                    ABOUT
                                </div>
                            </HashLink>
                        </div>
                        <div className='row col-3 justify-content-center'>
                            <Link className='col-2' to="/order" style={{ textDecoration: 'none' }}>
                                <BiCart className='icon col-8 align-self-end' />
                            </Link>
                            <Link className='col-2' to="/profile" style={{ textDecoration: 'none' }}>
                                <BiUser className='icon col-8 align-self-end' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header;