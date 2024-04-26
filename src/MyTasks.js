import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  function handleInput(e) {
    setNewTask(e.target.value);
  };

  function addTask() {
    if (newTask.trim() !== '') {
      setTasks(prev => [...prev, { text: newTask, isComplete: false, isEditing: false }]);
      setNewTask('');
    };
  };

  function toggleComplete(index) {
    const updated = tasks.map((task, position) =>
      position === index ? { ...task, isComplete: !task.isComplete } : task
    );
    setTasks(updated);
  };

  function deleteTask(index) {
    const updated = tasks.filter((_, position) => position !== index);
    setTasks(updated);
  };

  function moveUp(index) {
    if (index > 0) {
      const updated = [...tasks];
      [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
      setTasks(updated);
    };
  };

  function moveDown(index) {
    if (index < tasks.length - 1) {
      const updated = [...tasks];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      setTasks(updated);
    };
  };

  return (
    <div id="task-list">
      <h1>My Tasks</h1>
      <input
        type="text"
        name="task"
        placeholder="add a task"
        value={newTask}
        onChange={handleInput}
      />
      <button id="add-btn" onClick={addTask}>
        <i className="fas fa-plus"></i> add new task
      </button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <p className="text" onClick={() => toggleComplete(index)}>{task.text}</p>
            <p className="status">{task.isComplete ? 'COMPLETE' : 'INCOMPLETE'}</p>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              <i className="fas fa-trash"></i>
            </button>
            <button className="up-btn" onClick={() => moveUp(index)}>
              <i className="fas fa-caret-up"></i>
            </button>
            <button className="down-btn" onClick={() => moveDown(index)}>
              <i className="fas fa-caret-down"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTasks;