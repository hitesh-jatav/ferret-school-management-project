import React, { useEffect, useState } from 'react';
import { ALL_ROUTES } from '../constants/routes.constants.js'
import '../assets/styles/side-bar.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SideBar = () => {
    const [pathname, setPathname] = useState(window.location.pathname)
    useEffect(() => {
        if (window?.location?.pathname !== pathname) setPathname(window.location.pathname)
    }, [pathname]);

    const logout = () => {
        toast.success('Logout Successfully!');
        localStorage.clear();
        window.location.href = "/login";
    }

    return (
        <div className='side-bar'>
            {
                ALL_ROUTES?.filter(e => e.authorizedRouted)?.map(item => <div key={item.id} className='link-tab'>
                    <Link className={'link-button'}
                        to={item.path} >
                        <span className="icon-text">
                            <i className={`icon ${pathname === item.path ? 'active ' : ''}` + " icon " + item.icon}></i>
                            <span className="text">{item.name}</span>
                        </span>
                    </Link>
                </div>)
            }

            <div className='link-tab'>
                <button className={'link-button'} onClick={() => logout()} >
                    <i className="ri-logout-box-r-line"></i>
                </button>
            </div>
        </div>
    )
}

export default SideBar
