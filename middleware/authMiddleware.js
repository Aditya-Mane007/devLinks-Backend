const Auth = require("../models/authModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "No Token, Not Authorized",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Auth.findById(decodedToken.id).select("-password");

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }
});

module.exports = { authMiddleware };
