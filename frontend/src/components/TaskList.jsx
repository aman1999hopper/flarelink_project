import React from 'react';
import Task from '../components/Task.jsx';

const TaskList = ({ tasks, searchQuery, sortOrder, toggleTaskCompletion, deleteTask, setTaskPriority }) => {
  const sortedTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortOrder === 'priority') {
        const priorities = ['low', 'medium', 'high'];
        return priorities.indexOf(a.priority) - priorities.indexOf(b.priority);
      } else {
        return parseInt(a.id) - parseInt(b.id);
      }
    });

  return (
    <div className="task-list space-y-4">
      {sortedTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
          setTaskPriority={setTaskPriority}
        />
      ))}
    </div>
  );
};

export default TaskList;
