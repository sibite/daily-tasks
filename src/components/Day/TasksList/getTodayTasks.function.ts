import { DaysStoreType } from '../../../store/DaysContext';
import { Task, TasksStoreType } from '../../../store/TasksContext';
import getDateKeyString from '../../../utilities/getDateKeyString.function';

type TodayTasksType = { task: Task, progress: number }[];

function getTodayTasks(tasksCtx: TasksStoreType, daysCtx: DaysStoreType): TodayTasksType {
  const today = new Date();
  const todayDateKey = getDateKeyString(today);
  const tasksList = Object.values(tasksCtx.list);
  const taskEntries = daysCtx.days[todayDateKey]?.tasks ?? {};
  const outputTasks = tasksList.map((task) => ({
    task,
    progress: taskEntries[task.id]?.progress ?? 0,
  }));

  return outputTasks;
}

export default getTodayTasks;
