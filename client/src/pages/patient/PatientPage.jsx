import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import PatientDashboard from '../../components/patient/PatientDashboard'
import PatientDoctor from '../../components/patient/PatientDoctor'
import BookAppointmentForm from '../../components/form/BookAppointmentForm'
import Appointments from '../../components/appointment/Appointments'
import Prescriptions from '../../components/prescription/Prescriptions'
import PrescriptionDetail from '../../components/prescription/PrescriptionDetail'
import Reports from '../../components/reports/Reports'
import AIHealthAssistant from '../../components/chatBot/AIHealthAssistant'

const PatientPage = () => {

    const [currNav, setCurrNav] = useState('dashboard')

    const components = {
        dashboard: <PatientDashboard setCurrNav={setCurrNav} />,
        doctors: <PatientDoctor setCurrNav={setCurrNav} />,
        book: <BookAppointmentForm setCurrNav={setCurrNav} />,
        appointments: <Appointments/>,
        prescriptions: <Prescriptions setCurrNav={setCurrNav} />,
        prescriptionDetail: <PrescriptionDetail setCurrNav={setCurrNav}/>,
        reports: <Reports/>,
        chatBot: <AIHealthAssistant/>
    }

  return (
    <div>
      <Sidebar activeId={currNav} currNav={currNav} setCurrNav={setCurrNav} />
        <div className='lg:ml-[260px]'>
            {components[currNav]}
        </div>
    </div>
  )
}

export default PatientPage
