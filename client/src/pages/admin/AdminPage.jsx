import AdminDashboard from "../../components/admin/AdminDashboard";
import Sidebar from '../../components/Sidebar'
import React from 'react'
import { useState } from "react";

const AdminPage = () => {
    const [currNav, setCurrNav] = useState('dashboard')

    const components = {
        dashboard: <AdminDashboard setCurrNav={setCurrNav} />,
        // doctors: <PatientDoctor setCurrNav={setCurrNav} />,
        // book: <BookAppointmentForm setCurrNav={setCurrNav} />,
        // appointments: <Appointments/>,
        // prescriptions: <Prescriptions setCurrNav={setCurrNav} />,
        // prescriptionDetail: <PrescriptionDetail setCurrNav={setCurrNav}/>,
        // reports: <Reports/>,
        // chatBot: <AIHealthAssistant/>,
        // profile: <ProfileSettings/>
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

export default AdminPage
