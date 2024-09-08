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
    const result = await cloudinary.uploader.upload(image, {
      folder: "foods",
    });

    const newFood = new Food({
      category,
      name,
      price,
      available,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    const saveFood = await newFood.save();
    res.status(201).json(saveFood);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

// Update a food by ID
exports.updateFoodById = async (req, res) => {
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
};

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
