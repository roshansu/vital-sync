// controllers/patient/prescription.control.js

import Prescription from "../../models/prescription.js";

// GET ALL PRESCRIPTIONS OF LOGGED IN PATIENT
export const getPatientPrescriptions = async (req, res) => {
  try {
    const patientId = req.user._id;

const prescriptions =
  await Prescription.find({
    patient: patientId,
  })

  .populate({
    path: "doctor",

    // Doctor fields
    select:
      "doctorId firstName lastName bio imageUrl",

    // Populate doctor.userId
    populate: {
      path: "doctorId",

      // User fields
      select:
        "specialization qualification experience",
    },
  });

    // formatted response

    return res.status(200).json({
      success: true,
      data: prescriptions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE PRESCRIPTION WITH FULL DETAILS
export const getSinglePrescription = async (req, res) => {
  try {
    const { id } = req.params;

    const prescription = await PatientPrescription.findById(id)
      .populate("patient", "name email age gender")
      .populate("doctor", "name email specialization")
      .populate(
        "appointment",
        "appointmentDate appointmentTime status symptoms",
      );

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: prescription,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch prescription",
      error: error.message,
    });
  }
};
