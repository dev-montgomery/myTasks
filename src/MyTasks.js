import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('mytasks')) || [];
    setTasks(saved);
  }, []);

  function handleInput(e) {
    setNewTask(e.target.value);
  };

  function addTask() {
    if (newTask.trim() !== '') {
      const updated = [...tasks, { text: newTask, isComplete: false, isEditing: false }];
      setTasks(updated);
      setNewTask('');
      localStorage.setItem('mytasks', JSON.stringify(updated));
    };
  };

  function toggleComplete(index) {
    const updated = tasks.map((task, position) =>
      position === index ? { ...task, isComplete: !task.isComplete } : task
    );
    setTasks(updated);
    localStorage.setItem('mytasks', JSON.stringify(updated));
  };

  function deleteTask(index) {
    const updated = tasks.filter((_, position) => position !== index);
    setTasks(updated);
    localStorage.setItem('mytasks', JSON.stringify(updated));
    if (!tasks.length) localStorage.removeItem('mytasks');
  };

  function moveUp(index) {
    if (index > 0) {
      const updated = [...tasks];
      [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
      setTasks(updated);
      localStorage.setItem('mytasks', JSON.stringify(updated));
    };
  };

  function moveDown(index) {
    if (index < tasks.length - 1) {
      const updated = [...tasks];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      setTasks(updated);
      localStorage.setItem('mytasks', JSON.stringify(updated));
    };
  };

  return (
    <div id="task-list">
      <h1 onClick={(() => setToggle(!toggle))}><i className="fas fa-plus"></i> add task</h1>
      <div className={toggle ? "task-input shown" : "task-input hidden"}>
        <input
          type="text"
          name="task"
          placeholder="add a task"
          value={newTask}
          onChange={handleInput}
          minLength={3}
          maxLength={20}
        />
        <button id="add-btn" onClick={addTask}>
          append
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <div>
              <button className="up-btn" onClick={() => moveUp(index)}>
                <i className="fas fa-caret-up"></i>
              </button>
              <p className="text" onClick={() => toggleComplete(index)}>{task.text}</p>
              <button className="down-btn" onClick={() => moveDown(index)}>
                <i className="fas fa-caret-down"></i>
              </button>
            </div>
            <div>
              <p className="status">{task.isComplete ? 'COMPLETE' : 'INCOMPLETE'}</p>
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTasks;