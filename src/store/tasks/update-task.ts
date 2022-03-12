import { ActionWithPayload } from '../utils';
import saveStoreToLocalStorage from './saveStoreToLocalStorage.function';
import { Task, TasksStoreType, TaskUnit } from './tasks-types';

type ActionType = ActionWithPayload<{
  id: number;
  name: string;
  target: number;
  unit: TaskUnit;
}>;

function updateTask(state: TasksStoreType, action: ActionType) {
  const {
    id, name, target, unit,
  } = action.payload;
  const newState = state;
  const oldTask: Task = newState.tasks[id];

  if (!oldTask) return newState;

  const targetString = unit === TaskUnit.Count ? 'count' : 'timestamp';
  const updatedTask = {
    ...oldTask, name, unit, [targetString]: target,
  };

  newState.tasks[id] = updatedTask;

  saveStoreToLocalStorage(newState);
  return newState;
}

export default updateTask;
