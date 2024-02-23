import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userlogin = await User.findOne({ email: email });

    if (!userlogin)
      return res.status(400).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, userlogin.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: userlogin._id,
        role: userlogin.role,
      },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    const user = (userlogin as any)._doc;
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};
