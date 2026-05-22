import Doctor from "../../models/doctor.js";
import Address from "../../models/address.js";
import User from "../../models/user.js";
import compressImage from "../../utils/compressImage.js";
import uploadToCloudinary from "../../utils/uploadToCloudinary.js";

// controllers/doctorController.js

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?._id;
    // console.log("body",req.body)

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {
      bio,
      license,
      specialization,
      qualification,
      experience,
      street,
      city,
      state,
      postalCode,
      country,
    } = req.body;

    let imageUrl = false

    // =========================
    // UPDATE USER
    // =========================

    // Compress image
    if (req.file) {
      const compressedBuffer = await compressImage(
        req.file.buffer,
        req.file.size,
      );

      // Upload image
      const uploadedImage = await uploadToCloudinary(
        compressedBuffer,
        "profile-images",
      );

      imageUrl = uploadedImage.url
    //   console.log("upload image",uploadedImage)
    }

    let updatedUser

    if(imageUrl){
    updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        bio,
        imageUrl,
      },
      {
        new: true,
        runValidators: true,
      },
    );
}
    else{
    updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        bio,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    }

    // =========================
    // UPDATE DOCTOR
    // =========================

    let approve = false

    if(license){
        approve = true
    }

    const updatedDoctor = await Doctor.findOneAndUpdate(
      { userId },

      {
        license,
        specialization,
        qualification,
        experience,

        // After profile update
        isApproved: approve,
      },

      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    console.log(updatedDoctor)
    // =========================
    // UPDATE ADDRESS
    // =========================

    let address = await Address.findOne({ userId });

    if (address) {
      address.street = street;
      address.city = city;
      address.state = state;
      address.postalCode = postalCode;
      address.country = country;

      await address.save();
    } else {
      address = await Address.create({
        userId,
        street,
        city,
        state,
        postalCode,
        country,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: updatedUser,
        doctor: updatedDoctor,
        address,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try{
    const userId = req.user._id

    let data = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phone: req.user.phone,
      imageUrl: req.user.imageUrl,
      bio: req.user?.bio || '',
      specialization:'',
      qualification:'',
      experience:'',
      license:'',
      available:'',
      isApproved:'',
      city:'',
      postalCode:'',
      street:'',
      state:'',
    }

    const [doctor, address] = await Promise.all([Doctor.findOne({userId}), Address.findOne({userId})])

    data.qualification = doctor.qualification
    data.specialization = doctor.specialization
    data.experience = doctor?.experience
    data.license = doctor.license || ''
    data.available = doctor.available
    data.isApproved = doctor.isApproved
    data.city = address?.city || ''
    data.postalCode = address?.postalCode || ''
    data.street = address?.street || ''
    data.state = address?.state || ''

    return res.status(200).json({
      success: true,
      message: "Profile Fetched",
      data
    });

  }catch(err){
      return res.status(200).json({
      success: false,
      message: "Error while fetching profile"+err,
      data: []
    });
  }
}


export const setAvailability = async (req, res) =>{
  try{
    const {available} = req.body
    const userId = req.user._id

    console.log("available", available)
    const ress = await Doctor.findOneAndUpdate({userId:userId}, {available: available})

    console.log(ress)

    res.status(200).json({
      success: true,
      message: "updated"
    })

  }catch(err){
    res.status(401).json({
      success: false,
      message: err.message
    })
  }
}