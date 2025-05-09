import React, { useState } from "react";

const DragDropBoard = () => {
  const [tasks, setTasks] = useState({
    todo: ["Task 1", "Task 2"],
    inProgress: ["Task 3"],
    completed: ["Task 4"],
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [sourceColumn, setSourceColumn] = useState(null);

  const handleDragStart = (column, task) => {
    setDraggedTask(task);
    setSourceColumn(column);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // allow drop
  };

  const handleDrop = (targetColumn) => {
    if (!draggedTask || !sourceColumn) return;

    if (sourceColumn === targetColumn) return;

    const updatedTasks = { ...tasks };

    // Remove task from source
    updatedTasks[sourceColumn] = updatedTasks[sourceColumn].filter(
      (t) => t !== draggedTask
    );

    // Add to target
    updatedTasks[targetColumn] = [...updatedTasks[targetColumn], draggedTask];

    setTasks(updatedTasks);
    setDraggedTask(null);
    setSourceColumn(null);
  };

  const renderColumn = (title, columnKey, color) => (
    <div
      className={`flex-1 p-4 rounded shadow bg-${color}-100`}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(columnKey)}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {tasks[columnKey].map((task, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={() => handleDragStart(columnKey, task)}
            className="p-3 bg-white rounded shadow cursor-move hover:bg-gray-100"
          >
            {task}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Kanban Board</h1>
      <div className="flex space-x-4">
        {renderColumn("Todo", "todo", "red")}
        {renderColumn("In Progress", "inProgress", "yellow")}
        {renderColumn("Completed", "completed", "green")}
      </div>
    </div>
  );
};

export default DragDropBoard;
