import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {

    const [currNav, setCurrNav] = useState('dashboard')

  return (
    <div>
      <Sidebar activeId="dashboard" setCurrNav={setCurrNav} />
        <div className='ml-[260px]'>
            {currNav}
        </div>
    </div>
  )
}

export default Dashboard
