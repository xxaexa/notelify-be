import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./database/connectDB";

import authRoute from "./routes/authRoute";
import noteRoute from "./routes/noteRoute";
import userRoute from "./routes/userRoute";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Server Connected" });
});

app.use("/api/auth", authRoute);
app.use("/api/notes", noteRoute);
app.use("/api/users", userRoute);

export default app;
