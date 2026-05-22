import ScheduleManagement from "../../components/schedule/ScheduleManagement";
import DoctorProfile from "../../components/doctorProfile/DoctorProfile";
import ManageAppointments from "../../components/manageAppointment/ManageAppointments";
import React, {useState} from 'react'
import {doctortNav} from '../../constant/constData'
import Sidebar from '../../components/Sidebar'

const DoctorPage = () => {

    const [currNav, setCurrNav] = useState('dashboard')

    const components = {
        // dashboard: <PatientDashboard setCurrNav={setCurrNav} />,
        schedule: <ScheduleManagement setCurrNav={setCurrNav} />,
        profile: <DoctorProfile/>,
        // doctors: <PatientDoctor setCurrNav={setCurrNav} />,
        // book: <BookAppointmentForm setCurrNav={setCurrNav} />,
        appointments: <ManageAppointments/>,
        // prescriptions: <Prescriptions setCurrNav={setCurrNav} />,
        // prescriptionDetail: <PrescriptionDetail setCurrNav={setCurrNav}/>,
        // reports: <Reports/>,
        // chatBot: <AIHealthAssistant/>,
        // profile: <ProfileSettings/>
    }

  return (
    <div>
      <Sidebar NAV_ITEMS={doctortNav} activeId={currNav} currNav={currNav} setCurrNav={setCurrNav} />
        <div className='lg:ml-[260px]'>
            {components[currNav]}
        </div>
    </div>
  ) 
}

export default DoctorPage
