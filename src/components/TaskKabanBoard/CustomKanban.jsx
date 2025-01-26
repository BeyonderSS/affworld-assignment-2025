"use client"

import React, { useState, useEffect } from "react"
import { Board } from "./Board"
import { createTask, getTasksByUserId, updateTaskById, deleteTaskById } from "@/app/actions/taskActions"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const COLUMNS = [
  { id: "pending", title: "Pending", headingColor: "text-yellow-500" },
  { id: "completed", title: "Completed", headingColor: "text-blue-500" },
  { id: "done", title: "Done", headingColor: "text-green-500" },
]

export const CustomKanban = ({ userId }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchTasks()
  }, []) // Removed userId from dependencies

  const fetchTasks = async () => {
    setLoading(true)
    const result = await getTasksByUserId(userId)
    if (result.success) {
      setTasks(result.data)
    } else {
      setError(result.error)
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
    setLoading(false)
  }
  console.log(tasks)

  const handleTaskMove = async (newTasks) => {
    const movedTask = newTasks.find((task, index) => task._id !== tasks[index]?._id)
    if (movedTask) {
      const result = await updateTaskById(movedTask._id, { status: movedTask.status })
      if (result.success) {
        setTasks(newTasks)
        toast({
          title: "Success",
          description: "Changed status successfully",
          variant: "",
        })
        console.log(result)
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    }
  }

  const handleTaskAdd = async (newTask) => {
    const result = await createTask(newTask, userId)
    if (result.success) {
      setTasks((prev) => [...prev, result.data])
      toast({
        title: "Success",
        description: "Task created successfully",
      })
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const handleTaskDelete = async (taskId) => {
    const result = await deleteTaskById(taskId)
    if (result.success) {
      setTasks((prev) => prev.filter((t) => t._id !== taskId))
      toast({
        title: "Success",
        description: "Task deleted successfully",
      })
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-red-500">{error}</p>
          <button onClick={fetchTasks} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      <Board
        tasks={tasks}
        columns={COLUMNS}
        setTasks={handleTaskMove}
        onTaskAdd={handleTaskAdd}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  )
}

