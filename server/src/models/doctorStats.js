import mongoose from "mongoose";

const doctorStatsSchema = new mongoose.Schema({
    doctorId:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Doctor' 
    },
    totalPatient: {
        type: Number,
        maxLength: 10000,
        default: 0
    },
    totalAppointment: {
        type: Number,
        maxLength: 10000,
        default: 0,
    },
    totalEarnings:{
        type: Number,
        maxLength: 10000,
        default: 0
    }
})

const DoctorStats = mongoose.model('DoctorStats', doctorStatsSchema)

export default DoctorStats