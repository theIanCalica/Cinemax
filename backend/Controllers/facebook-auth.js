require("dotenv").config();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const express = require("express");
const User = require("../Models/User");
const router = express.Router();

// Configure Facebook strategy for Passport
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: [
        "id",
        "emails",
        "gender",
        "birthday",
        "first_name", // Add first_name to the profile fields
        "last_name", // Add last_name to the profile fields
        "phone", // Add phone number if available
      ],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        // Check if the user already exists
        let user = await User.findOne({
          accountId: profile.id,
          provider: "facebook",
        });

        // If the user doesn't exist, create a new one
        if (!user) {
          console.log("Adding new Facebook user to DB..");
          user = new User({
            accountId: profile.id,
            firstName: profile.first_name, // Save first name
            lastName: profile.last_name, // Save last name
            provider: profile.provider,
            gender: profile.gender, // Save gender
            dob: profile.birthday, // Save date of birth
            phone: profile.phone, // Save phone number
          });

          await user.save();
          console.log(user);
        }

        // Call the callback with the user
        return cb(null, user);
      } catch (error) {
        console.error("Error during Facebook authentication:", error);
        return cb(error);
      }
    }
  )
);

// Start the Facebook authentication process
router.get(
  "/",
  passport.authenticate("facebook", {
    scope: [
      "email",
      "public_profile",
      "user_gender",
      "user_birthday",
      "user_mobile_phone",
    ],
  })
);

// Handle the callback from Facebook
router.get(
  "/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/facebook/error",
  }),
  function (req, res) {
    // Successful authentication
    res.redirect("/auth/facebook/success");
  }
);

// Success route after authentication
router.get("/success", (req, res) => {
  // Use req.user directly to access user information
  const userInfo = {
    id: req.user.id,
    firstName: req.user.firstName, // Access first name
    lastName: req.user.lastName, // Access last name
    provider: req.user.provider,
    gender: req.user.gender, // Access gender
    dob: req.user.dob, // Access date of birth
    phone: req.user.phone, // Access phone number
  };
  res.render("fb-github-success", { user: userInfo });
});

// Error handling route
router.get("/error", (req, res) => res.send("Error logging in via Facebook.."));

// Sign out route
router.get("/signout", (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        console.error("Error logging out:", err);
        return res
          .status(400)
          .send({ message: "Failed to sign out Facebook user" });
      }
      req.session.destroy(() => {
        console.log("Session destroyed.");
        res.render("auth"); // Redirect to your authentication page
      });
    });
  } catch (err) {
    res.status(400).send({ message: "Failed to sign out Facebook user" });
  }
});

module.exports = router;
