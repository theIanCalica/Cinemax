const jwt = require("jsonwebtoken");
const User = require("../Models/User"); // Assuming you have a User model to query the database

// Middleware to authenticate the token and check if the user exists
const authenticateTokenAndUser = async (req, res, next) => {
  try {
    // Extract token from the Authorization header (Bearer <token>)
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res
        .status(403)
        .json({ message: "Access Denied: No Token Provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract user ID from the decoded token
    const userId = decoded.id;

    // Check if the user exists in the database
    const user = await User.findById(userId); // Use your ORM or database query method

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user exists, attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors (token verification, database errors)
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid Token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    }
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = authenticateTokenAndUser;
