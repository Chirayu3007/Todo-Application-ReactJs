import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function TodoList({
  isCompleteScreen,
  allTodos,
  completedTodos,
  setTodos,
  setCompletedTodos,
  currentEdit,
  setCurrentEdit,
  currentEditedItem,
  setCurrentEditedItem,
  updateLocalStorage,
}) {
  const handleDeleteTodo = index => {
    const reducedTodo = allTodos.filter((_, i) => i !== index);
    setTodos(reducedTodo);
    updateLocalStorage(reducedTodo, completedTodos);
  };

  const handleComplete = index => {
    const completedOn = new Date().toLocaleString();
    const completedItem = {
      ...allTodos[index],
      completedOn,
    };
    const updatedCompletedArr = [...completedTodos, completedItem];
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    updateLocalStorage(allTodos, updatedCompletedArr);
  };

  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };

  const handleUpdateToDo = () => {
    const newTodos = [...allTodos];
    newTodos[currentEdit] = currentEditedItem;
    setTodos(newTodos);
    setCurrentEdit("");
    updateLocalStorage(newTodos, completedTodos);
  };

  return (
    <div className="todo-list">
      {!isCompleteScreen &&
        allTodos.map((item, index) => (
          currentEdit === index ? (
            <div className='edit__wrapper' key={index}>
              <input
                placeholder='Updated Title'
                onChange={e => setCurrentEditedItem({ ...currentEditedItem, title: e.target.value })}
                value={currentEditedItem.title}
              />
              <textarea
                placeholder='Updated Description'
                rows={4}
                onChange={e => setCurrentEditedItem({ ...currentEditedItem, description: e.target.value })}
                value={currentEditedItem.description}
              />
              <button
                type="button"
                onClick={handleUpdateToDo}
                className="primaryBtn"
              >
                Update
              </button>
            </div>
          ) : (
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div>
                <AiOutlineDelete
                  className="icon"
                  onClick={() => handleDeleteTodo(index)}
                  title="Delete?"
                />
                <BsCheckLg
                  className="check-icon"
                  onClick={() => handleComplete(index)}
                  title="Complete?"
                />
                <AiOutlineEdit
                  className="edit-icon"
                  onClick={() => handleEdit(index, item)}
                  title="Edit?"
                />
              </div>
            </div>
          )
        ))}

      {isCompleteScreen &&
        completedTodos.map((item, index) => (
          <div className="todo-list-item" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>Completed on: {item.completedOn}</small></p>
            </div>
            <div>
              <AiOutlineDelete
                className="icon"
                onClick={() => {
                  const reducedCompleted = completedTodos.filter((_, i) => i !== index);
                  setCompletedTodos(reducedCompleted);
                  updateLocalStorage(allTodos, reducedCompleted);
                }}
                title="Delete"
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default TodoList;
