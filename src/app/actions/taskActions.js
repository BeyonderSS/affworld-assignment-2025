"use server"

import dbConnect from "@/lib/dbConnect"
import Task from "@/models/Task"
import mongoose from "mongoose"

export async function createTask(taskData, userId) {
  try {
    await dbConnect()

    if (!userId) {
      return {
        success: false,
        error: "User ID is required.",
      }
    }

    const { title, description, status } = taskData
    if (!title) {
      return {
        success: false,
        error: "Task title is required.",
      }
    }

    const newTask = new Task({
      title,
      description,
      status: status || "pending",
      userId,
    })

    await newTask.save()

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newTask)),
      message: "Task created successfully.",
    }
  } catch (error) {
    console.error("Error creating task:", error)

    if (error.name === "ValidationError") {
      return {
        success: false,
        error: "Validation error: " + error.message,
      }
    }

    return {
      success: false,
      error: error.message || "An unexpected error occurred while creating the task.",
    }
  }
}

export async function getTasksByUserId(userId) {
  try {
    await dbConnect()

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return {
        success: false,
        error: "Invalid user ID format",
      }
    }

    const tasks = await Task.find({ userId }).populate("userId")
    return {
      success: true,
      data: JSON.parse(JSON.stringify(tasks)),
      message: tasks.length ? "Tasks retrieved successfully." : "No tasks found for this user.",
    }
  } catch (error) {
    console.error("Error retrieving tasks:", error)

    return {
      success: false,
      error: error.message || "An unexpected error occurred while retrieving tasks.",
    }
  }
}

export async function updateTaskById(taskId, updateData) {
  try {
    await dbConnect()

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return {
        success: false,
        error: "Invalid task ID format",
      }
    }

    const task = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
      runValidators: true,
    })

    if (!task) {
      return {
        success: false,
        error: "Task not found",
      }
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(task)),
      message: "Task updated successfully.",
    }
  } catch (error) {
    console.error("Error updating task:", error)

    if (error.name === "ValidationError") {
      return {
        success: false,
        error: "Validation error: " + error.message,
      }
    }

    return {
      success: false,
      error: error.message || "An unexpected error occurred while updating the task.",
    }
  }
}

export async function deleteTaskById(taskId) {
  try {
    await dbConnect()

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return {
        success: false,
        error: "Invalid task ID format",
      }
    }

    const task = await Task.findByIdAndDelete(taskId)
    if (!task) {
      return {
        success: false,
        error: "Task not found",
      }
    }

    return {
      success: true,
      message: "Task deleted successfully.",
    }
  } catch (error) {
    console.error("Error deleting task:", error)

    return {
      success: false,
      error: error.message || "An unexpected error occurred while deleting the task.",
    }
  }
}

