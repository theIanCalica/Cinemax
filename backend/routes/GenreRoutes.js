const express = require("express");
const router = express.Router();
const genreController = require("../Controllers/GenreController");
const authenticateTokenAndUser = require("../middleware/Auth");

// Get all genres
router.get("/", genreController.getAllGenres);

// Get a single genre by ID
router.get("/:id", authenticateTokenAndUser, genreController.getGenreById);

// Add a new genre
router.post("/", authenticateTokenAndUser, genreController.addGenre);

// Update a genre by ID
router.put("/:id", authenticateTokenAndUser, genreController.updateGenreById);

// Delete a genre by ID
router.delete(
  "/:id",
  authenticateTokenAndUser,
  genreController.deleteGenreById
);

module.exports = router;
