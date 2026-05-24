// routes/appointmentRoutes.js
import express from "express";

import {
    createAppointment,
    getPatientAppointments,
    // getSingleAppointment,
    updateAppointmentStatus,
    // deleteAppointment
} from "../../controllers/patient/appointment.control.js";

import verifyUser from "../../middleware/verifyUser.js";
import verifyPatient from "../../middleware/verifyPatient.js";

const patientAppointmentRoute = express.Router();

patientAppointmentRoute.post(
    "/create",
    verifyUser,
    verifyPatient,
    createAppointment
);

patientAppointmentRoute.get(
    "/my-appointments",
    verifyUser,
    verifyPatient,
    getPatientAppointments
);

// patientAppointmentRoute.get(
//     "/:id",
//     verifyUser,
//     getSingleAppointment
// );

patientAppointmentRoute.put(
    "/update-status/:id",
    verifyUser,
    updateAppointmentStatus
);

// patientAppointmentRoute.delete(
//     "/delete/:id",
//     verifyUser,
//     deleteAppointment
// );

export default patientAppointmentRoute;