import { createSlice } from '@reduxjs/toolkit';
import { dummyDays, dummyTasks } from '../dummy-data';
import addTask from './add-task';
import { TasksStoreType } from './tasks-types';
import updateDayUnit from './update-day-unit';
import updateTask from './update-task';
import updateTaskProgress from './update-task-progress';

const initialState: TasksStoreType = {
  tasks: dummyTasks,
  days: dummyDays,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask,
    updateTask,
    updateTaskProgress,
    updateDayUnit,
  },
});

export default tasksSlice;
