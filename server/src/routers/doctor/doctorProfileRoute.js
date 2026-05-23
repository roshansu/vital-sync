import e from 'express'
import verifyUser from '../../middleware/verifyUser.js'
import verifyDoctor from '../../middleware/verifyDoctor.js'
import upload from '../../middleware/upload.js'
import { updateProfile, getProfile, setAvailability } from '../../controllers/doctor/doctorProfile.control.js'

const doctorProfileRoute = e.Router()

doctorProfileRoute.post('/', 
    verifyUser, 
    verifyDoctor, 
    upload.single("image"),
    updateProfile
)

doctorProfileRoute.get('/', verifyUser, verifyDoctor, getProfile)
doctorProfileRoute.post('/available', verifyUser, verifyDoctor, setAvailability)

export default doctorProfileRoute