const Movie = require("../Models/Movie");
const Genre = require("../Models/Genre");

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ title: 1 });
    res.status(200).json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get single movie by ID
exports.getSingleMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create a new movie
exports.createMovie = async (req, res) => {
  const { genre, title, description, release_date, duration, image } = req.body;

  if (
    !genre ||
    !title ||
    !description ||
    !release_date ||
    !duration ||
    !image
  ) {
    res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const result = await cloudinary_js_config.uploader.upload(image, {
      folder: "movies",
    });

    const newMovie = new Movie({
      genre,
      title,
      description,
      release_date,
      duration,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    const saveMovie = await newMovie.save();
    res.status(201).json(saveMovie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update a movie by ID
exports.updateMovieById = async (req, res) => {
  try {
    const currentMovie = await Movie.findById(req.params.id);

    const data = {
      genre: req.body.genre,
      title: req.body.title,
      description: req.body.description,
      release_date: req.body.release_date,
      duration: req.body.duration,
    };

    if (req.body.image !== "") {
      const imgId = currentMovie.image.public_id;

      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
      }

      const newImage = await cloudinary.uploader.upload(req.body.image, {
        folder: "movies",
      });

      data.image = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }

    res.status(200).json({ movie, success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a movie by ID
exports.deleteMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    // retrieve current img ID
    const imgId = movie.image.public_id;
    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }

    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }

    res.status(200).json({ msg: "Movie deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
