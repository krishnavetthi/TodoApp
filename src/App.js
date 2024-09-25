import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from './redux/todoSlice';
import './App.css';

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  // Redux hooks
  const todos = useSelector((state) => state.todos.todos); // Access todos from Redux state
  const dispatch = useDispatch();

  // Handle adding a new todo
  const handleAddTodo = () => {
    if (!newTodo) return; // Prevent adding empty todo
    dispatch(addTodo({ id: Date.now(), text: newTodo }));
    setNewTodo(''); // Reset input field
  };

  // Handle editing an existing todo
  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
    setNewTodo(todo.text);
  };

  // Handle updating a todo
  const handleUpdateTodo = () => {
    dispatch(editTodo({ id: currentTodo.id, updatedText: newTodo }));
    setIsEditing(false);
    setNewTodo('');
    setCurrentTodo(null);
  };

  // Handle deleting a todo
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="App">
      <h1>Todo App with Redux Toolkit</h1>

      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={isEditing ? handleUpdateTodo : handleAddTodo}>
          {isEditing ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>

      <div className="todo-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <p>{todo.text}</p>
              <button onClick={() => handleEditTodo(todo)}>Edit</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No todos available</p>
        )}
      </div>
    </div>
  );
};

export default App;
