import { Order } from "../model/order.js";

export const createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const doc = await order.save(req.body);
    const result = await doc.populate("user");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const fetchUserOrders = async (req, res) => {
  const { id } = req.query;
  console.log("Id is", id);
  try {
    const doc = await Order.find({ id }).populate("user");
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};  

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  console.log("ID is" , id)
  try {
    const doc = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("user");
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.query;
  try {
    const doc = await Order.findByIdAndDelete(id);
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const fetchAllOrders = async(req, res) => {
  let query = Order.find({});
  let countQuery = Order.find({});

  if (req.query._sort && req.query._order) {
    query = query.sort({
      [req.query._sort]: req.query._order === "asc" ? 1 : -1,
    });
  }
  if (req.query._page && req.query._limit) {
    const pageSize = +req.query._limit;
    const page = +req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  try {
    const doc = await query.exec();
    const totalOrders = await countQuery.countDocuments();
    res.status(201).header("X-Total-Count", totalOrders).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
}
