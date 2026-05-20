import PatientStats from '../../models/patientStats.js'

export const getPatientStats = async (req, res) => {
    try {

        // patient id from params or logged in user
        const patientId = req.params.id || req.user._id;

        // find patient stats
        const stats = await PatientStats.findOne({ Id: patientId })
            .populate("recentActivity.prescription.id")
            .populate("recentActivity.lastReport.id")
            .populate("recentActivity.lastAppointment.id");

        console.log("getPatientStats", stats)
        // if stats not found
        if (!stats) {
            return res.status(404).json({
                success: false,
                message: "Patient stats not found"
            });
        }

        // success response
        return res.status(200).json({
            success: true,
            data: stats
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
