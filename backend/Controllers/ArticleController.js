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
  const { title, body, date, hidden } = req.body;
  try {
    const newArticle = new Article({
      title,
      body,
      date,
      hidden,
    });

    const saveArticle = await newArticle.save();
    res.status(201).json(saveArticle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update an article
exports.updateArticleById = async (req, res) => {
  const data = {
    title: req.body.title,
    body: req.body.body,
    date: req.body.date,
    hidden: req.body.hidden,
  };

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
      }
    );

    if (!updatedArticle) {
      return res.status(404).json({ msg: "Article not found!" });
    }

    res.status(201).json(updatedArticle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error!");
  }
};

// Delete an article
exports.deleteArticleById = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ msg: "Article not found!" });
    }

    res.status(201).json({ msg: "Article successfully deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};
