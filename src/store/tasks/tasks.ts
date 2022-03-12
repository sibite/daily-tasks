import { createSlice } from '@reduxjs/toolkit';
import { dummyDays, dummyTasks } from '../dummy-data';
import addTask from './add-task';
import { TasksStoreType } from './tasks-types';
import updateDayUnit from './update-day-unit';
import updateTask from './update-task';
import updateTaskProgress from './update-task-progress';

// dev-only functionality
const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  return JSON.parse(item);
};

const initialState: TasksStoreType = {
  tasks: getLocalStorage('dailyTasks_tasks') ?? {},
  days: getLocalStorage('dailyTasks_days') ?? {},
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
