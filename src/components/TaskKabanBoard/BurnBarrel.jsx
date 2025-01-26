import React, { useState } from "react"
import { FiTrash } from "react-icons/fi"
import { FaFire } from "react-icons/fa"
import { AlertDialog } from "./AlertDialog"

export const BurnBarrel = ({ onTaskDelete }) => {
  const [active, setActive] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setActive(true)
  }

  const handleDragLeave = () => {
    setActive(false)
  }

  const handleDragEnd = (e) => {
    const taskId = e.dataTransfer.getData("taskId")
    setTaskToDelete(taskId)
    setShowAlert(true)
    setActive(false)
  }

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      onTaskDelete(taskToDelete)
      setTaskToDelete(null)
    }
    setShowAlert(false)
  }

  const handleDeleteCancel = () => {
    setTaskToDelete(null)
    setShowAlert(false)
  }

  return (
    <>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
          active
            ? "border-red-800 bg-red-800/20 text-red-500"
            : "border-neutral-300 dark:border-neutral-500 bg-neutral-100 dark:bg-neutral-500/20 text-neutral-500"
        }`}
      >
        {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
      </div>
      <AlertDialog
        isOpen={showAlert}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
      />
    </>
  )
}

