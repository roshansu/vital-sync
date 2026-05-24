import e from 'express'
import verifyUser from '../../middleware/verifyUser.js'
import verifyDoctor from '../../middleware/verifyDoctor.js'
import { getDoctorAppointment, updateStatusAppointment, rescheduleAppointment } from '../../controllers/doctor/doctorAppointment.control.js'

const doctorAppointmentRoute = e.Router()

doctorAppointmentRoute.get('/', verifyUser, verifyDoctor, getDoctorAppointment)
doctorAppointmentRoute.patch('/:status', verifyUser, verifyDoctor, updateStatusAppointment)
doctorAppointmentRoute.put('/', verifyUser, verifyDoctor, rescheduleAppointment)

export default doctorAppointmentRoute