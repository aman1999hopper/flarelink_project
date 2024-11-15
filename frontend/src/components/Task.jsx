import React from 'react';

const Task = ({ task, toggleTaskCompletion, deleteTask, setTaskPriority }) => {
  return (
    <div
      className={`task p-4 border ${task.completed ? 'bg-green-100 line-through' : 'bg-white'} flex justify-between items-center rounded-lg shadow-sm`}
    >
      <span
        className="task-title cursor-pointer flex-grow"
        onClick={() => toggleTaskCompletion(task.id)}
      >
        {task.title}
      </span>

      {/* Priority Selector */}
      <select
        value={task.priority}
        onChange={(e) => setTaskPriority(task.id, e.target.value)}
        className="priority-select p-2 border rounded-lg"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Delete Button */}
      <button
        onClick={() => deleteTask(task.id)}
        className="delete-btn bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
