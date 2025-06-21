const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getUser,
  updateUser,
  deleteUser,
  logout,
  imageUpload,
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/imageUploadMiddleware");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", authMiddleware, logout);
router.get("/getUser", authMiddleware, getUser);
router.put("/updateUser", authMiddleware, updateUser);
router.delete("/deleteUser", authMiddleware, deleteUser);
router.post("/imageUpload", authMiddleware, upload, imageUpload);

module.exports = router;
