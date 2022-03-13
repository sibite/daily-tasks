import { ActionWithPayload } from '../utils';
import saveStoreToLocalStorage from './saveStoreToLocalStorage.function';
import { TasksStoreType } from './tasks-types';

type ActionType = ActionWithPayload<{
  taskId: number;
}>;

function addTask(state: TasksStoreType, action: ActionType) {
  const { taskId } = action.payload;
  const newState = state;

  if (!newState.tasks[taskId]) return newState;

  delete newState.tasks[taskId];

  saveStoreToLocalStorage(newState);
  return newState;
}

export default addTask;
