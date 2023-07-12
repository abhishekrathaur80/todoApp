import React, { useState } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleAddTodo = () => {
    setShowModal(true);
  };

  const handleEditTodo = (index) => {
    setEditMode(true);
    setSelectedTodo(index);
    setTask(todos[index]);
    setShowModal(true);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editMode) {
      const updatedTodos = [...todos];
      updatedTodos[selectedTodo] = task;
      setTodos(updatedTodos);
    } else {
      setTodos([...todos, task]);
    }
    setShowModal(false);
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <p>Total tasks: {todos.length}</p>
      <button onClick={handleAddTodo}>Add Todo</button>

      {todos.length > 0 && (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={() => handleEditTodo(index)}>Edit</button>
              <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editMode ? "Edit Todo" : "Add Todo"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={task}
                onChange={(event) => setTask(event.target.value)}
                placeholder="Enter a task"
                required
              />
              <button type="submit">{editMode ? "Update" : "Submit"}</button>
            </form>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
