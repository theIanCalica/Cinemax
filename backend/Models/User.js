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
        default: "",
      },
      url: {
        type: String,
        required: true,
        default: "",
      },
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      default: "Admin",
      enum: ["Admin", "User", "Moderator"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
