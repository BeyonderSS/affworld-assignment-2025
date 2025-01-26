import mongoose from "mongoose";

// Define the Task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, maxlength: 500 },
  status: { type: String, enum: ["pending", "completed", "done"], default: "Pending" },
  
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", // Reference to the User model
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
});

// Create or retrieve the Task model
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
