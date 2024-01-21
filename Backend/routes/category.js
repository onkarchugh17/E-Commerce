import express from "express";
import bodyParser from "body-parser";
import { createCategory , fetchCategories } from "../controller/category.js";

const categoryRoutes = express.Router();

export default categoryRoutes
  .post("/storecategory", bodyParser.json(), createCategory)
  .get("/", fetchCategories);
