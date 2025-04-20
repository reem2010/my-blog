import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";

const databaseUrl = process.env.DATABASE_URL;
const port = process.env.Port || 3000;

const app = express();
console.log(process.env.HOST);
app.use(
  cors({
    origin: process.env.HOST,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", userRouter);

mongoose
  .connect(databaseUrl)
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((e) => {
    console.log("An error occured while connecting to database", e.message);
  });
