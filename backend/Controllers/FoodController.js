const Food = require("../Models/Food");
const cloudinary = require("../utils/Cloudinary");

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
exports.createFood = async (req, res) => {
  try {
    const { category, name, price, available, image } = req.body;
  } catch (err) {}
};
