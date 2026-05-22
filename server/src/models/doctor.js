import mongoose from "mongoose";



const doctorSchema = new mongoose.Schema({
  id: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  available: {
    type: Boolean,
    default: false
  },
  license: {
    type: String,
    maxLength: 40
  },
  specialization: {
    type: [String],
    minLength: 3,
    maxLength: 40,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  qualification: {
    type: [String],
    minLength: 3,
    maxLength: 40,
    required: true,
  },
  experience: {
    type: String,
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema)
export default Doctor