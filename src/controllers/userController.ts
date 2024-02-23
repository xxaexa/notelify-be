import { Request, Response } from "express";
import User from "../models/User";
import { UserPayload } from "../types";

// Read
export const getUser = async (req: Request, res: Response) => {
  console.log("Requested user ID:", req.params.id);
  try {
    const userDoc = await User.findById(req.params.id).lean();
    // if (!userDoc) {
    //   return res.status(404).send("User not found");
    // }
    // const user = userDoc as unknown as UserPayload;
    res.status(200).send(userDoc);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(404).send(error);
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
