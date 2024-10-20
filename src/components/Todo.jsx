import React, { useState, useEffect } from 'react';
import "./Todo.css";
import TodoHeader from './TodoHeader';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Toaster } from 'react-hot-toast';

function Todo() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false)
    const [allTodos, setTodos] = useState([])
    const [completedTodos, setCompletedTodos] = useState([])
    const [currentEdit, setCurrentEdit] = useState("")
    const [currentEditedItem, setCurrentEditedItem] = useState("")

    // Fetch saved todos and completed todos from local storage
    useEffect(() => {
        const savedTodo = JSON.parse(localStorage.getItem('todolist'))
        const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
        if (savedTodo) {
            setTodos(savedTodo);
        }
        if (savedCompletedTodo) {
            setCompletedTodos(savedCompletedTodo);
        }
    }, []);

    // Update local storage after adding or deleting a todo
    const updateLocalStorage = (todos, completedTodos) => {
        localStorage.setItem('todolist', JSON.stringify(todos))
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos))
    }

    return (
        <>
        <Toaster />
        <div className="todo-wrapper">
            <TodoForm
                setTodos={setTodos}
                allTodos={allTodos}
                updateLocalStorage={updateLocalStorage}
            />
            <TodoHeader
                isCompleteScreen={isCompleteScreen}
                setIsCompleteScreen={setIsCompleteScreen}
            />
            <TodoList
                isCompleteScreen={isCompleteScreen}
                allTodos={allTodos}
                completedTodos={completedTodos}
                setTodos={setTodos}
                setCompletedTodos={setCompletedTodos}
                currentEdit={currentEdit}
                setCurrentEdit={setCurrentEdit}
                currentEditedItem={currentEditedItem}
                setCurrentEditedItem={setCurrentEditedItem}
                updateLocalStorage={updateLocalStorage}
            />
        </div>
        </>
    );
}

export default Todo;
