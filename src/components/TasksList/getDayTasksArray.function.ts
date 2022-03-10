import {
  DaysListType, Task, TasksListType, TaskUnit,
} from '../../store/tasks/tasks-types';
import getDateKeyString from '../../utilities/getDateKeyString.function';

export type DayTasksType = { task: Task, progress: number, unit: TaskUnit }[];

function getDayTasksArray(date: Date, tasks: TasksListType, days: DaysListType): DayTasksType {
  const dateKey = getDateKeyString(date);
  const tasksList = Object.values(tasks);
  const taskEntries = days[dateKey]?.tasks ?? {};
  const outputTasks = tasksList.map((task) => {
    const taskEntry = taskEntries[task.id] ?? {};
    return {
      task,
      progress: taskEntry.progress ?? 0,
      unit: taskEntry.unit ?? task.unit,
    };
  });

  return outputTasks;
}

export default getDayTasksArray;
