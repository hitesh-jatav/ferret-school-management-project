import React, { useState } from 'react'
import Table from './Table'

const AbsenceAndIncidents = () => {
  const [option, setOption] = useState('Absence')
  return (
    <div className='mark-assestments-wrapper'>
      <div className='d-flex justify-content-between align-items-center'>
        <span className='header'>{option}</span>

        <select value={option}
          onChange={(e) => setOption(e.target.value)}
        >
          <option value={'Absence'}>Absence</option>
          <option value={'Incidents'}>Incidents</option>
        </select>
      </div>

      <div className='list'>
        <Table />
      </div>
    </div>
  )
}

export default AbsenceAndIncidents