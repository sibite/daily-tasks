import { ActionWithPayload } from '../utils';
import saveStoreToLocalStorage from './saveStoreToLocalStorage.function';
import { TasksStoreType, TaskUnit } from './tasks-types';

type ActionType = ActionWithPayload<{
  name: string;
  target: number;
  unit: TaskUnit;
}>;

function addTask(state: TasksStoreType, action: ActionType) {
  const {
    name, target, unit,
  } = action.payload;
  const newState = state;
  const existingIds = Object.keys(state.tasks).map((key) => Number(key));
  const id = Math.max(...existingIds, 0) + 1;

  const targetKey = unit === TaskUnit.Count ? 'count' : 'timestamp';
  const newTask = {
    id, name, unit, count: 0, timestamp: 0,
  };
  newTask[targetKey] = target;
  newState.tasks[id] = newTask;

  saveStoreToLocalStorage(newState);
  return newState;
}

export default addTask;
