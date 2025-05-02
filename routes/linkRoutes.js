const express = require("express");
const router = express.Router();
const {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
} = require("../controllers/linkController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/getLinks", authMiddleware, getLinks);

router.post("/createLink", authMiddleware, createLink);

router.put("/updateLink/:id", authMiddleware, updateLink);

router.delete("/deleteLink/:id", authMiddleware, deleteLink);

module.exports = router;
