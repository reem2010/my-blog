import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoute.js";

const databaseUrl = process.env.DATABASE_URL;
const port = process.env.Port || 3000;
const host = process.env.HOST;
console.log(host);

const app = express();
app.use(
  cors({
    origin: host,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", userRouter);
app.use("/posts", postRouter);

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
