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

const mongoOptions = {
  dbName: process.env.DB_NAME || "test",
  maxPoolSize: 5,
  minPoolSize: 1,
  maxIdleTimeMS: 10000,
  socketTimeoutMS: 30000,
  serverSelectionTimeoutMS: 5000,
  waitQueueTimeoutMS: 5000,
  retryWrites: true,
  retryReads: true,
  heartbeatFrequencyMS: 5000,
  connectTimeoutMS: 10000,
};

let isReconnecting = false;

const handleDisconnect = () => {
  if (isReconnecting) return;
  isReconnecting = true;
  console.warn("MongoDB disconnected - attempting reconnect...");

  const reconnect = () => {
    mongoose
      .connect(databaseUrl, mongoOptions)
      .then(() => {
        isReconnecting = false;
        console.log("MongoDB reconnected successfully");
      })
      .catch((err) => {
        console.error("Reconnect failed:", err.message);
        setTimeout(reconnect, 5000);
      });
  };

  setTimeout(reconnect, 5000);
};

mongoose.connection.on("disconnected", handleDisconnect);

mongoose
  .connect(databaseUrl, mongoOptions)
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((e) => {
    console.log("An error occured while connecting to database", e.message);
  });
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

export default app;
