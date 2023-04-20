import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Reducers/authReducer';
import todoReducer from '../Reducers/todoReducer';

export const store = configureStore({
  reducer: {
    user: authReducer,
    todos: todoReducer
  },
});
