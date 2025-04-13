import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Your frontend URL
    credentials: true, // Allow sending cookies
  })
);
app.use(cookieParser());

import mongoose from "mongoose";
import todoRouter from "./routes/todo.route.js";
import authRouter from "./routes/auth.route.js";

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.DATABASE_URL);
//   console.log("server run ");
// }

const uri = process.env.DATABASE_URL;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Use Routers
app.use("/todos", todoRouter);
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started on port 8080");
});
