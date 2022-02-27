import { DateKeyString } from '../../utilities/getDateKeyString.function';
import { ActionWithPayload } from '../utils';
import { TasksStoreType, TaskUnit } from './tasks-types';

type ActionType = ActionWithPayload<{
  dateKeyString: DateKeyString;
  taskId: number;
  progress: number;
}>;

function updateTaskProgress(state: TasksStoreType, action: ActionType) {
  const {
    dateKeyString, taskId, progress,
  } = action.payload;
  const newState = state;
  const newDays = newState.days;

  const task = state.tasks[taskId];
  const maxTarget = task.unit === TaskUnit.Timestamp ? 24 * 3600e3 : Infinity;
  const validatedProgress = Math.max(Math.min(progress, maxTarget), 0);

  if (!newDays[dateKeyString]) {
    newDays[dateKeyString] = { tasks: {} };
  }

  if (!newDays[dateKeyString].tasks[taskId]) {
    newDays[dateKeyString].tasks[taskId] = { progress: 0, unit: task.unit };
  }

  newDays[dateKeyString].tasks[taskId].progress = validatedProgress;

  return state;
}

export default updateTaskProgress;
