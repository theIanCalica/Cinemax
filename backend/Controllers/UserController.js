const User = require("../Models/User");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cloudinary = require("../utils/Cloudinary");
const streamifier = require("streamifier");
const fs = require("fs");
const path = require("path");
const upload = require("../middleware/multer");
const sendEmail = require("../utils/Mailtrap");

// Check uniqueness
exports.checkUnique = async (req, res) => {
  try {
    const { email, id } = req.body; // Destructure id from the request body

    // Build the query: Check for email existence, excluding the user with the provided id
    const query = id ? { email, _id: { $ne: id } } : { email };

    const existingUser = await User.findOne(query);

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email is already taken", isUnique: false });
    }

    return res
      .status(200)
      .json({ message: "Email is available", isUnique: true });
  } catch (err) {
    console.error(err.message);
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
      { role: "serviceCrew" },
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
  const { fname, lname, dob, email, phoneNumber, role, password } = req.body;

  try {
    const newUser = new User({
      fname,
      lname,
      dob,
      email,
      phoneNumber,
      role,
      password,
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
    console.log(req.file); // Logs file info including buffer, mimetype, etc.
    console.log("Body:", req.body); // Logs form fields like fname, lname, etc.

    try {
      const { fname, lname, dob, email, phoneNumber } = req.body;

      // Validate input fields
      if (!fname || !lname || !dob || !email || !phoneNumber) {
        return res
          .status(400)
          .json({ msg: "Please provide all required fields." });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: "Invalid email format." });
      }

      // Validate if file is provided
      if (!req.file) {
        return res.status(400).json({ msg: "File is required." });
      }

      // Validate allowed file types
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          msg: "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
        });
      }

      // Upload the image buffer to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "auto" }, // 'auto' will automatically detect the file type
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result);
            }
          )
          .end(req.file.buffer); // Use the buffer directly for upload
      });

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ msg: "User already exists." });
      }

      // Create new user
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

      // Save new user to the database
      const user = await newUser.save();
      const token = user.getJwtToken();

      res.status(200).json({ user, token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
];

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const data = {
      fname: req.body.fname,
      lname: req.body.lname,
      dob: req.body.dob,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role,
    };

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

// update profile for both admin and user
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = {
      fname: req.body.fname,
      lname: req.body.lname,
      dob: req.body.dob,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };

    const user = await User.findByIdAndUpdate(userId, data, {
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

exports.updateProfilePic = [
  upload.single("file"),
  async (req, res) => {
    try {
      const userId = req.params.id;

      // Check if a file is provided
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      // Check if the uploaded file is an image
      if (!req.file.mimetype.startsWith("image/")) {
        return res.status(400).send("Please upload a valid image file.");
      }

      // Find the user by ID
      const user = await User.findById(userId); // Make sure to await the database query
      if (!user) {
        return res.status(404).send("User not found.");
      }

      // Check if the profile field exists on the user
      if (!user.profile) {
        return res.status(400).send("User profile not found.");
      }

      const defaultPublicId = "r9fgjtxvl5p5p1iaui43";
      const defaultUrl =
        "https://res.cloudinary.com/dwmw3iig6/image/upload/v1726394807/users/r9fgjtxvl5p5p1iaui43.jpg";

      const isDefaultProfilePic =
        user.profile.public_id === defaultPublicId &&
        user.profile.url === defaultUrl;

      // Upload the new image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "auto" }, // 'auto' will automatically detect the file type
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result);
            }
          )
          .end(req.file.buffer); // Use the buffer directly for upload
      });

      // If not default, delete the previous profile picture from Cloudinary
      if (!isDefaultProfilePic) {
        const previousPublicId = user.profile.public_id;
        if (previousPublicId && previousPublicId !== defaultPublicId) {
          // Delete the previous profile picture from Cloudinary
          await cloudinary.uploader.destroy(previousPublicId, {
            resource_type: "image",
          });
        }
      }

      // Update the user profile with the new image details
      user.profile.public_id = result.public_id;
      user.profile.url = result.secure_url; // Cloudinary URL

      await user.save(); // Save the updated user document

      res.status(200).json({
        user,
        success: true,
        message: "Successfully updated profile picture",
      });
    } catch (error) {
      console.error(error.message); // Log the error message
      res.status(500).send("Server Error");
    }
  },
];

// Send email
exports.sendEmail = async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    // Check if files exist
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: "No attachments provided." });
    }

    // Prepare attachments with correct path handling
    const attachments = req.files.map((file) => ({
      filename: file.originalname,
      path: path.normalize(file.path), // Normalizes the path, ensures it works across platforms
      contentType: file.mimetype, // Ensure the right content type
    }));

    // Send the email
    await sendEmail(to, subject, message, attachments);

    res.status(200).send({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send({ message: "Server Error" });
  }
};

// Deactivate a user
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

// Activate a user account
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
