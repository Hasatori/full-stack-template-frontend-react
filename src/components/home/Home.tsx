import React from 'react';

import fullstackImage from '../../assets/images/common/fullstack.png'

export default function Home() {
    return (
        <div className='d-flex flex-column justify-content-center mt-4'>
            <div className='d-flex align-self-center'>
                <img width="100%" src={fullstackImage}></img>
            </div>
        </div>
    )
}
