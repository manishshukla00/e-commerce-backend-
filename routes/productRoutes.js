import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  productPhoto,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProduct
);
router.get("/create-product", createProduct);
router.get("/all-products", getAllProduct);
router.get("/get-product/:slug", getSingleProduct);
router.get("/product-photo/:pid", productPhoto);
router.delete("/delete-product/:pid", deleteProduct);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProduct
);

export default router;
