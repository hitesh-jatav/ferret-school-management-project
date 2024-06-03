import React, { useState } from 'react'
import '../assets/styles/profile.css'
import {
    Outlet, Link
} from "react-router-dom";
const Profile = () => {

    const miniTabs = [
        { name: 'Overview', path: 'overview', icon: 'ri-fullscreen-line' },
        { name: 'Marks Assesments', path: 'marks-assesments', icon: "ri-file-check-line" },
        { name: 'Remarks & Actions', path: 'remarks-actions', icon: 'ri-shield-flash-line' },
        { name: 'Abscences & Incidents', path: 'absence-incidents', icon: 'ri-find-replace-line' },
    ];
    const [activeTab, setActiveTab] = useState('overview')

    return (
        <div className='profile-wrapper'>

            <div className='nav-bar'>
                {
                    miniTabs.map((tab) => <Link to={'/profile/' + tab.path}
                        onClick={() => setActiveTab(tab.path)}
                        className={'nav-link ' + `${activeTab === tab.path ? 'active-nav' : ''}`}
                        key={tab.id}
                    >{tab.name}
                        <i className={tab.icon}></i></Link >)
                }

            </div>

            <Outlet />
        </div>
    )
}

export default Profile