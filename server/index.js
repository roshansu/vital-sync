import e from "express";
import cookieParser from "cookie-parser";
import connectDb from "./src/config/db.js";
import userRouter from "./src/routers/userRoute.js";
import patientRoute from "./src/routers/patient/patientRoute.js";
import patientAppointmentRoute from "./src/routers/patient/patientAppointmentRoute.js";
import patientDoctoRouter from "./src/routers/patient/patientDoctorRoute.js";
import patientPrescriptionRoute from "./src/routers/patient/patientPrescriptionRouter.js";
import doctorRoute from "./src/routers/doctor/doctorRoute.js";
import redisClient from "./src/config/redis.js";
import cors from 'cors'
import doctorProfileRoute from "./src/routers/doctor/doctorProfileRoute.js";
import doctorAppointmentRoute from "./src/routers/doctor/doctorAppoitmentRoute.js";

const app = e();
const PORT = 5000;

app.use(e.json({ limit: '10mb', type: 'application/json' }));
app.use(e.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors())
app.use(cookieParser());

app.use('/api/user', userRouter)
app.use('/api/patient', patientRoute)
app.use('/api/patient/prescription', patientPrescriptionRoute)
app.use('/api/patient/appointment', patientAppointmentRoute)
app.use('/api/patient/doctor', patientDoctoRouter)


app.use('/api/doctor', doctorRoute)
app.use('/api/doctor/profile', doctorProfileRoute)

app.use('/api/doctor/appointment', doctorAppointmentRoute)

const initialize = async () => {
  try {
    await Promise.all([connectDb(), redisClient.connect()]);
    app.listen(PORT, () => {
      console.log("Server is listening", PORT);
    });
  } catch (err) {
    console.log("err: " + err);
  }
};

initialize();
