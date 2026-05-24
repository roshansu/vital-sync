import e from 'express'
import verifyUser from '../../middleware/verifyUser.js'
import verifyPatient from '../../middleware/verifyPatient.js'
import upload from '../../middleware/upload.js'
import {getPatientStats, updatePatientProfile, getPatientProfile, updatePhoto} from '../../controllers/patient/patient.control.js'

const patientRoute = e.Router()

patientRoute.get('/stats', verifyUser, verifyPatient, getPatientStats)
patientRoute.post('/profile', verifyUser, verifyPatient, updatePatientProfile)
patientRoute.get('/profile', verifyUser, verifyPatient, getPatientProfile)
patientRoute.put('/profile', verifyUser, verifyPatient, upload.single("image"), updatePhoto)

export default patientRoute