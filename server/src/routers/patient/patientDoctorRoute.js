import express from "express";

import { getAllDoctors } from "../../controllers/patient/patientDoctor.control.js";
import verifyUser from "../../middleware/verifyUser.js";
import verifyPatient from "../../middleware/verifyPatient.js";

const patientDoctoRouter = express.Router();

patientDoctoRouter.get("/",verifyUser, verifyPatient, getAllDoctors);

export default patientDoctoRouter