import getDateKeyString from '../utilities/getDateKeyString.function';
import { TasksListType, TaskUnit } from './tasks/tasks-types';

export const dummyTasks: TasksListType = {
  0: {
    id: 0,
    name: 'Test task',
    unit: TaskUnit.Count,
    count: 5,
    timestamp: 60e3,
  },
  1: {
    id: 1,
    name: 'Second task',
    unit: TaskUnit.Timestamp,
    count: 1,
    timestamp: 130 * 60e3,
  },
  2: {
    id: 2,
    name: 'Third task',
    unit: TaskUnit.Count,
    count: 10,
    timestamp: 60e3,
  },
  3: {
    id: 3,
    name: 'Fourth task',
    unit: TaskUnit.Timestamp,
    count: 1,
    timestamp: 20 * 60e3,
  },
  4: {
    id: 4,
    name: 'Fifth task',
    unit: TaskUnit.Count,
    count: 1,
    timestamp: 60e3,
  },
};

export const dummyDays = {
  [getDateKeyString(new Date())]: {
    tasks: {
      0: { progress: 3, unit: TaskUnit.Count },
      1: { progress: 3e6, unit: TaskUnit.Timestamp },
      2: { progress: 7, unit: TaskUnit.Count },
      3: { progress: 8e5, unit: TaskUnit.Timestamp },
      4: { progress: 0, unit: TaskUnit.Count },
    },
  },
};
