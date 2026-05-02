import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: String,
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
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
});

const User = mongoose.model("user", userSchema);

export default User;
