"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authenticateToken_1 = require("../middleware/authenticateToken");
const userController_1 = require("../controllers/userController");
router.route("/:id").get(authenticateToken_1.authenticateToken, userController_1.getUser);
router.route("/:id").put(authenticateToken_1.authenticateToken, userController_1.updateUser);
router.route("/:id").delete(authenticateToken_1.authenticateToken, userController_1.deletedUser);
exports.default = router;
