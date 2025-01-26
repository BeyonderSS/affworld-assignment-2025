import React from "react"
import { motion } from "framer-motion"
import { DropIndicator } from "./DropIndicator"

export const Task = ({ title, description, _id, status, handleDragStart }) => {
  return (
    <>
      <DropIndicator beforeId={_id} column={status} />
      <motion.div
        layout
        layoutId={_id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, description, _id, status })}
        className="cursor-grab rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-1">{title}</h4>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
      </motion.div>
    </>
  )
}

