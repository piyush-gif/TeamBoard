const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");
const RefreshToken = require("../models/refreshTokenSchema");

const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, phone });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Enter both email and password" });
  }
  try {
    const user = await User.findOne({ email });
    const hashed = await bcrypt.compare(password, user.password);
    if (!user || !hashed) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const accessToken = jwt.sign({ sub: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { sub: user._id },
      process.env.REFRESH_TOKEN,
      { expiresAt: "7d" },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
