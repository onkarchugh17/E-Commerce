import express from "express";
import bodyParser from "body-parser";
import { fetchUserById, updateUser } from "../controller/user.js";

const userRoutes = express.Router();

export default userRoutes
  .get("/:id", fetchUserById)
  .patch("/:id", bodyParser.json(), updateUser);
