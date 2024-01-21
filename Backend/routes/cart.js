import express from "express";
import {
  addToCart,
  fetchCartByUser,
  updateCart,
  deleteFromCart,
} from "../controller/cart.js";
import bodyParser from "body-parser";

const cartRouter = express.Router();

export default cartRouter
  .post("/addtocart", addToCart)
  .get("/", fetchCartByUser)
  .patch("/:id", updateCart)
  .delete("/:id", deleteFromCart);
