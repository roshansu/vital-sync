import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: String,
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
  },
  dob: String,
  bio:{
    type: String,
    maxLength: 500
  },
  isApproved:{
    type: Boolean,
    default: false,
  },
  patientId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  doctorId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  addressId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  gender: {
    type: String,
    default: 'Male'
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    require: true,
    immutable: true,
    trim: true,
    unique: true,
    minLength: 10,
    maxLength: 11
  },
  imageUrl: String,
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", 'doctor', 'patient'],
    default: "patient",
    lowercase: true
  },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
