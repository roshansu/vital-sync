import Slot from "../../models/Slot.js";
import Doctor from '../../models/doctor.js'

export const addSlot = async (req, res) => {
  try {
    const {
      activeDays,
      offDays,
      shiftStart,
      shiftEnd,
      slotDuration,
      consultFee,
      consultType,
      breakTime,
      slotId,
    } = req.body;

    console.log("slot duration",slotDuration)

    if(!req.doctor.isApproved){
      return res.status(401).json({
        success: false,
        message: "Please update your profile first, add license no. slot not added",
      });
    }

    const doctorId = req.doctor?._id;
    const userId = req.user._id
    console.log("slotId",slotId)
    if (!doctorId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized doctor",
      });
    }

    if (
      !activeDays ||
      !shiftStart ||
      !shiftEnd ||
      !slotDuration ||
      !consultFee ||
      !consultType
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are needed",
      });
    }

    if (!Array.isArray(activeDays)) {
      return res.status(400).json({
        success: false,
        message: "activeDays must be an array",
      });
    }

    if (offDays && !Array.isArray(offDays)) {
      return res.status(400).json({
        success: false,
        message: "offDays must be an array",
      });
    }

    if (breakTime && !Array.isArray(breakTime)) {
      return res.status(400).json({
        success: false,
        message: "breakTime must be an array",
      });
    }

    const slotData = {
      doctor: doctorId,
      userId,
      activeDays,
      offDays: offDays || [],
      shiftStart,
      shiftEnd,
      slotDuration: Number(String(slotDuration).split(" ")[0]),
      consultFee: Number(consultFee),
      consultType,
      breakTime: breakTime || [],
    };

    let slot;

    if (slotId) {
      slot = await Slot.findOneAndUpdate(
        {
          _id: slotId,
          doctor: doctorId,
        },
        {
          $set: slotData,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!slot) {
        return res.status(404).json({
          success: false,
          message: "Slot not found or you are not allowed to update this slot",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Slot updated successfully",
        slot,
      });
    }

    slot = await Slot.create(slotData);

    return res.status(201).json({
      success: true,
      message: "Slot added successfully",
      slot,
    });
  } catch (error) {
    console.log("Add/update slot error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const getMySlot = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized doctor",
      });
    }

    const slot = await Slot.findOne({ userId });

    console.log(slot)

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "No slot found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Slot fetched successfully",
      slot,
    });
  } catch (error) {
    console.log("Get my slot error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};