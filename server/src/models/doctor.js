import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  id: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  specialization: {
    type: String,
    minLength: 3,
    maxLength: 40,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  qualification: {
    type: String,
    minLength: 3,
    maxLength: 40,
    required: true,
  },
  experience: {
    type: String,
    minLength: 1,
    maxLength: 10,
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema)
export default Doctor