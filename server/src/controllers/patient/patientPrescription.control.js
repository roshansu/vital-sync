// controllers/patient/prescription.control.js

import PatientPrescription from "../../models/prescription.js";



// GET ALL PRESCRIPTIONS OF LOGGED IN PATIENT
export const getPatientPrescriptions = async (req, res) => {
    try {

        const patientId = req.user._id;

        const prescriptions = await PatientPrescription.find({
            patient: patientId
        })
            .populate("doctor", "name specialization")
            .populate("appointment", "status appointmentDate")
            .sort({ createdAt: -1 });

        // formatted response
        const formattedPrescriptions = prescriptions.map((item) => ({
            _id: item._id,

            doctorName: item.doctor?.name,

            specialization: item.doctor?.specialization,

            status: item.appointment?.status || "Completed",

            date: item.createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            }),

            title:
                item.generalInstructions ||
                "Prescription Details"
        }));


        return res.status(200).json({
            success: true,
            total: formattedPrescriptions.length,
            data: formattedPrescriptions
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Failed to fetch prescriptions",
            error: error.message
        });
    }
};





// GET SINGLE PRESCRIPTION WITH FULL DETAILS
export const getSinglePrescription = async (req, res) => {
    try {

        const { id } = req.params;

        const prescription = await PatientPrescription.findById(id)
            .populate(
                "patient",
                "name email age gender"
            )
            .populate(
                "doctor",
                "name email specialization"
            )
            .populate(
                "appointment",
                "appointmentDate appointmentTime status symptoms"
            );

        if (!prescription) {
            return res.status(404).json({
                success: false,
                message: "Prescription not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: prescription
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Failed to fetch prescription",
            error: error.message
        });
    }
};