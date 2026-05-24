import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    blood: {
      type: String,
    },
    medicalInfo: {
      conditions: String,
      allergies: [String],
      medicalHistory: String,
    },
  emergancyContact: {
    relation: String,
    name: String,
    phone: String
  },
},{ timestamps: true });

const Patient = mongoose.model('Patient', patientSchema)

export default Patient
