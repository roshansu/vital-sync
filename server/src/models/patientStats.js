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

    recentActivity: {

        prescription: [
            {
                title: String,
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'PatientPrescription'
                }
            }
        ],

        lastReport: [
            {
                title: String,
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'PatientReport'
                }
            }
        ],

        lastAppointment: [
            {
                title: String,
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Appointment'
                }
            }
        ]
    }

}, { timestamps: true });

const PatientStats = mongoose.model('PatientStats', patientStatsSchema)

export default PatientStats