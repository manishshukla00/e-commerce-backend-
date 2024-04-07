import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import colors from "colors";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

configDotenv();
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => {
    console.log(error.message);
  });

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

const PORT = process.env.port || 8080;

app.listen(PORT, () => {
  console.log("Server is listening at port :".bgCyan.white, PORT);
});
