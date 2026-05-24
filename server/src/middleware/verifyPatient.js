 const verifyPatient = async (req, res, next) => {
    try {

        // check role
        // console.log(req.user)
        // console.log("role", req.user.role)
        if (req.user.role !== "patient") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Patient only."
            });
        }

        next();

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Role verification failed",
            error: error.message
        });
    }
};

export default verifyPatient