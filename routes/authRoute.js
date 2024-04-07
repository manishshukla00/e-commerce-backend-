import express from "express";
import {
  adminAuth,
  forgotPassword,
  login,
  register,
  test,
  userAuth,
} from "../controllers/authControllers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/test", requireSignIn, isAdmin, test);
router.get("/user-auth", requireSignIn, userAuth);
router.get("/admin-auth", requireSignIn, isAdmin, adminAuth);

export default router;
