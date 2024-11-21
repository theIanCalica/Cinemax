const express = require("express");
const router = express.Router();
const MovieController = require("../Controllers/MovieController");
const upload = require("../middleware/multer");
const authenticateTokenAndUser = require("../middleware/Auth");

// Get all movies
router.get("/", MovieController.getAllMovies);

// Get a single movie by id
router.get("/:id", MovieController.getSingleMovieById);

// Create a new movie
router.post(
  "/",
  [authenticateTokenAndUser, upload.array("images")], // Array of middleware
  MovieController.createMovie
);

// Update a movie by ID
router.put("/:id", authenticateTokenAndUser, MovieController.updateMovieById);

// Delete a movie by  ID
router.delete(
  "/:id",
  authenticateTokenAndUser,
  MovieController.deleteMovieById
);

module.exports = router;
