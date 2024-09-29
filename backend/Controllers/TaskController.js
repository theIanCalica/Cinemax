const Task = require("../Models/Task");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ deadline: 1 });
    res.status(201).json(tasks);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.FindById(req.params.id);

    if (!task) {
      res.status(404).json({ msg: "Task not found" });
    }
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Add task
exports.taskCreate = async (req, res) => {
  try {
    const { title, description, deadline, user, status, priority } = req.body;

    const newTask = new Task({
      title,
      description,
      deadline,
      user,
      status,
      priority,
    });

    const saveTask = await newTask.save();
    res.status(201).json({ saveTask });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update task by ID
exports.taskUpdateById = async (req, res) => {
  try {
    const { title, description, deadline, user, status, priority } = req.body;
    const task = await Task.findByAndUpdate(
      req.params.id,
      { title, description, deadline, user, status, priority },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(201).json(task);
  } catch {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Handle drag and drop of task
exports.handleDragAndDrop = async (req, res) => {
  try {
    const data = {};
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete task by ID
exports.deleteTaskById = async (req, res) => {
  try {
    const task = await Task.FindByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(201).json({ msg: "Successfully Deleted!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
