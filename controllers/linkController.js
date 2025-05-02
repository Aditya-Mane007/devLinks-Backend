const asyncHandler = require("express-async-handler");
const Link = require("../models/linkModel");

const getLinks = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  if (!userInfo) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  try {
    const links = await Link.find({ user: userInfo._id });

    return res.status(200).json({
      message: "Get All the links",
      links,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

const createLink = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  if (!userInfo) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  try {
    const { platform, url } = req.body || {};

    if (!platform || !url) {
      return res.status(400).json({
        message: "Please add all the fields",
      });
    }

    const link = await Link.create({
      user: userInfo._id,
      platform,
      url,
    });

    if (link) {
      return res.status(201).json({
        message: "Link created successfully",
        link,
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong, please try again in sometime",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

const updateLink = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  if (!userInfo) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  try {
    const { platform, url } = req.body || {};

    if (!platform || !url) {
      return res.status(400).json({
        message: "Please add all the fields",
      });
    }

    const { id } = req.params;

    const existingLink = await Link.findById(id);

    if (!existingLink) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    if (existingLink.user.toString() !== userInfo.id.toString()) {
      return res.status(403).json({
        message: "You do not have permission to update this link",
      });
    }

    const updatedLink = await Link.findOneAndUpdate(
      { _id: id },
      { platform, url },
      { new: true }
    );

    if (!updatedLink) {
      return res.status(404).json({
        message: "Something went wrong, please try again in some time",
      });
    }

    return res.status(200).json({
      message: "Link updated successfully",
      link: updatedLink,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

const deleteLink = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  if (!userInfo) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  try {
    const { id } = req.params;

    const existingLink = await Link.findById(id);

    if (!existingLink) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    if (existingLink.user.toString() !== userInfo.id.toString()) {
      return res.status(403).json({
        message: "You do not have permission to delete this link",
      });
    }

    const deletedLink = await Link.deleteOne({ _id: id, user: userInfo.id });

    if (deletedLink.deletedCount === 1) {
      return res.status(200).json({
        message: "Link deleted successfully",
      });
    }
    return res.status(500).json({
      message: "Something went wrong, please try again in some time",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = { getLinks, createLink, updateLink, deleteLink };
