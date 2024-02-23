import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const MONGODB_URI = "mongodb://localhost:27017/notelify";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });
