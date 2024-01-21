import express from "express";

import {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} from "../controller/product.js";

const productRoutes = express.Router();

export default productRoutes
  .post("/storeproduct", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct);
