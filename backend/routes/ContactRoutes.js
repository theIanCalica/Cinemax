const express = require("express");
const router = express.Router();
const contactController = require("../Controllers/ContactController");

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
