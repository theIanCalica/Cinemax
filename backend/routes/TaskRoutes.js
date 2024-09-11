const express = require("express");
const router = express.Router();
const TaskController = require("../Controllers/TaskController");

// Get all task
router.get("/", TaskController.getAllTasks);

// Get single task by ID
router.get("/:id", TaskController.getTaskById);

// Create new task
router.post("/", TaskController.taskCreate);

// Update a task by ID
router.put("/:id", TaskController.taskUpdateById);

// Delete task by ID
router.delete("/:id", TaskController.deleteTaskById);

module.exports = router;
