const Food = require("../Models/Food");
const cloudinary = require("../utils/Cloudinary");
const upload = require("../middleware/multer");
const Category = require("../Models/Category");
const streamifier = require("streamifier");

// Get all foods
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ name: 1 });
    res.status(201).json(foods);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get single food by ID
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).sort({ name: 1 });

    if (!food) {
      return res.status(404).json({ msg: "Food not found" });
    }
    return res.status(201).json(food);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

// Get paginated foods
exports.getPaginatedFoods = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit; // Calculate items to skip
    const total = await Food.countDocuments(); // Total number of foods
    const foods = await Food.find().sort({ name: 1 }).skip(skip).limit(limit);

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      foods,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Add food
exports.createFood = [
  upload.array("images"), // Allow multiple files
  async (req, res) => {
    try {
      const { category, name, price, description, availability, quantity } =
        req.body;

      if (!category || !availability || !name || !price) {
        return res
          .status(400)
          .json({ msg: "Please provide all required fields" });
      }

      const categoryObj = await Category.findById(category);

      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ msg: "At least one image file is required." });
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

      // Upload images to Cloudinary
      const uploadToCloudinary = (file) => {
        return new Promise((resolve, reject) => {
          if (!allowedTypes.includes(file.mimetype)) {
            reject(
              new Error(
                "Invalid file type. Only JPEG, PNG, and GIF are allowed."
              )
            );
          }

          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "foods" },
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

      // Create new food entry
      const newFood = new Food({
        category: {
          id: categoryObj.id,
          name: categoryObj.name,
        },
        name,
        price,
        description,
        availability,
        quantity,
        images,
      });

      const savedFood = await newFood.save();
      res.status(200).json(savedFood);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },
];

// Update food
exports.updateFoodById = [
  upload.array("images"), // No limit on number of files
  async (req, res) => {
    try {
      const currentFood = await Food.findById(req.params.id);
      const data = {
        category: req.body.category,
        name: req.body.name,
        price: req.body.price,
        availability: req.body.availability,
      };

      if (req.files && req.files.length > 0) {
        // Delete old images
        await Promise.all(
          currentFood.images.map((img) =>
            cloudinary.uploader.destroy(img.public_id)
          )
        );

        // Upload new images
        const imageUploads = await Promise.all(
          req.files.map((file) => {
            return cloudinary.uploader.upload(file.path, { folder: "foods" });
          })
        );

        data.images = imageUploads.map((result) => ({
          public_id: result.public_id,
          url: result.secure_url,
        }));
      }

      const food = await Food.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });

      if (!food) {
        return res.status(404).json({ msg: "Food not found" });
      }

      return res.status(201).json({ msg: "Food Successfully updated", food });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  },
];

// Delete a food by ID
exports.deleteFoodById = async (req, res) => {
  try {
    // Find and delete the food by ID
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({ msg: "Food not found" });
    }

    // Iterate over each image in the images array to delete them from Cloudinary
    for (const image of food.images) {
      if (image.public_id) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }

    res.status(200).json({ msg: "Successfully deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};
