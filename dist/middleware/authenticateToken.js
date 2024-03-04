"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.slice(7).trim();
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json("Token is not valid!");
            }
            req.user = decoded;
            next();
        });
    }
    else {
        return res.status(401).json("You are not authenticated!");
    }
};
exports.authenticateToken = authenticateToken;
