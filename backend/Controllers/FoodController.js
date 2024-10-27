const Food = require("../Models/Food");
const cloudinary = require("../utils/Cloudinary");
const upload = require("../middleware/multer");

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

// Add Food
exports.createFood = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { category, name, price, availability, quantity } = req.body;
      console.log(category);
      console.log(availability);
      if (!category || !availability || !name || !price) {
        return res
          .status(400)
          .json({ msg: "Please provide all required fields" });
      }

      if (!req.file) {
        return res.status(400).json({ msg: "File is required." });
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          msg: "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
        });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "foods",
      });

      const newFood = new Food({
        category,
        name,
        price,
        availability,
        quantity,
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });

      const savedFood = await newFood.save();
      res.status(200).json(savedFood);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },
];

exports.updateFoodById = [
  upload.single("image"),
  async (req, res) => {
    try {
      const currentFood = await Food.findById(req.params.id);

      const data = {
        category: req.body.category,
        name: req.body.name,
        price: req.body.price,
        available: req.body.available,
      };

      if (req.body.image !== "") {
        const ImgId = currentFood.image.public_id;

        if (ImgId) {
          await cloudinary.uploader.destroy(ImgId);
        }

        const newFood = await cloudinary.uploader.upload(req.body.image, {
          foler: "foods",
        });

        data.image = {
          public_id: newFood.public_id,
          url: newFood.secure_url,
        };
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
    const food = await Food.findByIdAndDelete(req.params.id);

    // Retrieve image id
    const ImgId = food.image.public_id;

    if (ImgId) {
      await cloudinary.uploader.destroy(ImgId);
    }

    if (!food) {
      return res.status(404).json({ msg: "Food not found" });
    }

    res.status(201).json({ msg: "Successfully deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};
