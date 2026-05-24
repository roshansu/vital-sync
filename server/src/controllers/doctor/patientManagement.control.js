import Patient from "../../models/patient.js";
import User from "../../models/user.js";
import Doctor from "../../models/doctor.js";
import Prescription from "../../models/prescription.js";

export const getAllPatient = async (req, res) => {
  try {
    const userId = req.user._id;

    const data = await Doctor.findOne({
      userId,
    })

      .populate({
        path: "patientList",

        populate: [
          {
            path: "userId",

            select: "firstName lastName imageUrl bio gender dob",
          },

          {
            path: "address",

            select: "street city state postalCode country",
          },
        ],
      });

      res.status(200).json({
        success: true,
        message: "Data found",
        data,
      })
  } catch (err) {
    res.status(500).json({
        success: false,
        message: err.message
    })
  }
};


export const addPrescription = async (req, res) => {
  try {
    const {
      medicines,
      instructions,
      dietTags,
      userId,
      appointment,
    } = req.body;

    const doctorId = req.user._id;

    // Find existing prescription
    let prescription =
      await Prescription.findOne({
        patient: userId,
      });

    // If prescription exists -> append medicines
    if (prescription) {

      prescription.medicines.push(
        ...medicines.map((med) => ({
          id: med.id,

          name: med.name,

          dosage: med.dosage,

          frequency: med.frequency,

          duration: med.duration,

          route:
            med.route?.toLowerCase() ||
            "oral",
        }))
      );

      // Replace instructions
      prescription.instructions =
        instructions;

      // Replace diet tags
      prescription.dietTags = dietTags;

      // Optional appointment update
      if (appointment) {
        prescription.appointment =
          appointment;
      }

      await prescription.save();

    } else {

      // Create new prescription
      prescription =
        await Prescription.create({
          patient: userId,

          doctor: doctorId,

          appointment,

          medicines: medicines.map(
            (med) => ({
              id: med.id,

              name: med.name,

              dosage: med.dosage,

              frequency: med.frequency,

              duration: med.duration,

              route:
                med.route?.toLowerCase() ||
                "oral",
            })
          ),

          instructions,

          dietTags,
        });
    }

    res.status(200).json({
      success: true,
      message:
        "Prescription saved successfully",

      data: prescription,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPrescription = async(req, res)=>{
  try{
    const {id} = req.params

    const data = await Prescription.findOne({patient: id})

    res.status(200).json({
      success: true,
      message: "data found",
      data
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}