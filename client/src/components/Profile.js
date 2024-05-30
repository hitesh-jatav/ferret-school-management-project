import React, {  useState } from 'react'
import '../assets/styles/profile.css'
import {
    Outlet, Link
} from "react-router-dom";
const Profile = () => {

    const miniTabs = [
        { name: 'Overview', path: 'overview' },
        { name: 'Marks Assesments', path: 'marks-assesments' },
        { name: 'Remarks & Actions', path: 'remarks-actions' },
        { name: 'Abscences & Incidents', path: 'absence-incidents' },
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
                    >{tab.name}</Link >)
                }
                
            </div>

            <Outlet />
        </div>
    )
}

export default Profile