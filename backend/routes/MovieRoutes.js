const express = require("express");
const router = express.Router();
const MovieController = require("../Controllers/MovieController");

// Get all movies
router.get("/", MovieController.getAllMovies);

// Get a single movie by id
router.get("/:id", MovieController.getSingleMovieById);

// Create a new movie
router.post("/", MovieController.createMovie);

// Update a movie by ID
router.put("/:id", MovieController.updateMovieById);

// Delete a movie by  ID
router.delete("/:id", MovieController.deleteMovieById);

module.exports = router;
