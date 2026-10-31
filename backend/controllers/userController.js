const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/userSchema");

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Invalid Id" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No user with that Id" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (!id || !data) {
    return res.status(400).json({ error: "Invalid id or data" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No user with that Id" });
    }
    const newUser = await User.create({ ...user, data });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUser, getAllUsers, updateUser };
