const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Please add all the fields",
      });
    }

    const userExists = await Auth.findOne({ email });

    if (!userExists) {
      return res.status(404).json({
        message: "User does not exists, please create an account",
      });
    }

    if (userExists && (await bcrypt.compare(password, userExists.password))) {
      const token = generateToken(userExists._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Login Successful",
        user: {
          id: userExists._id,
          username: userExists.username,
          email: userExists.email,
        },
      });
    } else {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, please try again in sometime",
    });
  }
});

const register = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(404).json({
        message: "Please add all the fields",
      });
    }

    const userExists = await Auth.findOne({ email });

    if (userExists) {
      return res.status(404).json({
        message: "User alredy exists, Please log in instead.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const username = await email.split("@")[0];

    const newuser = await Auth.create({
      email,
      password: hashedPassword,
      username,
    });

    if (newuser) {
      return res.status(201).json({
        message: "User registerd successfully",
        user: {
          id: newuser._id,
          username: newuser.username,
          email: newuser.email,
          token: generateToken(newuser._id),
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, please try again in sometime",
    });
  }
});

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    return res.status(200).json({
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, please try again in sometime",
    });
  }
};
const getUser = asyncHandler((req, res) => {
  return res.status(200).json({
    message: "Get User Information",
    user: req.user,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { fullName } = req.body || {};

  try {
    const userInfo = req.user;

    if (!userInfo) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    const updatedUser = await Auth.findByIdAndUpdate(
      userInfo._id,
      {
        fullName: fullName,
      },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again in sometime" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  if (!userInfo) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  try {
    const deletedUser = await Auth.deleteOne({ _id: userExists._id });
    if (deletedUser.deletedCount === 1) {
      return res.status(200).json({
        message: "User deleted successfully",
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong , please try again sometime",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, please try again in sometime",
    });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

module.exports = { login, register, logout, getUser, updateUser, deleteUser };
