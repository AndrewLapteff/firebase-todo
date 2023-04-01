import { configureStore } from '@reduxjs/toolkit';
import { modalReducer } from './modalSlice';
import { todoReducer } from './todoSlice';

export const store = configureStore({
  reducer: {
    todosReducer: todoReducer,
    modalReducer: modalReducer,
  },
});
