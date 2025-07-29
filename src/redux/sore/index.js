import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../reducer/task';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
