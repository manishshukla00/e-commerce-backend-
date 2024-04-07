import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name && !email && !password && !phone && !address && !answer) {
      return res.send({
        message: "All fields must required to further proceed",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .send({ message: "User already register please login", existingUser });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    return res
      .status(200)
      .send({ message: "User registered successfully", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Please fill email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not found please register",
      });
    }
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      res
        .status(404)
        .send({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successfull",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Error in login", error });
  }
};

export const test = async (req, res) => {
  res.send("Protected route");
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    const user = await User.findOne({ email, answer });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Wrong Email or Answer" });
    }
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    res
      .status(200)
      .send({ success: true, message: "Password Reset Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Something went wrong", error });
  }
};

export const userAuth = async (req, res) => {
  res.status(200).send({ ok: true });
};

export const adminAuth = async (req, res) => {
  res.status(200).send({ ok: true });
};
