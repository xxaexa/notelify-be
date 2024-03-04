"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedUser = exports.updateUser = exports.getUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Read
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDoc = yield User_1.default.findById(req.params.id).lean();
        res.status(200).send(userDoc);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getUser = getUser;
// Update
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res
                .status(400)
                .send("All fields (email, username, password) are required.");
        }
        const salt = yield bcrypt_1.default.genSalt();
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.id, {
            email,
            username,
            password: hashedPassword,
        }, {
            new: true,
        }).select("-password");
        if (!updatedUser) {
            return res.status(404).send("User not found.");
        }
        res.status(200).send(updatedUser);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.updateUser = updateUser;
// Delete
const deletedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User_1.default.findByIdAndDelete(req.params.id);
        if (!deletedUser)
            return res.status(404).send();
        res.status(200).send(deletedUser);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.deletedUser = deletedUser;
