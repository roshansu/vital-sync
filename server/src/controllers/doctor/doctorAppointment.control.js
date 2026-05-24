import Appointment from "../../models/appointment.js";
import Doctor from "../../models/doctor.js";
import User from "../../models/user.js";
import DoctorStats from "../../models/doctorStats.js";

export const getDoctorAppointment = async (req, res) => {
  try {
    const doctorId = req.doctor._id
    const data = await Appointment.find({doctorId}).populate("patient");

    res.status(200).json({
      success: true,
      message: "data found",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "data not found" + err.message,
    });
  }
};

export const updateStatusAppointment = async (req, res) => {
  try {
    const { status } = req.params;
    const { id, patientId } = req.body;
    const doctorId = req.doctor._id;

    console.log(status);

    const data = await Appointment.findOneAndUpdate(
      { _id: id },
      {
        status,
      },
    );

    if (status === "approved") {
    //   console.log("inside", status, doctorId);
      const ress = await Doctor.findOneAndUpdate(
        { _id: doctorId },

        {
          $addToSet: {
            patientList: patientId,
          },
        },

        {
          returnDocument: "after",
        },
      );

      await DoctorStats.findOneAndUpdate({doctorId}, {
        $inc: {
            totalPatient: 1
        }
      })

      // console.log(ress)
    }

    res.status(200).json({
      success: true,
      message: "Updated",
      data,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export const rescheduleAppointment = async (req, res) => {
  try {
    const { date, time, note, id } = req.body;
    console.log(note);
    const data = await Appointment.findOneAndUpdate(
      { _id: id },
      {
        date,
        time,
        rescheduleReason: note,
        reschedule: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "rescheduled success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
