import React, { useState, useRef } from 'react';

function TodoForm({ setTodos, allTodos, updateLocalStorage }) {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const descriptionInputRef = useRef(null);

  const handleAddTodo = () => {
    const newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    const updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    updateLocalStorage(updatedTodoArr, JSON.parse(localStorage.getItem('completedTodos')));
    setNewTitle('');
    setNewDescription('');
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      descriptionInputRef.current.focus();
    }
  };

  return (
    <div className="todo-input">
      <div className="todo-input-item">
        <label>Task: </label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleTitleKeyPress}
          placeholder="Enter your task"
        />
      </div>
      <div className="todo-input-item">
        <label>Description: </label>
        <input
          type="text"
          ref={descriptionInputRef}
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter your task's description"
        />
      </div>
      <div className="todo-input-item">
        <button type="button" onClick={handleAddTodo} className="primaryBtn">
          Add
        </button>
      </div>
    </div>
  );
}

export default TodoForm;
