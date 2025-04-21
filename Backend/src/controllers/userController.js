import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const secretKey = process.env.SECRET_KEY;

export const loginController = async (req, res) => {
  try {
    const { password, email } = req.body;
    const userExist = await userModel.findByEmail(email);
    if (!userExist || !(await compare(password, user.password))) {
      res.status(401).json({ error: "Authentication failed" });
    } else {
      const token = jwt.sign({ userId: userExist.id }, secretKey, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true,
      });
      res.status(200).json({ message: "user logged in", userId: userExist.id });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (user) {
      res.status(409).json({ error: "email is already exist" });
    } else {
      const hashed_pass = await hash(password, 10);
      const user = await userModel.create({
        username,
        email,
        password: hashed_pass,
      });
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true,
      });
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "logged out" });
};

export const authController = async (req, res) => {
  try {
    const user = userModel.userData(req.userId);
    res.json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
