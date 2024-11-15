// src/App.jsx
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.jsx';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('title');

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskTitle,
        completed: false,
        priority: 'medium',
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Change priority of a task
  const setTaskPriority = (id, priority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority } : task
      )
    );
  };

  return (
    <div className="app max-w-4xl mx-auto p-6">

      <h1 className='text-2xl font-bold text-center'>Task Manager</h1>
      {/* Task Input */}
      <div className="task-input flex items-center mb-6 mt-6">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add new task"
          className="input-field flex-grow p-3 border border-gray-300 rounded-lg mr-4"
        />
        <button
          onClick={addTask}
          className="add-task-btn p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Add Task
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar mb-6">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Sort Options */}
      <div className="sort-options mb-6">
        <button
          onClick={() => setSortOrder('title')}
          className="sort-btn p-3 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-600 transition"
        >
          Sort by Title
        </button>
        <button
          onClick={() => setSortOrder('priority')}
          className="sort-btn p-3 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-600 transition"
        >
          Sort by Priority
        </button>
        <button
          onClick={() => setSortOrder('date')}
          className="sort-btn p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Sort by Date
        </button>
      </div>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        searchQuery={searchQuery}
        sortOrder={sortOrder}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
        setTaskPriority={setTaskPriority}
      />
    </div>
  );
};

export default App;
