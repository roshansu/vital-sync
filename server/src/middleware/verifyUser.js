import User from "../models/user.js";
import redisClient from "../config/redis.js";
import { jwtKey } from "../lib/constants.js";
import jwt from 'jsonwebtoken'

const verifyUser = async(req, res, next)=>{
    try{
        const {token} = req.cookies
        const payload = jwt.verify(token, jwtKey)
        const {_id} = payload

        // console.log(payload)

        if(!_id){
            throw new Error("Invalid user")
        }

        const user = await User.findById({_id})
        // console.log(user)
        if(!user){
            console.log(user)
            throw new Error("User does not exist")
        }
        console.log("object")
         const isBlocked = await redisClient.exists(`token:${token}`)
        console.log(isBlocked)
        if(isBlocked){
            throw new Error("invalid token")
        }

        req.result = user
        next()

    }catch(err){
        res.status(500).send({message: "Invalid user", success: false, err: err.message})
    }
}

export default verifyUser