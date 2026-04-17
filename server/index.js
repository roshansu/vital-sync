import e from "express";
import cookieParser from "cookie-parser";
import connectDb from "./src/config/db.js";
import userRouter from "./src/routers/userRoute.js";
import redisClient from "./src/config/redis.js";
import cors from 'cors'

const app = e();
const PORT = 5000;

app.use(e.json());
app.use(cors())
app.use(cookieParser());

app.use('/api/user', userRouter)

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
