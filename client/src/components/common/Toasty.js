import React, { useEffect } from 'react';
import '../assets/styles/toast.css';

const Toasty = ({ message, type, showToast }) => {

    return (
        <div className={`toast ${type}`}>
            <span>{message}</span>
        </div>
    )
};

export default Toasty;
