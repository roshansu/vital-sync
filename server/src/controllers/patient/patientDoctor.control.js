// controllers/patient/doctor.control.js

import Doctor from "../../models/doctor.js";
import Slot from "../../models/Slot.js";

// export const getAllDoctors = async (req, res) => {
//     try {

//         // query params
//         const { specialty } = req.query;

//         // base query
//         let query = {};

//         // filter by specialty if provided
//         if (specialty) {
//             query = {
//                 "doctor.specialization": specialty
//             };
//         }

//         // fetch doctors
//         let doctors = await Slot.find()
//             .populate({
//                 path: "doctor",
//                 match: specialty
//                     ? { specialization: specialty }
//                     : {}
//             });

//         // remove unmatched doctors
//         doctors = doctors.filter((item) => item.doctor);

//         // format response
//         const formattedDoctors = doctors.map((item, index) => {

//             const formattedSlots = {};

//             item.weeklySlots.forEach((slotItem) => {
//                 formattedSlots[slotItem.day] = slotItem.slots;
//             });

//             return {
//                 id: index + 1,

//                 doctorId: item.doctor._id,

//                 name: item.doctor.name,

//                 specialty: item.doctor.specialization,

//                 experience: `${item.doctor.experience} years experience`,

//                 rating: item.doctor.rating,

//                 fee: `$${item.doctor.fee}.00`,

//                 availability: item.availability,

//                 img: item.doctor.image,

//                 slots: formattedSlots
//             };
//         });

//         return res.status(200).json({
//             success: true,
//             total: formattedDoctors.length,
//             data: formattedDoctors
//         });

//     } catch (error) {

//         return res.status(500).json({
//             success: false,
//             message: "Failed to fetch doctors",
//             error: error.message
//         });
//     }
// };

export const getAllDoctors = async (req, res) => {
  try {
    // const ress = await Slot.find().populate('doctor', 'userId')

    const slots = await Slot.find()

      .populate({
        path: "doctor",

        match: {
          available: true,
          isApproved: true,
        },

        select: "userId specialization qualification experience available id",

        populate: {
          path: "userId",

          select: "firstName lastName bio imageUrl",
        },
      });

    const availableDoctors = slots.filter((slot) => slot.doctor);

    res.status(200).json({
      success: true,
      message: "Data fetched",
      data: availableDoctors,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Data not fetched" + err,
    });
  }
};
