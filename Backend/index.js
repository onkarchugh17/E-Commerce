import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/product.js";
import brandRoutes from "./routes/brand.js";
import categoryRoutes from "./routes/category.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import passport from "passport";
import session from "express-session";
import "./config/passport.js";
import { isAuth } from "./services/common.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const server = express();
server.use("/static", express.static("uploads"));
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

server.use(express.json({ limit: "10mb" }));
server.use(express.urlencoded({ extended: true, limit: "10mb" }));
server.use(bodyParser.text({ limit: "200mb" }));
server.use(bodyParser.json({ limit: "50mb", extended: true }));
server.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
server.use(bodyParser.text({ limit: "200mb" }));
server.use(cookieParser());

// Initialize Passport and session middleware
server.use(
  session({
    secret: "your_secret_here",
    resave: false,
    saveUninitialized: false,
  })
);

server.use(passport.initialize());
server.use(passport.session());

// Routes
server.use("/products", isAuth(), productRoutes);
server.use("/brand", isAuth(), brandRoutes);
server.use("/category", isAuth(), categoryRoutes);
server.use("/users", isAuth(), userRoutes);
server.use("/auth", authRoutes);
server.use("/cart", isAuth(), cartRoutes);
server.use("/order", isAuth(), orderRoutes);

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce", {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

connectToDatabase().then(() => {
  server.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
});
