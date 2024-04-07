import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized Access" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ error: error.message });
  }
};
