import React, { useState } from 'react'
import Table from './Table'

const RemarkAndAction = () => {
    const [option, setOption] = useState('Remarks')

    return (
        <div className='mark-assestments-wrapper'>
            <div className='d-flex justify-content-between align-items-center'>
                <span className='header'>{option}</span>

                <select value={option}
                    onChange={(e) => setOption(e.target.value)}
                >
                    <option value={'Remarks'}>Remarks</option>
                    <option value={'Actions'}>Actions</option>
                </select>
            </div>

            <div className='list'>
                <Table />
            </div>
        </div>
    )
}

export default RemarkAndAction