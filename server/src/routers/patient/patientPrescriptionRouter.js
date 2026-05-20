// routes/patient/prescription.route.js

import express from "express";

import {
    getPatientPrescriptions,
    getSinglePrescription
} from "../../controllers/patient/patientPrescription.control.js"

import verifyUser from "../../middleware/verifyUser.js";
import verifyPatient from "../../middleware/verifyPatient.js";

const patientPrescriptionRoute  = express.Router();


// GET ALL PRESCRIPTIONS
patientPrescriptionRoute .get(
    "/",
    verifyUser,
    verifyPatient,
    getPatientPrescriptions
);


// GET SINGLE PRESCRIPTION
patientPrescriptionRoute .get(
    "/:id",
    verifyUser,
    verifyPatient,
    getSinglePrescription
);

export default patientPrescriptionRoute ;