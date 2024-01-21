  import express from "express";
  import { checkUser, createUser, loginUser } from "../controller/auth.js";
  import passport from "passport";

  const authRoutes = express.Router();

  export default authRoutes
    .post("/createuser", createUser)
    .post("/login",passport.authenticate("local"), loginUser)
    .get("/checkuser" ,passport.authenticate("jwt"), checkUser)
