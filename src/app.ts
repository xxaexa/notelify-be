import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoute from "./routes/authRoute";
import noteRoute from "./routes/noteRoute";
import userRoute from "./routes/userRoute";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Server Connected" });
});
app.get("/test", (req, res) => {
  console.log("Test route accessed");
  res.send("Test successful");
});

app.use("/api/auth", authRoute);
app.use("/api/notes", noteRoute);
app.use("/api/users", userRoute);

export default app;
