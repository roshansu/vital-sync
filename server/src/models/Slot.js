import mongoose from "mongoose";

const breakSchema = new mongoose.Schema(
  {
    start: {
      type: String,
      required: true, // example: "12:00"
    },
    end: {
      type: String,
      required: true, // example: "12:30"
    },
    label: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const slotSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    activeDays: {
      type: [Number],
      required: true,
      default: [],
      // 0 = Sunday, 1 = Monday, 2 = Tuesday, etc.
    },

    offDays: {
      type: [String],
      default: [],
      // example: ["2026-05-19", "2026-05-20"]
    },

    shiftStart: {
      type: String,
      required: true,
      // example: "09:00"
    },

    shiftEnd: {
      type: String,
      required: true,
      // example: "17:00"
    },

    slotDuration: {
      type: String,
      required: true,
      // example: "30 Minutes"
    },

    consultFee: {
      type: Number,
      required: true,
      // frontend sends "120", mongoose can convert it to 120
    },

    consultType: {
      type: String,
      enum: ["Online", "Offline", "Both"],
      required: true,
      default: "Offline",
    },

    breakTime: {
      type: [breakSchema],
      default: null,
    },
  },
  { timestamps: true }
);

const Slot = mongoose.model("Slot", slotSchema);

export default Slot;