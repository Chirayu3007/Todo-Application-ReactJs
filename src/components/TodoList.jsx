import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

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
    toast.dismiss();
    toast.success('Task deleted', {
      id: 'delete-toast',
      position: 'top-center',
    });
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
    toast.dismiss();
    toast.success('Task completed', {
      id: 'complete-toast',
      position: 'top-center',
    });
  };

  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };

  const handleUpdateToDo = () => {
    if (!currentEditedItem.title || !currentEditedItem.description) {
      toast.dismiss();
      toast.error('Both fields are required!', {
        id: 'empty-fields-toast',
        position: 'top-center',
      });
      return;
    }

    const newTodos = [...allTodos];
    newTodos[currentEdit] = currentEditedItem;
    setTodos(newTodos);
    setCurrentEdit('');
    updateLocalStorage(newTodos, completedTodos);
    toast.dismiss();
    toast.success('Task updated!', {
      id: 'update-toast',
      position: 'top-center',
    });
  };

  return (
    <div className="todo-list">
      {!isCompleteScreen &&
        allTodos.map((item, index) => (
          currentEdit === index ? (
            <div className="edit__wrapper" key={index}>
              <input
                placeholder="Updated Title"
                onChange={e => setCurrentEditedItem({ ...currentEditedItem, title: e.target.value })}
                value={currentEditedItem.title}
              />
              <textarea
                placeholder="Updated Description"
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
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Delete Task"
                />
                <BsCheckLg
                  className="check-icon"
                  onClick={() => handleComplete(index)}
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Mark as Completed"
                />
                <AiOutlineEdit
                  className="edit-icon"
                  onClick={() => handleEdit(index, item)}
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Edit Task"
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
                  toast.dismiss();
                  toast.success('Task deleted', {
                    id: 'delete-completed-toast',
                    position: 'top-center',
                  });
                }}
                data-tooltip-id="tooltip"
                data-tooltip-content="Delete Task"
              />
            </div>
          </div>
        ))}

      <Tooltip id="tooltip" />
    </div>
  );
}

export default TodoList;
