const User = require("../Models/User");
const nodemailer = require("nodemailer");
const cloudinary = require("../utils/Cloudinary");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "iggc654@gmail.com",
    pass: "lrwd plzs ktnd kcqs",
  },
});

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
  const { fname, lname, dob, email, phoneNumber, profile, role } = req.body;

  try {
    const result = await cloudinary.uploader.upload(profile, {
      folder: "users",
    });

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

      role,
    });

    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    console.error(err.message);
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

      data.image = {
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
