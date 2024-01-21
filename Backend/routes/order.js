import express from "express";
import bodyParser from "body-parser";
import {
  createOrder,
  fetchUserOrders,
  updateOrder,
  deleteOrder,
  fetchAllOrders
} from "../controller/order.js";

const orderRoutes = express.Router();

export default orderRoutes
  .post("/createorder", createOrder)
  .get("/", fetchUserOrders)
  .delete("/:id" , deleteOrder)
  .patch("/:id" , updateOrder)
  .get("/allorders" , fetchAllOrders);
