// controllers/appointmentController.js

import Appointment from "../../models/appointment.js";
import PatientStats from "../../models/patientStats.js";
import Address from "../../models/address.js";
import Slot from "../../models/Slot.js";

// CREATE APPOINTMENT
export const createAppointment = async (req, res) => {
  try {
    const {
        name,
        imageUrl,
        specialization,
      doctorId,
      userId,
      slotId,
      reason,
      type,
      date,
      time,
      fee,
      payment,
      street,
      city,
      state,
      postalCode,
    } = req.body;

    // patient from token
    const patient = req.user._id;

    // validation
    if (!doctorId || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    let address = patient;

    if (type !== "online") {
      const resp = await Address.create({
        street,
        userId: patient,
        city,
        state,
        postalCode,
      });
      address = resp._id;
    }

    // create appointment
    const appointment = await Appointment.create({
      patient,
      doctorId,
      userId,
      date,
      time,
      type,
      reason,
      fee,
      address,
      paymentType: payment,
    });

    console.log("date", new Date(date))

    const endTime =
        time.split(":")[0] +
        ":" +
        (Number(time.split(":")[1]) + 30);

    await Slot.findOneAndUpdate(
      { _id: slotId },

      {
        $push: {
          breakTime: {
            start: time,
            end: endTime,
            label: date,
          },
        },
      },
    );

    // update patient stats
    await PatientStats.findOneAndUpdate(
      { Id: patient },
      {
        $inc: {
          upcomingAppointment: 1,
        },
        $push: {
          "recentActivity.lastAppointment": {
            title: name,
            subTitle: date,
            id: appointment._id,
          },
          nextAppointment:{
            name,
            date,
            time,
            imageUrl,
            specialization: specialization[0]
          }
        },
      },
      { upsert: true, new: true },
    );

    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create appointment",
      error: error.message,
    });
  }
};

// GET ALL APPOINTMENTS OF PATIENT
export const getPatientAppointments = async (req, res) => {
  try {
    const patientId = req.user._id;

    const appointments = await Appointment.find({
      patient: patientId,
    })
      .populate({
        path: "doctorId",
        select: "specialization qualification experience",
        populate: {
          path: "userId",
          select: "firstName lastName imageUrl phone",
        },
      })
      .sort({ appointmentDate: -1 });

    return res.status(200).json({
      success: true,
      total: appointments.length,
      data: appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

// GET SINGLE APPOINTMENT
export const getSingleAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
      .populate("patient", "name email")
      .populate("doctor", "name email")
      .populate("prescription")
      .populate("report");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch appointment",
      error: error.message,
    });
  }
};

// UPDATE APPOINTMENT STATUS
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = status;

    await appointment.save();

    return res.status(200).json({
      success: true,
      message: "Appointment status updated",
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update appointment",
      error: error.message,
    });
  }
};

// DELETE APPOINTMENT
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    await appointment.deleteOne();

    // decrease upcoming appointment count
    await PatientStats.findOneAndUpdate(
      { Id: appointment.patient },
      {
        $inc: {
          upcomingAppointment: -1,
        },
      },
    );

    return res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete appointment",
      error: error.message,
    });
  }
};
