import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

const databaseUrl = process.env.DATABASE_URL;
const port = process.env.Port || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(databaseUrl)
  .then(() => {
    app.listen(port, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch(() => {
    console.log("An error occured while connecting to database");
  });
