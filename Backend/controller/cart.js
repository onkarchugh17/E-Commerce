import { Cart } from "../model/cart.js";

export const addToCart = async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const fetchCartByUser = async (req, res) => {
  const { user } = req.query;
  console.log("User is" , user)
  try {
    const cartItems = await Cart.find({ user: user })
      .populate("user")
      .populate("product");
    res.status(201).json(cartItems);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await Cart.findByIdAndDelete(id);
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("product");

    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
