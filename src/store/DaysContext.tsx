import React from 'react';
import { DateKeyString } from '../utilities/getDateKeyString.function';

export interface TaskEntry {
  progress: number
}

export interface Day {
  tasks: { [key: number]: TaskEntry };
}

export interface DaysStoreType {
  days: { [key: DateKeyString]: Day };
  updateTaskProgress: (dateKeyString: DateKeyString, taskId: number, progress: number) => void;
}

export const DaysContext = React.createContext<DaysStoreType>({
  days: {},
  updateTaskProgress: () => {},
});
