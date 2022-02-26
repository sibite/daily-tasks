import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasks/tasks';

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
});

export const tasksActions = tasksSlice.actions;

export type RootState = ReturnType<typeof store.getState>;

export default store;
