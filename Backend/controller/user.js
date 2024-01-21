import { Users } from "../model/user.js";

export const fetchUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id, "name email id addresses").exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};


export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
