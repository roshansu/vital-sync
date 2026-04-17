import mongoose from "mongoose";
import { mongoApi } from "../lib/constants.js";

const connectDb = async()=>{
    try{
        await mongoose.connect(mongoApi)
        console.log("DB connected")
    }catch(err){
        console.log("err: "+err)
    }
}

export default connectDb