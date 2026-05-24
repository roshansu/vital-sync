import e from 'express'
import verifyUser from '../../middleware/verifyUser.js'
import verifyDoctor from '../../middleware/verifyDoctor.js'
import {getAllPatient, addPrescription, getPrescription} from '../../controllers/doctor/patientManagement.control.js'

const patientManagementRoute = e.Router()

patientManagementRoute.get('/', verifyUser, verifyDoctor, getAllPatient )
patientManagementRoute.post('/prescription', verifyUser, verifyDoctor, addPrescription)
patientManagementRoute.get('/:id', verifyUser, verifyDoctor, getPrescription)

export default patientManagementRoute