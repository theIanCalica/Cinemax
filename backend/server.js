require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const nodemailer = require("nodemailer");

// Include routes
const articleRoutes = require("./routes/Article");
const ContactRoutes = require("./routes/Contact");
const GenreRoutes = require("./routes/Genre");
const CategoryRoutes = require("./routes/Category");

// express app
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/articles", articleRoutes);
app.use("/api/contacts", ContactRoutes);
app.use("/api/genres", GenreRoutes);
app.use("/api/categories", CategoryRoutes);

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
