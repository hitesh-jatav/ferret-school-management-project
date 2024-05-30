import React, { useState } from 'react'
import '../../assets/styles/profile.css'
import Table from './Table'

const MarksAndAssestment = () => {
    const [option, setOption] = useState('Marks')
    return (
        <div className='mark-assestments-wrapper'>
            <div className='d-flex justify-content-between align-items-center'>
                <span className='header'>{option}</span>

                <select value={option}
                    onChange={(e) => setOption(e.target.value)}
                >
                    <option value={'Marks'}>Marks</option>
                    <option value={'Assestments'}>Assestments</option>
                </select>
            </div>

            <div className='list'>
                <Table />
            </div>
        </div>
    )
}

export default MarksAndAssestment