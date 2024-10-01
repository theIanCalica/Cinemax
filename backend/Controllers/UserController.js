const User = require("../Models/User");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cloudinary = require("../utils/Cloudinary");
const streamifier = require("streamifier");
const fs = require("fs");
const path = require("path");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "iggc654@gmail.com",
    pass: "lrwd plzs ktnd kcqs",
  },
});

// Check uniqueness
exports.checkUnique = async (req, res) => {
  const { email, phone } = req.query;
  try {
    let query = {};
    if (email) {
      query.email = email;
    }

    if (phone) {
      query.phone = phone;
    }

    const user = await User.findOne(query);

    if (user) {
      return res.status(200).json({ isUnique: false });
    }

    res.status(200).json({ isUnique: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all user list
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ fname: 1 });
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a single User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create a user
exports.addUser = async (req, res, next) => {
  const { fname, lname, dob, email, phoneNumber, role } = req.body;

  try {
    const newUser = new User({
      fname,
      lname,
      dob,
      email,
      phoneNumber,
      role,
    });

    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    console.log(err.message);

    res.status(500).send("Server Error");
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);

    const data = {
      fname: req.body.fname,
      lname: req.body.lname,
      dob: req.body.dob,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role,
    };

    if (req.body.profile !== "") {
      const imgId = currentUser.profile.public_id;
      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }

      const newProfile = await cloudinary.uploader.upload(req.body.profile, {
        folder: "users",
      });

      data.profile = {
        public_id: newProfile.public_id,
        url: newProfile.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ user, success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deactivateUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const data = {
      status: "deactivated",
    };

    const user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    console.log("Updated user:", user);
    res.status(200).json({ user, success: true, id: req.params.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// Delete a user
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    // retrieve current profile image id
    const imgId = user.profile.public_id;
    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
