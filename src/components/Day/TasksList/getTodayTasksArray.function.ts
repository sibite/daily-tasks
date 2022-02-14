import { DaysStoreType } from '../../../store/DaysContext';
import { Task, TasksStoreType, TaskUnit } from '../../../store/TasksContext';
import getDateKeyString from '../../../utilities/getDateKeyString.function';

export type TodayTasksType = { task: Task, progress: number, unit: TaskUnit }[];

function getTodayTasksArray(tasksCtx: TasksStoreType, daysCtx: DaysStoreType): TodayTasksType {
  const today = new Date();
  const todayDateKey = getDateKeyString(today);
  const tasksList = Object.values(tasksCtx.list);
  const taskEntries = daysCtx.days[todayDateKey]?.tasks ?? {};
  const outputTasks = tasksList.map((task) => {
    const taskEntry = taskEntries[task.id] ?? {};
    return {
      task,
      progress: taskEntry.progress ?? 0,
      unit: taskEntry.unit ?? 0,
    };
  });

  return outputTasks;
}

export default getTodayTasksArray;
