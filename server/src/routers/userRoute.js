import e from 'express'
import { register, login, logout } from '../controllers/userAuth.js'
import verifyUser from '../middleware/verifyUser.js'

const userRouter = e.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/logout', verifyUser, logout)

export default userRouter