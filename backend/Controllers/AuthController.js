const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const cloudinary = require("../utils/Cloudinary");

exports.googleLogin = async (req, res) => {
  try {
    const { fname, lname, email, profile } = req.body;

    if (!profile || !fname || !lname || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      const uploadResult = await cloudinary.uploader.upload(profile, {
        folder: "user", // Optional: specify a folder in Cloudinary
      });

      // Create a new user if they don't exist
      user = new User({
        fname,
        lname,
        email,
        status: "activated",
        profilePicture: {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        }, // Save the uploaded image URL
      });
      await user.save(); // Save the user to the database
    }

    const token = user.getJwtToken(); // Generate a JWT token

    return res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    console.error("Google Login error:", err.message); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    const token = user.getJwtToken();

    return res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later.", user });
  }
};

exports.logout = (req, res) => {
  try {
  } catch (err) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { current, newPassword, confirm, user } = req.body;

    const foundUser = await User.findById(user._id);

    if (!foundUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await foundUser.comparePassword(current);

    if (!isMatch) {
      return res.status(403).json({ msg: "Current password is incorrect" });
    }

    if (newPassword !== confirm) {
      return res.status(403).json({ msg: "Password does not match" });
    }

    foundUser.password = newPassword;
    await foundUser.save();
    return res.status(200).json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};
