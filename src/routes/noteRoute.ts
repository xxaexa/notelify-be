import express from "express";
const router = express.Router();
import { authenticateToken } from "../middleware/authenticateToken";

import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deletedNote,
} from "../controllers/noteController";

router.route("/").post(authenticateToken, createNote);
router.route("/").get(authenticateToken, getNotes);
router.route("/:id").get(authenticateToken, getNote);
router.route("/:id").put(authenticateToken, updateNote);
router.route("/:id").delete(authenticateToken, deletedNote);

export default router;
