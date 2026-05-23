import Appointment from "../../models/appointment.js";
import User from "../../models/user.js";


export const getDoctorAppointment = async(req, res)=>{
    try{
        const data = await Appointment.find().populate('patient')

        res.status(200).json({
            success: true,
            message: "data found",
            data
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "data not found" + err.message,
        })
    }
}

export const updateStatusAppointment = async(req, res) =>{
    try{
        const {status} = req.params
        const {id} = req.body

        const data = await Appointment.findOneAndUpdate({_id: id},
            {
                status
            }
        )

        res.status(200).json({
            success: true,
            message: "Updated",
            data
        })
    }catch(err){
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
}