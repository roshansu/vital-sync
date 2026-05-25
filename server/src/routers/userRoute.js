import e from 'express'
import { register, login, logout } from '../controllers/userAuth.js'
import verifyUser from '../middleware/verifyUser.js'
import authLimiter from '../middleware/authLimiter.js'

const userRouter = e.Router()

userRouter.post('/register', authLimiter, register)
userRouter.post('/login', authLimiter, login)
userRouter.get('/logout', authLimiter, verifyUser, logout)

export default userRouter