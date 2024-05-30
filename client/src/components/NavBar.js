import React from 'react';
import '../assets/styles/nav-bar.css'


const NavBar = () => {
    return (
        <div className='navbar d-flex justify-content-between'>
            <span className='d-block'>Logo</span>

            <div className='d-flex align-items-center'>
                <i className="ri-account-circle-line"></i>
                John Doe
            </div>
        </div>
    )
}

export default NavBar