const express = require("express");
const router = express.Router();
const authenticateTokenAndUser = require("../middleware/Auth");
const ShowtimeController = require("../Controllers/ShowtimeController");

router.get("/", authenticateTokenAndUser, ShowtimeController.GetShowtimes); // Get all showtimes
router.get(
  "/:id",
  authenticateTokenAndUser,
  ShowtimeController.GetShowtimeBasedOnMovieId
); // Get all showtime based on movie id to get the details
router.post("/", authenticateTokenAndUser, ShowtimeController.CreateShowtime); // Create a new showtime
router.put("/:id", authenticateTokenAndUser, ShowtimeController.UpdateShowtime); // Update a showtime
router.delete(
  "/:id",
  authenticateTokenAndUser,
  ShowtimeController.deleteShowtime
); // Delete a showtime

module.exports = router;
