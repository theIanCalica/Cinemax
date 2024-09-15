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
const TaskRoutes = require("./routes/TaskRoutes");
const OrderRoutes = require("./routes/OrderRoutes");

// express app
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/v1/articles", articleRoutes);
app.use("/api/v1/categories", CategoryRoutes);
app.use("/api/v1/contacts", ContactRoutes);
app.use("/api/v1/foods", FoodRoutes);
app.use("/api/v1/genres", GenreRoutes);
app.use("/api/v1/movies", MovieRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/tasks", TaskRoutes);
app.use("/api/v1/orders", OrderRoutes);

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
