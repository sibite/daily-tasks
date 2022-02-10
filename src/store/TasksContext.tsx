import React from 'react';

export enum TaskUnit {Timestamp, Count}

export interface Task {
  id: number;
  name: string;
  unit: TaskUnit;
  target: number;
}

export interface TasksContextType {
  list: { [key: number]: Task };
}

export const TasksContext = React.createContext<TasksContextType>({
  list: {},
});
