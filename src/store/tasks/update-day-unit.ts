import { DateKeyString } from '../../utilities/getDateKeyString.function';
import { ActionWithPayload } from '../utils';
import saveStoreToLocalStorage from './saveStoreToLocalStorage.function';
import { TasksStoreType, TaskUnit } from './tasks-types';

type ActionType = ActionWithPayload<{
  dateKeyString: DateKeyString;
  taskId: number;
  unit: TaskUnit;
}>;

function updateDayUnit(
  state: TasksStoreType,
  action: ActionType,
) {
  const newState = state;
  const {
    dateKeyString, taskId, unit,
  } = action.payload;

  if (!newState.days[dateKeyString]?.tasks[taskId]) return newState;

  const taskEntry = newState.days[dateKeyString].tasks[taskId];

  if (taskEntry.unit !== unit) {
    taskEntry.progress = 0;
  }
  taskEntry.unit = unit;

  saveStoreToLocalStorage(newState);
  return newState;
}

export default updateDayUnit;
