// routes/genreRoutes.js
const express = require("express");
const router = express.Router();
const genreController = require("../Controllers/GenreController");

// Get all genres
router.get("/", genreController.getAllGenres);

// Get a single genre by ID
router.get("/:id", genreController.getGenreById);

// Add a new genre
router.post("/", genreController.addGenre);

// Update a genre by ID
router.put("/:id", genreController.updateGenreById);

// Delete a genre by ID
router.delete("/:id", genreController.deleteGenreById);

module.exports = router;
