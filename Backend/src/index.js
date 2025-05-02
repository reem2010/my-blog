import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDatabase } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoute.js";

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

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

export default app;
