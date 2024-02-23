"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const noteRoute_1 = __importDefault(require("./routes/noteRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send({ message: "Server Connected" });
});
app.get("/test", (req, res) => {
    console.log("Test route accessed");
    res.send("Test successful");
});
app.use("/api/auth", authRoute_1.default);
app.use("/api/notes", noteRoute_1.default);
app.use("/api/users", userRoute_1.default);
exports.default = app;
