const express = require("express");

const router = express.Router();

// Get all articles
router.get("/", (req, res) => {
  res.json({ mssg: "Get all articles" });
});

// Get a single article
router.get("/:id", (req, res) => {
  res.json({ mssg: "Get single article" });
});

// Create an article
router.post("/", (req, res) => {
  res.json({ mssg: "Created" });
});

// Update an article
router.patch("/id", (req, res) => {
  res.json({ mssg: "updated" });
});

// Delete an article
router.delete("/:id", (req, res) => {
  res.json({ mssg: "deleted a workout" });
});

module.exports = router;
