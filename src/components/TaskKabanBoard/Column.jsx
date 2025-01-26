import React, { useState } from "react"
import { motion } from "framer-motion"
import { Task } from "./Task"
import { DropIndicator } from "./DropIndicator"
import { AddTask } from "./AddTask"

export const Column = ({ title, headingColor, tasks, column, setTasks, onTaskAdd }) => {
  const [active, setActive] = useState(false)

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task._id)
  }

  const handleDragEnd = (e) => {
    const taskId = e.dataTransfer.getData("taskId")

    setActive(false)
    clearHighlights()

    const indicators = getIndicators()
    const { element } = getNearestIndicator(e, indicators)

    const before = element.dataset.before || "-1"

    if (before !== taskId) {
      let copy = [...tasks]

      let taskToTransfer = copy.find((t) => t._id === taskId)
      if (!taskToTransfer) return
      taskToTransfer = { ...taskToTransfer, status: column }

      copy = copy.filter((t) => t._id !== taskId)

      const moveToBack = before === "-1"

      if (moveToBack) {
        copy.push(taskToTransfer)
      } else {
        const insertAtIndex = copy.findIndex((el) => el._id === before)
        if (insertAtIndex === undefined) return

        copy.splice(insertAtIndex, 0, taskToTransfer)
      }

      setTasks(copy)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    highlightIndicator(e)

    setActive(true)
  }

  const clearHighlights = (els) => {
    const indicators = els || getIndicators()

    indicators.forEach((i) => {
      i.style.opacity = "0"
    })
  }

  const highlightIndicator = (e) => {
    const indicators = getIndicators()

    clearHighlights(indicators)

    const el = getNearestIndicator(e, indicators)

    el.element.style.opacity = "1"
  }

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect()

        const offset = e.clientY - (box.top + DISTANCE_OFFSET)

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child }
        } else {
          return closest
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    )

    return el
  }

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`))
  }

  const handleDragLeave = () => {
    clearHighlights()
    setActive(false)
  }

  const filteredTasks = tasks.filter((t) => t.status === column)

  return (
    <div className="w-72 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400 dark:text-neutral-500">{filteredTasks.length}</span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-100 dark:bg-neutral-800/50" : "bg-transparent"
        }`}
      >
        {filteredTasks.map((t) => (
          <Task key={t._id} {...t} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId={null} column={column} />
        <AddTask column={column} onTaskAdd={onTaskAdd} />
      </div>
    </div>
  )
}

