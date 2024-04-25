import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.css';

const MyTasks = () => {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  function handleInput(e) {
    e.preventDefault();
    setNewTask(e.target.value);
  };

  function addTask() {
    if (newTask.trim() !== '') {
      setTasks(prev => [...prev, newTask]);
      setNewTask('');
    };
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

      {/* <form id="tasks" action="submit"> */}
        <input
          type="text"
          name="task"
          placeholder="add new task"
          value={newTask}
          onChange={handleInput}
        />
        <button id="add-btn" form="tasks" type="submit" onClick={addTask}><i class="fa-solid fa-plus"></i> add new task</button>
      {/* </form> */}
      
      <ul>
        {tasks.map((task, index) => 
          <li key={index}>
            <span className="text">{task}</span>
            <button className="delete-btn" onClick={() => deleteTask(index)}><i class="fa-solid fa-trash"></i></button>
            <button className="up-btn" onClick={() => moveUp(index)}><i class="fa-solid fa-caret-up"></i></button>
            <button className="down-btn" onClick={() => moveDown(index)}><i class="fa-solid fa-caret-down"></i></button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default MyTasks;