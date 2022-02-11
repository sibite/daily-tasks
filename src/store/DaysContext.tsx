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
}

export const DaysContext = React.createContext<DaysStoreType>({
  days: {},
});
