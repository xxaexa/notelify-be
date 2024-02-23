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
// Read
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Requested user ID:", req.params.id);
    try {
        const userDoc = yield User_1.default.findById(req.params.id).lean();
        // if (!userDoc) {
        //   return res.status(404).send("User not found");
        // }
        // const user = userDoc as unknown as UserPayload;
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
        const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).send(updatedUser);
    }
    catch (error) {
        res.status(404).send(error);
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
