import { Users } from "../model/user.js";
import bcrypt from "bcrypt";
import { sanitizeUser } from "../services/common.js";
import { SECRET_KEY } from "../services/common.js";
import jwt from "jsonwebtoken";
import user from "../routes/user.js";

export const createUser = async (req, res) => {
  const { password } = req.body;
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new Users({ ...req.body, password: hashedPassword });
    const doc = await user.save();
    req.login(sanitizeUser(doc), (err) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
        res
          .cookie("jwt", token, {
            httpOnly: true,
          })
          .status(201)
          .json(token);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const loginUser = (req, res) => {
  const { token, id, addresses, email, orders, role } = req.user;
  res
    .cookie("jwt", token, {
      expires: new Date(Date.now() + 10000),
      httpOnly: true,
    })
    .status(201)
    .json({ token, id, addresses, email, orders, role });
};

export const checkUser = (req, res) => {
  res.status(200).json(sanitizeUser(req.user));
};
