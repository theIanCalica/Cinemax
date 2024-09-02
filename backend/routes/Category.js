const express = require("express");
const router = express.Router();
const Category = require("../Models/Category");

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get single category
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: "Category not found!" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create category
router.post("/", async (req, res) => {
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
});

// Update Category
router.put("/:id", async (req, res) => {
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
});

// Delete Category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json({ msg: "Category Deleted!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
