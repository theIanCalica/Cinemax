const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > Date.now();
        },
        message: "Due Date must be a future date",
      },
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "tasks",
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
