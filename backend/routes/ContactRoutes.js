const express = require("express");
const router = express.Router();
const contactController = require("../Controllers/ContactController");
const authenticateTokenAndUser = require("../middleware/Auth");

router.get(
  "/pending-resolved",
  authenticateTokenAndUser,
  contactController.getPendingAndResolvedForCharts
);

// Get all contacts
router.get("/", contactController.getAllContacts);

// Add Contact
router.post("/", contactController.addContact);

// Get a single contact by ID
router.get("/:id", contactController.getContactById);

// Update a contact by ID
router.put("/:id", contactController.updateContactById);

// Delete a contact by ID
router.delete("/:id", contactController.deleteContactById);

module.exports = router;
