const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getUser,
  updateUser,
  deleteUser,
  logout,
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", authMiddleware, logout);
router.get("/getUser", authMiddleware, getUser);
router.put("/updateUser", authMiddleware, updateUser);
router.delete("/deleteUser", authMiddleware, deleteUser);

module.exports = router;
