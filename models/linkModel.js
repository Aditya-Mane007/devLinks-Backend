const mongoose = require("mongoose");

const linkSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Auth",
    },
    platform: {
      type: String,
      required: [true, "Please add a platform"],
    },
    url: {
      type: String,
      required: [true, "Please add a url"],
    },
  },
  {
    timestamps: true,
  }
);

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
