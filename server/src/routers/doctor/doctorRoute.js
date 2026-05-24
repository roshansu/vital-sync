import e from 'express'
import verifyUser from '../../middleware/verifyUser.js'
import verifyDoctor from '../../middleware/verifyDoctor.js'
import { addSlot, getMySlot, getStats } from '../../controllers/doctor/slot.control.js'

const doctorRoute = e.Router()

doctorRoute.post('/add-slot', verifyUser, verifyDoctor, addSlot)
doctorRoute.get('/get-slot', verifyUser, verifyDoctor, getMySlot)
doctorRoute.get('/stats', verifyUser, verifyDoctor, getStats)

export default doctorRoute