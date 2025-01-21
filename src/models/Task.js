import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Task title
  description: { type: String }, // Detailed description of the task
  status: {
    type: String,
    enum: ["Pending", "Completed", "Done"],
    default: "Pending",
  }, // Task status
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Creator reference
  createdAt: { type: Date, default: Date.now }, // Task creation timestamp
  updatedAt: { type: Date, default: Date.now }, // Last update timestamp
});

// Indexes
taskSchema.index({ createdBy: 1 });
taskSchema.index({ status: 1 });

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
