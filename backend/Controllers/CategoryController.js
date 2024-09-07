const Category = require("../Models/Category");

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: "Category not found!" });
    }

    res.status(200).json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = new Category({
      name,
    });

    const saveCategory = await newCategory.save();
    res.status(201).json(saveCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a category by ID
exports.updateCategoryById = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a category by ID
exports.deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.status(201).json({ msg: "Category Deleted!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
