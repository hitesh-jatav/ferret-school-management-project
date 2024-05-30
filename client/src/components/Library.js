import React, { useState } from 'react';
import '../assets/styles/library.css';
import { Link, Outlet, useParams } from 'react-router-dom';

const Library = () => {
  console.log(window.location);


  const miniTabs = [
    { name: 'Books', path: 'books', icon: 'ri-book-2-line' },
    { name: 'Lending', path: 'lending', icon: 'ri-arrow-left-right-line' },
    { name: 'Fines', path: 'fines', icon: 'ri-wallet-2-line' },
    { name: 'Reports', path: 'report', icon: 'ri-file-chart-line' },
  ];

  const [activeTab, setActiveTab] = useState('books')

  return (
    <div className='library-wrapper'>
      <div className='library-container'>
        <div className='nav-bar'>
          {
            miniTabs.map((tab) => <Link to={'/library/' + tab.path}
              onClick={() => setActiveTab(tab.path)}
              key={tab.path}
              className={'nav-link ' + `${activeTab === tab.path ? 'active-nav' : ''}`}
            >{tab.name} <i className={tab.icon}></i></Link >)
          }
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default Library