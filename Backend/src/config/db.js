import mongoose from "mongoose";

const databaseUrl = process.env.DATABASE_URL;
const mongoOptions = {
  maxPoolSize: 5,
  minPoolSize: 1,
  maxIdleTimeMS: 10000,
  socketTimeoutMS: 50000,
  waitQueueTimeoutMS: 5000,
  connectTimeoutMS: 10000,
};

let isReconnecting = false;

const handleDisconnect = () => {
  if (isReconnecting) return;
  isReconnecting = true;
  console.log("MongoDB disconnected - attempting reconnect...");

  const reconnect = () => {
    mongoose
      .connect(databaseUrl, mongoOptions)
      .then(() => {
        isReconnecting = false;
        console.log("MongoDB reconnected successfully");
      })
      .catch((err) => {
        console.log("Reconnect failed:", err.message);
        setTimeout(reconnect, 5000);
      });
  };

  setTimeout(reconnect, 5000);
};

mongoose.connection.on("disconnected", handleDisconnect);

const connectToDatabase = async () => {
  await mongoose.connect(databaseUrl, mongoOptions);
  console.log("MongoDB connected");
};

export { connectToDatabase };
