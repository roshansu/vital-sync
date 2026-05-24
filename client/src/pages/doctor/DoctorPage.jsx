import ScheduleManagement from "../../components/schedule/ScheduleManagement";
import DoctorProfile from "../../components/doctorProfile/DoctorProfile";
import ManageAppointments from "../../components/manageAppointment/ManageAppointments";
import PatientManagement from "../../components/patientManagement/PatientManagement";
import React, {useState} from 'react'
import {doctortNav} from '../../constant/constData'
import Sidebar from '../../components/Sidebar'
import DoctorDashboard from "../../components/doctorStats/DoctorDashboard";

const DoctorPage = () => {

    const [currNav, setCurrNav] = useState('dashboard')

    const components = {
        dashboard: <DoctorDashboard setCurrNav={setCurrNav} />,
        schedule: <ScheduleManagement setCurrNav={setCurrNav} />,
        profile: <DoctorProfile/>,
        appointments: <ManageAppointments/>,
        patients: <PatientManagement/>
        
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
