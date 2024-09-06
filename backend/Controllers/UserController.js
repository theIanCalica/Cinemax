const User = require("../Models/User");
const nodemailer = require("nodemailer");

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

// Delete a user
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
