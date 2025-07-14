import React from 'react';

import './Button.css';

export const Button = (props) => {
    return (
        <React.Fragment>
            <div className='button-container'>
                <button
                    className='submit-button'
                    type='submit'
                    onClick={props.onClick}
                >
                    {props.name}
                </button>
            </div>
        </React.Fragment>
    )
}