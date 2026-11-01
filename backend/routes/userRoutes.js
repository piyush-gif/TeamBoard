const express = require("express");
const router = express.Router();

const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
