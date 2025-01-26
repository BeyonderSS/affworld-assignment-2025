import React from "react"
import { Column } from "./Column"
import { BurnBarrel } from "./BurnBarrel"

export const Board = ({ tasks, columns, setTasks, onTaskAdd, onTaskDelete }) => {
  return (
    <div className="flex h-full w-full gap-3 overflow-scroll scrollbar-none p-12">
      {columns.map((column) => (
        <Column
          key={column.id}
          title={column.title}
          column={column.id}
          headingColor={column.headingColor}
          tasks={tasks}
          setTasks={setTasks}
          onTaskAdd={onTaskAdd}
        />
      ))}
      <BurnBarrel onTaskDelete={onTaskDelete} />
    </div>
  )
}

