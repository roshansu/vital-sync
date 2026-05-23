import mongoose from 'mongoose'

const patientStatsSchema = new mongoose.Schema({
    Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    upcomingAppointment: {
        type: Number,
        max: 10000
    },

    totalVisit: {
        type: Number,
        max: 10000
    },

    pendingBill: Number,

    totalBill: Number,
    nextAppointment: {
        name: String,
        date: String,
        time: String,
        imageUrl: String,
        specialization: String,
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },

    recentActivity: {

        prescription: [
            {
                title: String,
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Prescription'
                },
                date: String,
                subTitle: String
            }
        ],

        lastReport: [
            {
                title: String,
                id: {
                    type: String
                    // type: mongoose.Schema.Types.ObjectId,
                    // ref: 'PatientReport'
                },
                subTitle: String
            }
        ],

        lastAppointment: [
            {
                title: String,
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Appointment'
                }, 
                subTitle: String
            }
        ]
    }

}, { timestamps: true });

const PatientStats = mongoose.model('PatientStats', patientStatsSchema)

export default PatientStats