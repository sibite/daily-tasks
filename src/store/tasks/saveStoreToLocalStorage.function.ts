import { TasksStoreType } from './tasks-types';

// dev-only functionality
const saveStoreToLocalStorage = (store: TasksStoreType) => {
  localStorage.setItem('dailyTasks_tasks', JSON.stringify(store.tasks));
  localStorage.setItem('dailyTasks_days', JSON.stringify(store.days));
};

export default saveStoreToLocalStorage;
