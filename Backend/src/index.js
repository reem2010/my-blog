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

console.log(databaseUrl);
const app = express();
app.use(
  cors({
    origin: host,
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
  .connect(databaseUrl, {
    maxPoolSize: 5,
    minPoolSize: 1,
    maxIdleTimeMS: 10000,
    socketTimeoutMS: 30000,
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((e) => {
    console.log("An error occured while connecting to database", e.message);
  });

export default app;
