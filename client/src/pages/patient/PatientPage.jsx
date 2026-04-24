import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import PatientDashboard from '../../components/patient/PatientDashboard'
import PatientAppointment from '../../components/patient/PatientAppointment'
import AppointmentForm from '../../components/form/AppointmentForm'

const PatientPage = () => {

    const [currNav, setCurrNav] = useState('dashboard')

    const components = {
        dashboard: <PatientDashboard/>,
        appointments: <PatientAppointment setCurrNav={setCurrNav} />,
        book: <AppointmentForm setCurrNav={setCurrNav} />
    }

  return (
    <div>
      <Sidebar activeId="dashboard" setCurrNav={setCurrNav} />
        <div className='ml-[260px]'>
            {components[currNav]}
        </div>
    </div>
  )
}

export default PatientPage
