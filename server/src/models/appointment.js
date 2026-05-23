import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["online", "offline"],
        default: "offline"
    },

    status: {
        type: String,
        enum: [
            "pending",
            "confirmed",
            "completed",
            "cancelled",
            "rejected"
        ],
        default: "pending"
    },

    symptoms: {
        type: String,
        trim: true
    },

    reason: {
        type: String,
        trim: true
    },

    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },
    paymentType:{
        type: String,
        enum: ["online", "offline"],
        default: "online"        
    },

    fee: {
        type: String,
        default: "N/A"
    },

    prescription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PatientPrescription"
    },

    report: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PatientReport"
        }
    ],

    meetingLink: {
        type: String
    },

    cancelledBy: {
        type: String,
        enum: ["patient", "doctor", "admin"]
    },

    cancellationReason: {
        type: String
    }

}, { timestamps: true });

const Appointment = mongoose.model(
    "Appointment",
    appointmentSchema
);

export default Appointment;