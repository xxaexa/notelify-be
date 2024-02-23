  import express from "express";
  const router = express.Router();
  import { authenticateToken } from "../middleware/authenticateToken";

  import {
    getUser,
    updateUser,
    deletedUser,
  } from "../controllers/userController";

  router.route("/:id").get(authenticateToken, getUser);
  router.route("/:id").put(authenticateToken, updateUser);
  router.route("/:id").delete(authenticateToken, deletedUser);

  export default router;
