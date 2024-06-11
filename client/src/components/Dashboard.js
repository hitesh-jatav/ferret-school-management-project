import React, { useEffect, useState } from 'react';
import Circle from './charts/Circle.js'
import Line from './charts/Line.js';
import Column from './charts/Column.js';
// import Donout from './charts/Donout.js';
import CalendarComponent from './common/CalendarComponent.js';
import '../assets/styles/dashboard.css';
import Axios from '../axios';

const Dashboard = () => {
    const [counts, setCounts] = useState({})

    const cards = [
        { name: 'Students', color: 'bg-green', id: 'students' },
        { name: 'Teachers', color: 'bg-pink', id: 'teachers' },
        { name: 'Other Staff', color: 'bg-yellow', id: 'otherStaff' },
        { name: 'Other', color: 'bg-blue', id: 'others' },
    ]

    const getDashboardStats = async () => {
        try {
            let { data } = await Axios.get('/dashboard/stats');
            setCounts(data.count)
        } catch (error) {
            console.log(error)
        }
    }

    const countForCards = (key) => {
        return counts[key] || 'N/A'
    }

    useEffect(() => {
        getDashboardStats()
    }, []);

    return (
        <div className='row w-100 dashboard-wrapper'>
            <div className='col-12 d-flex justify-content-between'>
                <h4>Dashboard</h4>
                <h4>Info</h4>
            </div>
            <div className='col-12 row p-0 info-card-div'>
                {
                    cards.map((card) => <div key={card.name}
                        className='col-md-4 col-lg-3 col-sm-6 p-1'>
                        <div
                            className={'info-card d-flex justify-content-between align-items-center ' + card.color}>
                            <div>
                                <h5 className='m-0'>{countForCards(card.id)}</h5>
                                <span>{card.name}</span>
                            </div>

                            <div>
                                <i className="ri-book-line"></i>
                            </div>
                        </div>
                    </div>)
                }
            </div>


            <div className='col-lg-4 col-sm-6 col-md-4'>
                <Circle />
                {/* // attendence */}
            </div>

            <div className='col-lg-4 col-sm-6 col-md-4'>
                <Line />
                {/* fees collection  */}
            </div>


            <div className='col-lg-4 col-sm-6 col-md-4'>
                <CalendarComponent />
                {/*  calenders */}
            </div>

            <div className='col-lg-4 col-sm-6 col-md-4'>
                <Column />
                {/*  expense every month */}
            </div>
            <div className='col-lg-4 col-sm-6 col-md-4'>
                {/* <Donout /> */}
                Donout Chart for male/Female ratio
            </div>

            <div className='col-lg-4 col-sm-6 col-md-4'>
                {/* <Donout /> */}
                list of notification like
                alerts, birthdays, news,
            </div>
        </div>
    )
}

export default Dashboard