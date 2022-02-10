import React from 'react';

export type DateString = `${number}-${number}-${number}`;

export interface TaskEntry {
  id: number,
  progress: number
}

export interface Day {
  tasks: { [key: number]: TaskEntry[] };
}

export interface DaysStoreType {
  days: { [key: DateString]: Day };
}

export const DaysContext = React.createContext<DaysStoreType>({
  days: {},
});
