const express = require("express");
const router = express.Router();
const ArticleController = require("../Controllers/ArticleController");

// Get all articles
router.get("/", ArticleController.getAllArticles);

// Get a single article
router.get("/:id", ArticleController.getArticleById);

// Create an article
router.post("/", ArticleController.createArticle);

// Update an article
router.put("/:id", ArticleController.updateArticleById);

// Delete an article
router.delete("/:id", ArticleController.deleteArticleById);

module.exports = router;
