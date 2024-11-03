import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ setTodos, todos }) => {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) {
      alert("Task cannot be empty");
      return;
    }

    axios.post('todolist-nine-jet-31.vercel.app
/add', { task })
      .then((result) => {
        // Add the new task to the todos state without reloading
        setTodos([...todos, { _id: result.data._id, task, done: false }]);
        setTask(""); // Clear input after adding
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
        <input
          type="text"
          className="create_input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="button" className="create_button" onClick={handleAdd}>
          Add
        </button>
    </div>
  );
};

export default Create;
