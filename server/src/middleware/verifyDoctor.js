import Doctor from "../models/doctor.js";

const verifyDoctor = async (req, res, next) => {
    try {

        // check role
        // console.log(req.user)
        console.log("role", req.user.role)
        if (req.user.role !== "doctor") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Doctor only."
            });
        }

        const doctor = await Doctor.findOne({userId: req.user._id})

        req.doctor = doctor
        next();

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Role verification failed",
            error: error.message
        });
    }
};

export default verifyDoctor