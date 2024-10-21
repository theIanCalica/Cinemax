const User = require("../Models/User");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cloudinary = require("../utils/Cloudinary");
const streamifier = require("streamifier");
const fs = require("fs");
const path = require("path");
const upload = require("../middleware/multer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "iggc654@gmail.com",
    pass: "lrwd plzs ktnd kcqs",
  },
});

// Check uniqueness
exports.checkUnique = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already taken" });
    }
    return res.status(200).json({ message: "Email is available" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server error" });
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

// Count all users
exports.countUsers = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ count: userCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve user count" });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await User.find(
      { role: "service crew" },
      "fname lname role"
    );
    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get employees",
      error: err.message,
    });
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

exports.register = [
  upload.single("file"),
  async (req, res) => {
    try {
      const { fname, lname, dob, email, phoneNumber, password } = req.body;

      if ((!fname || !lname || !dob || !email || !phoneNumber, !password)) {
        return res
          .status(400)
          .json({ msg: "Please provide all required fields." });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: "Invalid email format." });
      }

      if (!req.file) {
        return res.status(400).json({ msg: "File is required." });
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          msg: "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
        });
      }

      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ msg: "User already exists." });
      }

      const newUser = new User({
        fname,
        lname,
        dob,
        email,
        phoneNumber,
        profile: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });

      const saveUser = await newUser.save();

      res.status(200).json(saveUser);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },
];

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

// Activate account
exports.activateUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const data = {
      status: "activated",
    };

    const user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log("Updated user: ", user);
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
