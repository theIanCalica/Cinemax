require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// Include routes
const articleRoutes = require("./routes/ArticleRoutes");
const CategoryRoutes = require("./routes/CategoryRoutes");
const ContactRoutes = require("./routes/ContactRoutes");
const FoodRoutes = require("./routes/FoodRoutes");
const GenreRoutes = require("./routes/GenreRoutes");
const MovieRoutes = require("./routes/MovieRoutes");
const UserRoutes = require("./routes/UserRoutes");
const TaskRoutes = require("./routes/TaskRoutes");
const authRoutes = require("./routes/AuthRoutes");
const CartRoutes = require("./routes/CartRoutes");
const OrderRoutes = require("./routes/OrderRoutes");

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Allow only your frontend domain
  credentials: true, // Allow credentials (cookies, authorization headers)
};

// express app
const app = express();
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(
  "/api/v1/orders/webhook",
  bodyParser.raw({ type: "application/json" }) // Ensures raw body for Stripe webhook
);
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
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/carts", CartRoutes);
app.use("/api/v1/orders", OrderRoutes);

mongoose
  .connect(process.env.MONG_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Working and Running!!! Connected to db & listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
