const Article = require("../Models/Article");

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ name: 1 });
    res.status(200).json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

// Get a single article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ msg: "Article not found" });
    }

    return res.status(200).json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create an Article

exports.createArticle = async (req, res) => {
  try {
    const { title, body, date, hidden } = req.body;
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
