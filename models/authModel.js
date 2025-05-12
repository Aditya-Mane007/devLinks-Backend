const mongoose = require("mongoose");

const authSchema = mongoose.Schema(
  {
    fullName: {
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
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
