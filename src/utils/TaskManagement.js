"use server"

import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import User from "@/models/User";

export async function createTask(userId, title, description) {
    try {
        await dbConnect();

        const user = await User.findById(userId);
        if (!user) {
            return { success: false, error: "User not found." };
        }

        const task = new Task({
            title,
            description,
            createdBy: userId,
        });

        await task.save();

        return { success: true, data: task, message: "Task created successfully." };
    } catch (error) {
        console.error("Error creating task:", error);
        return { success: false, error: error.message };
    }
}

export async function updateTaskStatus(taskId, newStatus) {
    try {
        await dbConnect();

        const task = await Task.findById(taskId);
        if (!task) {
            return { success: false, error: "Task not found." };
        }

        task.status = newStatus;
        await task.save();

        return { success: true, data: task, message: "Task status updated successfully." };
    } catch (error) {
        console.error("Error updating task status:", error);
        return { success: false, error: error.message };
    }
}
export async function deleteTask(taskId) {
    try {
        await dbConnect();

        const task = await Task.findById(taskId);
        if (!task) {
            return { success: false, error: "Task not found." };
        }

        await Task.deleteOne({ _id: taskId });

        return { success: true, message: "Task deleted successfully." };
    } catch (error) {
        console.error("Error deleting task:", error);
        return { success: false, error: error.message };
    }
}
