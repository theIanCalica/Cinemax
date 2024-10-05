const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const cloudinary = require("../utils/Cloudinary");

exports.googleLogin = async (req, res) => {
  try {
    const { fname, lname, email, profile } = req.body; // Profile contains the picture URL

    if (!profile || !fname || !lname || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Upload the profile picture to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(profile, {
        folder: "user", // Optional: specify a folder in Cloudinary
      });

      // Create a new user if they don't exist
      user = new User({
        fname,
        lname,
        email,
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
    console.error("Login error:", error); // Log the error for debugging
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later.", user });
  }
};

exports.logout = (req, res) => {};
