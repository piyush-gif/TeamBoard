const User = require("../models/userSchema");

const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log("it works!");
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await User.create({ name, email, password, phone });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register };
