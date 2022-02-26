import {
  DaysListType, Task, TasksListType, TaskUnit,
} from '../../../store/tasks/tasks-types';
import getDateKeyString from '../../../utilities/getDateKeyString.function';

export type TodayTasksType = { task: Task, progress: number, unit: TaskUnit }[];

function getTodayTasksArray(tasks: TasksListType, days: DaysListType): TodayTasksType {
  const today = new Date();
  const todayDateKey = getDateKeyString(today);
  const tasksList = Object.values(tasks);
  const taskEntries = days[todayDateKey]?.tasks ?? {};
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
