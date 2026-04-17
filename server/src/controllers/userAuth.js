import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtKey } from '../lib/constants.js'
import validate from '../lib/validate.js'
import User from '../models/user.js'
import redisClient from '../config/redis.js'


export const register = async(req, res)=>{
    try{ 
        // console.log(req.body)
        const {email, password, firstName, lastName} = req.body
       
        validate(req.body)

        const isExist = await User.findOne({email})

        if(isExist){
            res.status(200).send({message: "email already exists", success: false})
            return
        }

        req.body.password = await bcrypt.hash(password, 10)

        const user = await User.create(req.body)

        const token = jwt.sign({email, _id: user._id, role: "user"}, jwtKey, {expiresIn: "7d"})
        // res.cookie("token", token)
        const userData = {
            email,
            firstName,
            lastName,
            role: isExist.role,
            token
        }
        console.log(userData)
        res.status(200).send({message: "user registered", success: true, userData})
        
    }catch(err){
        res.status(500).send({message: "Something went wrong", success: false, err: err.message})
    }
}

export const login = async(req, res)=>{
    try{
        const {email, password} = req.body
        // console.log(req.body)
        if(!email || !password){
            res.status(200).send({message: "missing fields", success: false})
            return
        }
        const isExist = await User.findOne({email})
        // console.log(isExist)
        if(!isExist){
            res.status(200).send({message: "invalid email or password", success: false})
            return
        }
        const isAllowed = await bcrypt.compare(password, isExist.password)

        if(!isAllowed){
            res.status(200).send({message: "Invalid email or password", success: false})
            return
        }

        const token = jwt.sign({email, _id: isExist._id,  role: isExist.role}, jwtKey, {expiresIn: '7d'})
        // res.cookie("token", token)
        const userData = {
            email,
            firstName: isExist.firstName,
            lastName: isExist.lastName,
            role: isExist.role,
            token
        }
        //  console.log(userData)
        res.status(200).send({message: "login success", success: true, userData})

    }catch(err){
        res.status(500).send({message: "something went wrong", success: false, err: err.message})
    }
}

export const logout = async(req, res)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1] || {}
        // console.log(token)
        const payload = jwt.decode(token)

        const {exp} = payload

        await redisClient.set(`token:${token}`, "blocked")
        await redisClient.expireAt(`token:${token}`, exp)
        // console.log("redis")
        // res.cookie("token",null, {expiresIn: Date.now()})
        res.status(200).send({message: "logout success", success: true})
    }catch(err){
        res.status(500).send({message: "logout failed", success: false, err: err.message})
    }
}