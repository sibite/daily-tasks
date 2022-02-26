import { DateKeyString } from '../../utilities/getDateKeyString.function';
import { ActionWithPayload } from '../utils';
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

  if (!newState.days[dateKeyString]) return newState;

  const taskEntry = newState.days[dateKeyString].tasks[taskId];

  taskEntry.progress = 0;
  taskEntry.unit = unit;

  return newState;
}

export default updateDayUnit;
