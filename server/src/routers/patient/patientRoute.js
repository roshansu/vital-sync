import e from 'express'
import verifyUser from '../../middleware/verifyUser.js'
import verifyPatient from '../../middleware/verifyPatient.js'
import {getPatientStats} from '../../controllers/patient/patient.control.js'

const patientRoute = e.Router()

patientRoute.get('/stats', verifyUser, verifyPatient, getPatientStats)

export default patientRoute