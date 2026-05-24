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
import ProfileSettings from '../../components/form/ProfileSettings'
import { patientNav } from '../../constant/constData'

const PatientPage = () => {

    const [currNav, setCurrNav] = useState('dashboard')
    const [prescriptionData, setPrescriptionData] = useState([])
    console.log(prescriptionData)
    const components = {
        dashboard: <PatientDashboard setCurrNav={setCurrNav} />,
        doctors: <PatientDoctor setCurrNav={setCurrNav} />,
        // book: <BookAppointmentForm setCurrNav={setCurrNav} />,
        appointments: <Appointments/>,
        prescriptions: <Prescriptions setPrescriptionData={setPrescriptionData} setCurrNav={setCurrNav} />,
        prescriptionDetail: <PrescriptionDetail prescriptionData={prescriptionData} setCurrNav={setCurrNav}/>,
        // reports: <Reports/>,
        chatBot: <AIHealthAssistant/>,
        profile: <ProfileSettings/>
    }

  return (
    <div>
      <Sidebar NAV_ITEMS={patientNav} activeId={currNav} currNav={currNav} setCurrNav={setCurrNav} />
        <div className='lg:ml-[260px]'>
            {components[currNav]}
        </div>
    </div>
  )
}

export default PatientPage
