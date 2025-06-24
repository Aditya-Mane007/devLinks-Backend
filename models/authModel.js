const mongoose = require("mongoose");

const authSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Please add a username"],
    },
    email: {
      type: String,
      required: [true, "Please add an email address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a passoword"],
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
