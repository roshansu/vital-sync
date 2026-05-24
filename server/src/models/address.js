import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: {
    type: String,
    default: "india"
  }
});

const Address = mongoose.model('Address', addressSchema)

export default Address