import React from 'react';
import { DateKeyString } from '../utilities/getDateKeyString.function';
import { TaskUnit } from './TasksContext';

export interface TaskEntry {
  progress: number;
  unit: TaskUnit;
}

export interface Day {
  tasks: { [key: number]: TaskEntry };
}

export interface DaysStoreType {
  days: { [key: DateKeyString]: Day };
  updateTaskProgress: (dateKeyString: DateKeyString, taskId: number, progress: number) => void;
  updateTaskUnit: (dateKeyString: DateKeyString, taskId: number, unit: TaskUnit) => void;
}

export const DaysContext = React.createContext<DaysStoreType>({
  days: {},
  updateTaskProgress: () => {},
  updateTaskUnit: () => {},
});
