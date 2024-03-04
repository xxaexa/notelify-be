import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

// Read
export const getUser = async (req: Request, res: Response) => {
  try {
    const userDoc = await User.findById(req.params.id).lean();
    res.status(200).send(userDoc);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res
        .status(400)
        .send("All fields (email, username, password) are required.");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        email,
        username,
        password: hashedPassword,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).send("User not found.");
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete
export const deletedUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send();
    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
