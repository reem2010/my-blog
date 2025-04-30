import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoute.js";

const databaseUrl = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;
const host = process.env.FrontHost;

const app = express();
app.use(
  cors({
    // origin: host,
    // credentials: true,
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("API is live!");
});

app.use("/auth", userRouter);
app.use("/posts", postRouter);

mongoose
  .connect(databaseUrl)
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((e) => {
    console.log("An error occured while connecting to database", e.message);
  });
