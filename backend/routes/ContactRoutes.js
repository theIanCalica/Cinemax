const express = require("express");
const router = express.Router();
const contactController = require("../Controllers/ContactController");
const authenticateTokenAndUser = require("../middleware/Auth");

// Get number of pending, in-progress and resolved for chart
router.get(
  "/pending-resolved",
  authenticateTokenAndUser,
  contactController.getPendingAndResolvedForCharts
);

// Get number of contacts per month for chart
router.get(
  "/numbersPerMonth",
  authenticateTokenAndUser,
  contactController.getNumberOfContactPerMonth
);

// Get all contacts
router.get("/", authenticateTokenAndUser, contactController.getAllContacts);

// Add Contact
router.post("/", authenticateTokenAndUser, contactController.addContact);

// Get a single contact by ID
router.get("/:id", authenticateTokenAndUser, contactController.getContactById);

// Update a contact by ID
router.put(
  "/:id",
  authenticateTokenAndUser,
  contactController.updateContactById
);

module.exports = router;
