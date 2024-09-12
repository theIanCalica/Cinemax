const Genre = require("../Models/Genre");

// Get all genres
exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });
    res.status(201).json(genres);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a single genre by ID
exports.getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).json({ msg: "Genre not found" });
    }

    res.status(201).json(genre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

// Add a new genre
exports.addGenre = async (req, res) => {
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
};

// Update a genre by ID
exports.updateGenreById = async (req, res) => {
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

    res.status(201).json(genre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a genre by ID
exports.deleteGenreById = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) {
      return res.status(404).json({ msg: "Genre not found" });
    }
    res.status(201).json({ msg: "Genre Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
