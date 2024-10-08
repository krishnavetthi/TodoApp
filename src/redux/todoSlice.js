// redux/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  todos: []
};

// Create a slice for todos
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Action to add a new todo
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    // Action to delete a todo
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    // Action to edit a todo
    editTodo: (state, action) => {
      const { id, updatedText } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.text = updatedText;
      }
    }
  }
});

// Export the actions generated by createSlice
export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;

// Export the reducer to be used in the store
export default todoSlice.reducer;
