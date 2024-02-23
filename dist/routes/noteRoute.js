"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authenticateToken_1 = require("../middleware/authenticateToken");
const noteController_1 = require("../controllers/noteController");
router.route("/").post(authenticateToken_1.authenticateToken, noteController_1.createNote);
router.route("/").get(authenticateToken_1.authenticateToken, noteController_1.getNotes);
router.route("/:id").get(authenticateToken_1.authenticateToken, noteController_1.getNote);
router.route("/:id").put(authenticateToken_1.authenticateToken, noteController_1.updateNote);
router.route("/:id").delete(authenticateToken_1.authenticateToken, noteController_1.deletedNote);
exports.default = router;
