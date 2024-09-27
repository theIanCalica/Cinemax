const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fname: {
      type: String,
      required: "First Name is required!",
      trim: true,
    },
    lname: {
      type: String,
      required: "Last Name is required!",
      trim: true,
    },
    dob: {
      type: Date,
      required: "Date of Birth is required!",
    },
    email: {
      type: String,
      required: "Email is required!",
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: "Phone Number is required!",
      unique: true,
    },
    profile: {
      public_id: {
        type: String,
        required: true,
        default: "r9fgjtxvl5p5p1iaui43",
      },
      url: {
        type: String,
        required: true,
        default:
          "https://res.cloudinary.com/dwmw3iig6/image/upload/v1726394807/users/r9fgjtxvl5p5p1iaui43.jpg",
      },
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      default: "Customer",
      enum: ["customer", "serviceCrew"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      trim: true,
      enum: ["activated", "deactivated", "unverified"],
      default: "unverified",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
