// models/patientPrescription.model.js

import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({

    id: Number,

    name: {
        type: String,
        required: true,
        trim: true
    },

    dosage: {
        type: String,
        required: true,
        trim: true
    },

    frequency: {
        type: String,
        required: true,
        trim: true
    },

    duration: {
        type: String,
        required: true,
        trim: true
    },

    route: {
        type: String,
        enum: [
            "oral",
            "iv",
            "im",
            "topical",
            "inhalation",
            "subcutaneous",
            "other"
        ],
        default: "oral"
    }

}, { _id: false });



const patientPrescriptionSchema = new mongoose.Schema({

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
    },

    medicines: [medicineSchema],

    instructions: {
        type: String,
        trim: true
    },

    dietTags:[ {
        type: String,
        trim: true
    }]

}, { timestamps: true });


// indexes
// patientPrescriptionSchema.index({ patient: 1 });
// patientPrescriptionSchema.index({ doctor: 1 });
// patientPrescriptionSchema.index({ appointment: 1 });


const Prescription = mongoose.model(
    "Prescription",
    patientPrescriptionSchema
);

export default Prescription;