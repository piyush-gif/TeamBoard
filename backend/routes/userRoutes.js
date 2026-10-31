const express = require("express");
const router = express.Router();

const {
  getUser,
  getAllUsers,
  updateUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.patch("/:id", updateUser);

router.delete("/:id", () => {});

module.exports = router;
