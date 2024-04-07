import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  category,
  categoryById,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create-category", requireSignIn, isAdmin, createCategory);
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategory);
router.get("/all-category", category);
router.get("/single-category/:slug", categoryById);
router.delete("/delete-category/:id", deleteCategory);

export default router;
