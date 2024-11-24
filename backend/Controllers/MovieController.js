const Movie = require("../Models/Movie");
const streamifier = require("streamifier");
const cloudinary = require("../utils/Cloudinary");
// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate("genre").sort({ title: 1 });
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
  const {
    genre,
    title,
    description,
    price,
    release_date,
    duration,
    mainCast,
    producer,
    rating,
    director,
    writer,
    trailer,
  } = req.body;
  console.log(req.body);
  // Validate required fields
  if (
    !Array.isArray(genre) || // Ensure genre is an array
    genre.length === 0 || // Ensure the array is not empty
    !title ||
    !description ||
    !release_date ||
    !trailer ||
    !duration ||
    !req.files ||
    !mainCast ||
    !producer ||
    !rating ||
    !director ||
    !writer
  ) {
    return res.status(400).json({
      msg: "All fields are required and genre must be a non-empty array",
    });
  }

  try {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    // Upload images to Cloudinary
    const uploadToCloudinary = (file) => {
      return new Promise((resolve, reject) => {
        if (!allowedTypes.includes(file.mimetype)) {
          reject(
            new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed.")
          );
        }

        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "movies" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    };

    const imageUploads = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file))
    );

    const images = imageUploads.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));

    const rating = JSON.parse(req.body.rating);

    // Create movie document
    const newMovie = new Movie({
      genre: Array.isArray(genre) ? genre : JSON.parse(genre), // Assuming genre is sent as a JSON string
      title,
      price,
      description,
      release_date: new Date(release_date),
      duration,
      images: images,
      mainCast,
      producerName: producer,
      trailer,
      rating: rating.value, // Assuming rating is an object
      directorName: director,
      writerName: writer,
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
  const {
    genre,
    title,
    description,
    release_date,
    duration,
    mainCast,
    producer,
    rating,
    director,
    writer,
    trailer,
  } = req.body;
  try {
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a movie by ID
exports.deleteMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }

    // Loop through the array of images and delete each one
    for (const image of movie.images) {
      const imgId = image.public_id;
      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
      }
    }

    res.status(200).json({ msg: "Movie and associated images deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
