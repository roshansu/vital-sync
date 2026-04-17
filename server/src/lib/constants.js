import dotenv from 'dotenv'
dotenv.config()

export const mongoApi = process.env.MONGO_URL
export const jwtKey = process.env.JWT_KEY
export const redisApi = process.env.REDIS_SECRET