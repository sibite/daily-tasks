import React from 'react';

export enum TaskUnit {Timestamp, Count}

export interface Task {
  id: number;
  name: string;
  unit: TaskUnit;
  target: number;
}

export interface TasksListType { [key: number]: Task }

export interface TasksStoreType {
  list: TasksListType;
  updateTask: (id: number, name: string, target: number, unit: TaskUnit) => void;
}

export const TasksContext = React.createContext<TasksStoreType>({
  list: {},
  updateTask: () => {},
});
