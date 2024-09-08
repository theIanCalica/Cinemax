require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const nodemailer = require("nodemailer");

// Include routes
const articleRoutes = require("./routes/ArticleRoutes");
const CategoryRoutes = require("./routes/CategoryRoutes");
const ContactRoutes = require("./routes/ContactRoutes");
const FoodRoutes = require("./routes/FoodRoutes");
const GenreRoutes = require("./routes/GenreRoutes");
const MovieRoutes = require("./routes/MovieRoutes");
const UserRoutes = require("./routes/UserRoutes");

// express app
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/articles", articleRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/contacts", ContactRoutes);
app.use("/api/foods", FoodRoutes);
app.use("/api/genres", GenreRoutes);
app.use("/api/movies", MovieRoutes);
app.use("/api/users", UserRoutes);

mongoose
  .connect(process.env.MONG_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
