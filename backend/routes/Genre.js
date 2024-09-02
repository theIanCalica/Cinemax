const express = require("express");
const router = express.Router();
const Genre = require("../Models/Genre");
const Contact = require("../Models/Contact");

// Get all genres
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get single genre
router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).json({ msg: "Genre not found" });
    }

    res.json(genre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

// Add genre
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const newGenre = new Genre({
      name,
    });

    const saveGenre = await newGenre.save();
    res.status(201).json(saveGenre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

// Update a genre
router.put("/:id", async (req, res) => {
  const { name } = req.body;

  try {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!genre) {
      return res.status(404).json({ msg: "Genre not found" });
    }

    res.json(genre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a genre
router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) {
      return res.status(404).json({ msg: "Genre not found" });
    }
    res.json({ msg: "Genre Delted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
