import express from "express";
import { createBrand, fetchBrands } from "../controller/brand.js";
import bodyParser from "body-parser";

const brandRoutes = express.Router();

export default brandRoutes
  .post("/storebrand", bodyParser.json(), createBrand)
  .get("/", fetchBrands);
