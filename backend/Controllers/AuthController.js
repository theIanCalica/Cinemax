const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const cloudinary = require("../utils/Cloudinary");

exports.googleLogin = async (req, res) => {
  try {
    const { fname, lname, email, profile, provider_id, provider } = req.body;

    if (!profile || !fname || !lname || !email || !provider_id) {
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
        profile: {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        },
        socialAccounts: [
          {
            provider: "google",
            provider_id, // Add the Google provider ID
          },
        ],
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

// Update fcm registration token
exports.UpdateFcmToken = async (req, res) => {
  try {
    const { _id, token } = req.body;
    // Validate inputs
    if (!_id || !token) {
      return res
        .status(400)
        .json({ message: "userID and fcmToken are required" });
    }

    // Update the user's FCM token
    const user = await User.findByIdAndUpdate(
      _id,
      { token },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "FCM token updated successfully", user });
  } catch (error) {
    console.error("Update fcm token error:", error.message); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
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
      .json({ error: "Something went wrong. Please try again later." });
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
