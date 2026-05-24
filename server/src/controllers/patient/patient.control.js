import PatientStats from '../../models/patientStats.js'
import Address from '../../models/address.js'
import Patient from '../../models/patient.js'
import User from '../../models/user.js';

export const getPatientStats = async (req, res) => {
    try {

        // patient id from params or logged in user
        const patientId = req.params.id || req.user._id;

        // find patient stats
        const stats = await PatientStats.findOne({ Id: patientId })
            .populate("recentActivity.prescription.id")
            .populate("recentActivity.lastReport.id")
            .populate("recentActivity.lastAppointment.id");

        // console.log("getPatientStats", stats)
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

export const updatePatientProfile = async(req, res)=>{
    try{

    const {
      gender,
      dob,
      bio,
      allergies,
      medHistory,
      conditions,
      bloodGroup,
      street,
      city,
      state,
      postalCode,
      name,
      relation,
      phone
    } = req.body

    const userId = req.user._id

    

    if(bio || gender || dob){
        await User.findOneAndUpdate(
            {_id: userId},
            {
                bio,
                gender,
                dob,
                isApproved: true
            }
        )
    }

    // if(postalCode){
        const adrs = await Address.findOneAndUpdate(
            {userId},
            {
            userId,
            street,
            state,
            city,
            postalCode
        })

  

    const data = await Patient.findOneAndUpdate(
        {userId: userId},
        {
            address: adrs._id,
            blood: bloodGroup,
            "medicalInfo.conditions": conditions,
            "medicalInfo.allergies": allergies,
            "medicalInfo.medicalHistory":
            medHistory,
            "emergancyContact.relation":
            relation,
            "emergancyContact.name":
            name,
            "emergancyContact.phone":
            phone,
        }
    )

    res.status(200).json({
        success: true,
        message: "Profile updated",
        data
    })

    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getPatientProfile = async(req, res)=>{
    try{

        const userId = req.user._id

        const data = await Patient.findOne({userId: userId}).populate('userId').populate('address')

        res.status(200).json({
            success: true,
            message: "Profile found",
            data
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}