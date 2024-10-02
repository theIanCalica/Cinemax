const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

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
