import e from 'express'
import verifyUser from '../../middleware/verifyUser.js'
import verifyDoctor from '../../middleware/verifyDoctor.js'
import { getDoctorAppointment, updateStatusAppointment } from '../../controllers/doctor/doctorAppointment.control.js'

const doctorAppointmentRoute = e.Router()

doctorAppointmentRoute.get('/', verifyUser, verifyDoctor, getDoctorAppointment)
doctorAppointmentRoute.patch('/:status', verifyUser, verifyDoctor, updateStatusAppointment)

export default doctorAppointmentRoute